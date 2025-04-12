// Function to create a table in the database
function createTable(cmd) {
    let pattern = /TABLE BANAO (\w+)\s*\(([^)]+)/;
    let match = cmd.match(pattern);
    if (match) {
        let [, tableName, colStr] = match;
        tableName = tableName.trim();
        // if table exists in database
        if (Object.keys(database).includes(tableName)) {
            showError("Table is already exits in database.", "error")
        } else {
            let columns = colStr.split(',').map(col => col.trim());
            let primaryKey = columns.filter(c => c.includes("*")).map(p => p.replace("*", ""));
            columns = columns.map(c => c.replace("*", ""))
            database[tableName] = { col: columns, primaryKey, rows: [] };
            showDataInTable(tableName);
            showError(`Table "${tableName}" created successfully.`, "success");
        }
    } else {
        showError("Invalid command syntax", "error")
    }
}

// Function to insert data in the table
function insertData(cmd) {
    let pattern = /DATA BHARO (\w+)\s*VALUES\s*\((.*)\)/;
    let match = cmd.match(pattern);
    // if match exists
    if (match) {
        let [, tableName, values] = match;
        tableName = tableName.trim();
        // if table exists in database
        if (Object.keys(database).includes(tableName)) {
            let row = values.split(',').map(value => {
                let v = value.trim()
                return v.replace(/^"|"|'|'/g, "")
            });
            database[tableName].rows.push(row);
            showDataInTable(tableName);
        } else {
            showError("Table does not exist in the database", "error");
        }
    } else {
        showError("Invalid command syntax", "error");
    }
}

// Function to setect or retreive data from the table
function select(cmd) {
    let pattern = /PESH KARO (.+?)\s+FROM\s+(\w+)(?:\s+JAHAN\s+(\w+)\s*(==|!=|>=|<=|<|>)\s*(.+))?/;
    let match = cmd.match(pattern);
    try {

        // if match exists 
        if (match) {
            let [, attributeStr, tableName, conditionCol, conditionOp, conditionval] = match;
            tableName = tableName.trim();
            // if table exists in database
            if (Object.keys(database).includes(tableName)) {
                let attributes = attributeStr.trim() === '*' ? null : attributeStr.split(',').map(a => a.trim());

                // *(all) are selected show full table
                if (attributes === null) {
                    attributes = [...database[tableName].col];
                }

                // get all column idexes from the database table
                let columnIndex = attributes.map(a => database[tableName].col.indexOf(a));

                // if table has not any column
                if (columnIndex.includes(-1)) {
                    showError(`Column ' ${attributes[columnIndex.indexOf(-1)]} ' is not in the table ' ${tableName} '.`, "error");
                    return;
                }

                let filteredRow = database[tableName].rows.filter(row => {

                    if (!conditionCol) return true; // If conditionCol is not exist then include all rows


                    let colIndex = database[tableName].col.indexOf(conditionCol);

                    if (colIndex === -1) {
                        showError(`Column '${conditionCol}' does not exist in table '${tableName}`, "error");
                        return;
                    }
                    let cellValue = row[colIndex]; // get the value of cell in the row in respect of conditional col
                    let compareValue = conditionval.replace(/^"|"$/g, ''); // get only original conditional value

                    // convert values in number in possible
                    let left = isNaN(cellValue) ? cellValue : parseFloat(cellValue);
                    let right = isNaN(compareValue) ? compareValue : parseFloat(compareValue);

                    switch (conditionOp) {
                        case "==": return left == right;
                        case "!=": return left != right;
                        case ">=": return left >= right;
                        case "<=": return left <= right;
                        case "<": return left < right;
                        case ">": return left > right;
                        default: return false;
                    }
                })

                // make rows for selected columns
                let rows = filteredRow.map(row => {
                    return columnIndex.map(i => row[i])
                })

                let tableRows = makeRows(rows);
                let tableColumns = makeCols(attributes);
                makeTable(tableRows, tableColumns, tableName)
            } else {
                showError("Table does not exist in the database.", "error");
            }
        } else {
            showError("Invalid command syntax", "error");
        }
    } catch (err) {
        showError("Invalid commad syntax", "error");
    }
}

// Function to delete a row
function deleteRows(cmd) {
    let pattern = /RECORDS HATAO (\w+)\s*JAHAN\s*(\w+)\s*(==|!=|<=|>=|<|>)\s*(.+)/;
    let match = cmd.match(pattern);
    if (!match) return showError("Invalid commmand syntax.", "error");

    let [, tableName, conditionalCol, conditionalOp, conditionalvalue] = match;

    if (!database[tableName]) return showError(`Table ' ${tableName} ' does not exist in the database.`, "error")


    if (!conditionalCol) return showError(`Table ${tableName} don't have any attribute named ${conditionalCol}.`, "error");


    let remainRows = database[tableName].rows.filter(row => {
        let colIndex = database[tableName].col.indexOf(conditionalCol);

        let cellValue = row[colIndex];
        let compareValue = conditionalvalue.replace(/^"|"$/g, "");

        let right = isNaN(cellValue) ? cellValue : parseFloat(cellValue);
        let left = isNaN(compareValue) ? compareValue : parseFloat(compareValue);

        console.log({ left, right, conditionalOp })
        switch (conditionalOp) {
            case "==": return (left != right);
            case "!=": return (left == right);
            case ">=": return (left < right);
            case "<=": return (left > right);
            case "<": return (left >= right);
            case ">": return (left <= right);
            default: return true;
        }

    })

    database[tableName].rows = remainRows;
    showDataInTable(tableName)
}

