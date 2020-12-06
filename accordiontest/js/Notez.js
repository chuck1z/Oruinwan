function SaveButton() {
            var userInput = document.getElementById("Notes").value;
            var blob = new Blob([userInput], { type: "text/plain;charset=utf-8" });
            saveAs(blob, "Notes.txt");
        }