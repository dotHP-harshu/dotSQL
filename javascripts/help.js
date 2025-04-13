let helpCommands = [
  {
    "custom": "TABLE BANAO tableName (col1, col2, ...)",
    "sql": "CREATE TABLE tableName (...)",
    "description": "Create a new table with columns."
  },
  {
    "custom": "DATA BHARO tableName VALUES (val1, val2, ...)",
    "sql": "INSERT INTO tableName VALUES (...)",
    "description": "Insert a new row into the table."
  },
  {
    "custom": "PESH KARO col1, col2 FROM tableName",
    "sql": "SELECT col1, col2 FROM tableName",
    "description": "Retrieve specific columns from the table."
  },
  {
    "custom": "PESH KARO * FROM tableName",
    "sql": "SELECT * FROM tableName",
    "description": "Retrieve all columns from the table."
  },
  {
    "custom": "PESH KARO ... FROM ... JAHAN col op val",
    "sql": "SELECT ... FROM ... WHERE col op val",
    "description": "Retrieve rows matching a condition."
  },
  {
    "custom": "RECORDS HATAO tableName JAHAN col op val",
    "sql": "DELETE FROM tableName WHERE ...",
    "description": "Delete rows based on a condition."
  },
  {
    "custom": "RECORDS BALDO tableName SET col = val [, col2 = val2 ...] JAHAN key == value",
    "sql": "UPDATE tableName SET ... WHERE ...",
    "description": "Update row values based on a condition."
  },
  {
    "custom": "COLUMN JODO tableName VALUE columnName",
    "sql": "ALTER TABLE tableName ADD columnName",
    "description": "Add a new column to the table."
  },
  {
    "custom": "NAAM BADLO oldName SE newName",
    "sql": "RENAME TABLE oldName TO newName",
    "description": "Rename an existing table."
  },
  {
    "custom": "SAAF KARO tableName",
    "sql": "TRUNCATE TABLE tableName",
    "description": "Clear all rows from a table."
  },
  {
    "custom": "TABLE HATAO tableName",
    "sql": "DROP TABLE tableName",
    "description": "Delete the entire table."
  },
  {
    "custom": "COPY BANAO oldTable AS newTable",
    "sql": "CREATE TABLE newTable AS SELECT * FROM oldTable",
    "description": "Clone an existing table."
  },
  {
    "custom": "BHEJO DATABASE",
    "sql": "Export Database",
    "description": "Download the full database as JSON."
  },
  {
    "custom": "BHEJO TABLE tableName",
    "sql": "Export Table",
    "description": "Download a specific table as CSV."
  },
  {
    "custom": "MADAD",
    "sql": "Help",
    "description": "Show the table of command."
  },
  {
    "custom": "DATABASE HATAO",
    "sql": "DROP DATABASE",
    "description": "Delete the database"
  },
  {
    "custom": "BACKUP LO",
    "sql": "BACKUP",
    "description": "To save the data for backup."
  }
  ,
  {
    "custom": "RESTORE KARO",
    "sql": "RESTORE",
    "description": "To bring database from the last backup."
  }
]


function makeHelpTable() {
  let tableHTML = `
    <table class="help-table">
      <thead class="help-table-head">
        <tr>
          <th class="border px-4 py-2">🧠 Custom Command</th>
          <th class="border px-4 py-2">💻 SQL Equivalent</th>
          <th class="border px-4 py-2">📄 Description</th>
        </tr>
      </thead>
      <tbody class="help-table-body">
        ${helpCommands.map(cmd => `
          <tr>
            <td class="custom" title="Click to copy">${cmd.custom}</td>
            <td class="sql">${cmd.sql}</td>
            <td class="description">${cmd.description}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>`;

  const helpContainer = document.getElementById("help-table");
  helpContainer.innerHTML = tableHTML;
}
makeHelpTable();