// Function to add a column 
function addColumn(cmd) {
    let pattern = /COLUMN JODO (\w+)\s*VALUE\s*(\w+)/;

    let match = cmd.match(pattern);
    if (!match) return showError("Invalid command syntax", "error");

    let [, tableName, columnName] = match;
    if (!database[tableName]) return showError(`Table "${tableName}" does not exist in the database.`, "error");

    if(database[tableName].col.includes(columnName)) return showError(`Column "${columnName}" already exists in the table "${tableName}".`, "error")
    // add column in the table
    database[tableName].col.push(columnName);

    // fill null on existing rows
    database[tableName].rows.forEach(row => {
        row.push(null);
    });
    showDataInTable(tableName)
}

// Function to update cells in a row
function updataRow(cmd) {
    let pattern = /RECORDS BALDO (\w+)\s*SET\s*(.+)\s*JAHAN\s*(\w+)\s*==\s*(\w+)/
    let match = cmd.match(pattern);
    if (!match) return showError("Invalid command syntax", "error");


    let [, tableName, updateStr, key, value] = match;
    if (!database[tableName]) return showError(`Table "${tableName}" does not exist in the database.`, "error");

    let valuesForUpdate = updateStr.split(",");
    valuesForUpdate = valuesForUpdate.map(values => values.trim());

    let columnsForUpdate = valuesForUpdate.map(values => {
        return values.split('=').map(v => v.trim());
    })

    // check if columns exits in the table
    let finalIndexedValues = columnsForUpdate.map(col => {
        if (!database[tableName].col.includes(col[0])) return showError(`The property "${col[0]}" does not exist in the table "${tableName}".`, "error");
        return [database[tableName].col.indexOf(col[0]), col[1].replace(/^'|'|"|"$/g, '')];
    })

    // find row
    key = key.trim();
    if (!database[tableName].col.includes(key)) return showError(`The property "${key}" does not exist in the table "${tableName}".`, "error");

    value = value.trim();
    value = isNaN(value) ? value : parseFloat(value);

    let rowForUpdate;
    database[tableName].rows.forEach((row, i) => {
        if (row.includes(value)) return rowForUpdate = i;
    })
    if (!rowForUpdate) return showError(`Table "${tableName}" does not have any ${key} = ${value}.`, "error")


    // update row 
    finalIndexedValues.forEach(v => {
        database[tableName].rows[rowForUpdate][v[0]] = v[1];
    })
    showDataInTable(tableName)
}

// Function to rename the table name
function renameTable(cmd) {
    let pattern = /NAAM BADLO (.+)\s*SE\s*(.+)/;
    let match = cmd.match(pattern);

    if (!match) return showError("Invalid command syntax", "error");


    let [, oldTableName, newTableName] = match;
    newTableName = newTableName.trim();
    newTableName = newTableName.replace(/^'|'|"|"$/g, "");
    oldTableName = oldTableName.trim();
    if (!database[oldTableName]) return showError(`Table "${oldTableName}" does not exist in the database.`, "error");
    if (database[newTableName]) return showError(`Table "${newTableName}" already exists in the database.`, "error");

    database[newTableName] = database[oldTableName];
    delete database[oldTableName]
    showDataInTable(newTableName)
}

// Funtion to download table
function exportData(cmd) {
    let pattern = /BHEJO (DATABASE|TABLE)\s*(\w+)?/;
    let match = cmd.match(pattern);

    if (!match) return showError("Invalid command syntax");

    let [, data, tableName] = match;

    if (data.trim() == 'DATABASE') {
        let dataString = JSON.stringify(database, null, 2);

        let blob = new Blob([dataString], { type: 'application/json' });

        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = "database.json"
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    if (data.trim() == 'TABLE') {
        if (!database[tableName]) return showError(`Table "${tableName}" does not exist in the database.`, "error");

        let rows = [database[tableName].col, ...database[tableName].rows];
        let csvContent = rows.map(row => row.join(",")).join("\n");
        let blob = new Blob([csvContent], { type: 'text/csv' });

        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${tableName}.csv`
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    }
}

// Funtion to clone table 
function cloneTable(cmd) {
    let pattern = /COPY BANAO (.+)\s*AS\s*(.+)/;
    let match = cmd.match(pattern);

    if (!match) return showError("Invalid command syntax", "error");

    let [, tableName, newTableName] = match;
    tableName = tableName.trim();

    if (!database[tableName]) return showError(`Table "${tableName}" does not exist in the database.`, "error");
    newTableName = newTableName.trim();
    newTableName = newTableName.replace(/^'|'|"|"$/g, "");
    if (database[newTableName]) return showError(`Table "${newTableName}" already exists in the database.`, "error");

    database[newTableName] = database[tableName];
    showDataInTable(newTableName)
}

// Function to clear a Table
function deleteTable(cmd) {
    let pattern = /SAAF KARO (.*)/;
    let match = cmd.match(pattern);
    if (match) {
        let [, tableName] = match;
        if (!Object.keys(database).includes(tableName)) {
            showError("Table does not exist in the database.", "error")
            return;
        }
        database[tableName].rows = [];
        showDataInTable(tableName)

    }
}


// Function to clear a Table
function dropTable(cmd) {
    let pattern = /TABLE HATAO (.*)/;
    let match = cmd.match(pattern);
    if (match) {
        let [, tableName] = match;
        if (!Object.keys(database).includes(tableName)) {
            showError("Table does not exist in the database.", "error")
            return;
        }
        delete database[tableName];
        showError(`Table " ${tableName} " deleted.`, "success")
        showTableNames(Object.keys(database))
    }
}

// Function to give help
function help(cmd) {
    let pattern = /MADAD/;
    let match = cmd.match(pattern);

    if (!match) return showError("Invalid command syntax.", "error");

    showHelp();

}