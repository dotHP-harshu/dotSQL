# 📘 DotHP Custom Command Reference

| 🧠 Custom Command Syntax                                             | 💻 SQL Equivalent                                      | 📄 Description                                 |
|----------------------------------------------------------------------|--------------------------------------------------------|-----------------------------------------------|
| `TABLE BANAO tableName (col1, col2, ...)`                            | `CREATE TABLE tableName (...)`                         | Create a new table with columns.              |
| `DATA BHARO tableName VALUES (val1, val2, ...)`                     | `INSERT INTO tableName VALUES (...)`                   | Insert a new row into the table.              |
| `PESH KARO col1, col2 FROM tableName`                               | `SELECT col1, col2 FROM tableName`                     | Retrieve specific columns from a table.       |
| `PESH KARO * FROM tableName`                                        | `SELECT * FROM tableName`                              | Retrieve all columns from a table.            |
| `PESH KARO ... FROM ... JAHAN col op val`                           | `SELECT ... FROM ... WHERE col op val`                 | Select rows with a condition.                 |
| `RECORDS HATAO tableName JAHAN col op val`                          | `DELETE FROM tableName WHERE ...`                      | Delete rows based on a condition.             |
| `RECORDS BALDO table SET col = val [, col2 = val2 ...] JAHAN key == value` | `UPDATE table SET ... WHERE ...`                     | Update row values based on a condition.       |
| `COLUMN JODO tableName VALUE columnName`                            | `ALTER TABLE tableName ADD columnName`                 | Add a new column to the table.                |
| `NAAM BADLO oldName SE newName`                                     | `RENAME TABLE oldName TO newName`                     | Rename an existing table.                     |
| `SAAF KARO tableName`                                               | `TRUNCATE TABLE tableName`                             | Delete all rows but keep structure.           |
| `TABLE HATAO tableName`                                             | `DROP TABLE tableName`                                 | Completely remove the table.                  |
| `COPY BANAO oldTable AS newTable`                                    | `CREATE TABLE newTable AS SELECT * FROM oldTable`      | Clone a table and its data.                   |
| `BHEJO DATABASE`                                                    | _Export full DB_                                       | Download full DB as JSON.                     |
| `BHEJO TABLE tableName`                                             | _Export table_                                         | Download a specific table as CSV.             |

## 🧪 Supported Condition Operators

- `==` : Equal to
- `!=` : Not equal
- `>`  : Greater than
- `<`  : Less than
- `>=` : Greater than or equal to
- `<=` : Less than or equal to

## 💡 Special Command

- `MADAD` → Shows this command reference inside the app.

