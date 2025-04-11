
// funtion that show existing table names in a list 
function showTableNames(tables) {
    let tableNameContainer = document.querySelector('#table-name-container ul');
    tableNameContainer.innerHTML = ''
    tables.forEach(name => {
        let tableName = document.createElement('li');
        tableName.classList.add('table-name');
        tableName.innerText = name;
        // click on the name to see the table
        tableName.addEventListener("click", () => {
            showDataInTable(name);
        })
        tableNameContainer.appendChild(tableName);
    })
}

// function that show error if any err occurs
function showError(err) {
    let newTable = document.getElementById('table-data');
    newTable.innerHTML = ''

    let errMsg = document.createElement('p');
    errMsg.classList.add("err-msg");
    errMsg.innerText = err;
    newTable.appendChild(errMsg);

}

// function to make rows of table and return table body
function makeRows(rows) {
    let tableBody = document.createElement('tbody');
    rows.forEach(row => {
        let newRow = document.createElement('tr');
        row.forEach(data => {
            let td = document.createElement('td');
            td.innerText = data;
            newRow.appendChild(td);
        })
        tableBody.appendChild(newRow)
    });
    return tableBody;
}

// function to make columns of table and return table head
function makeCols(cols) {
    let tableHead = document.createElement('thead');
    let tableHeadRow = document.createElement('tr');
    cols.forEach(col => {
        let td = document.createElement("td");
        td.classList.add("table-columns");
        td.innerText = col;
        tableHeadRow.appendChild(td);
    })
    tableHead.appendChild(tableHeadRow)
    return tableHead;
}

// funtion to search table in database and make table by combining columns and rows 
function showDataInTable(tableName) {
    let tables = Object.keys(database);
    showTableNames(tables);
    if (tables.includes(tableName)) {
        let tableRows = database[`${tableName}`].rows;
        let tableCols = database[`${tableName}`].col;
        let rows = makeCols(tableCols);
        let cols = makeRows(tableRows);
        let newTable = document.getElementById('table-data');
        newTable.innerHTML = '';
        newTable.appendChild(rows);
        newTable.appendChild(cols);
        let name = document.querySelector("#table-data-container h2");
        name.innerText = tableName;
    } else {
        showError("* The given table name does not exist in the database.");
    }
}


// initial function calls
let tables = Object.keys(database);
showTableNames(tables);