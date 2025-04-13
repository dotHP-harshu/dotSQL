// Function to run a command
function runCommand(cmd) {
    if (cmd.startsWith("TABLE BANAO")) {
        createTable(cmd);
    }
    else if (cmd.startsWith("DATA BHARO")) {
        insertData(cmd);
    }
    else if (cmd.startsWith("PESH KARO")) {
        select(cmd);
    }
    else if (cmd.startsWith("RECORDS HATAO")) {
        deleteRows(cmd);
    }
    else if (cmd.startsWith("COLUMN JODO")) {
        addColumn(cmd);
    }
    else if (cmd.startsWith("RECORDS BALDO")) {
        updataRow(cmd);
    }
    else if (cmd.startsWith("NAAM BADLO")) {
        renameTable(cmd);
    }
    else if (cmd.startsWith("BHEJO")) {
        exportData(cmd);
    }
    else if (cmd.startsWith("COPY BANAO")) {
        cloneTable(cmd);
    }
    else if (cmd.startsWith("SAAF KARO")) {
        deleteTable(cmd);
    }
    else if (cmd.startsWith("TABLE HATAO")) {
        dropTable(cmd);
    }
    else if (cmd.startsWith("MADAD")) {
        help(cmd);
    }
    else if (cmd.startsWith("DATABASE HATAO")) {
        dropDatabase(cmd);
    }
    else if (cmd.startsWith("BACKUP LO")) {
        backupDatabase(cmd);
    }
    else if (cmd.startsWith("RESTORE KARO")) {
        restoreDatabase(cmd);
    }
    else {
        showError("Invalid command syntax.", "error")
    }
}




const runBtn = document.getElementById("run-btn");
const commandBox = document.getElementById("command-input");

commandBox.autofocus = true;



commandBox.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        let command = commandBox.value;
        runCommand(command);
        commandBox.value = '';
    }
})

runBtn.addEventListener('click', (e) => {
    let command = commandBox.value;
    runCommand(command);
    commandBox.value = '';
})



// Hide prelader
const preloader = document.getElementById("preloader");

document.addEventListener("DOMContentLoaded", () => {
    preloader.style.display = 'none';
})

// Hide help sectio 
const crossIcon = document.getElementById("cross-icon");
crossIcon.addEventListener('click', () => {
    const helpSection = document.getElementById("help-container");
    helpSection.style.display = 'none';
})

// get copy of command
const customCommandSyntaxes = document.querySelectorAll('.custom');
customCommandSyntaxes.forEach((cmd) => {
    cmd.addEventListener("click", () => {
        let command = cmd.textContent;
        navigator.clipboard.writeText(command);
    })
})