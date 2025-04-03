let selectedIndexes = []; // Stores selected buttons indexes

function selectButton(index) {
    let buttons = document.querySelectorAll(".range-btn");

    // If it's already selected, it's wiped out of memory
    if (selectedIndexes.includes(index)) {
        selectedIndexes = selectedIndexes.filter(i => i !== index);
    } else { // Else, is pushed into memory
        selectedIndexes.push(index);
    }

    // Order selected indexes
    selectedIndexes.sort((a, b) => a - b);

    // Cleaning styles before apply new ones
    buttons.forEach(btn => btn.classList.remove("first-active", "last-active"));

    if (selectedIndexes.length === 1) {
        // If there's one button, it's the first one
        buttons[selectedIndexes[0]].classList.add("first-active");
    } else if (selectedIndexes.length > 1) {
        let first = selectedIndexes[0];
        let last = selectedIndexes[selectedIndexes.length - 1];

        // Applies classes according to the alternation logic
        buttons[first].classList.add("first-active");
        buttons[last].classList.add("last-active");
    }
}

function submit () {
    if (selectedIndexes.length === 2) { // If indexes memory are two buttons selected
        // Fetches an html file
        fetch("./components/thank-you.html")
        .then(response => response.text())
        .then(html => {
            // Inside article tag, the main div is replaced by #article-thank-you's div
            let artSubmit = document.getElementById("article-submit");
            artSubmit.innerHTML = html;

            // Numbers span are replaced by the indexes memory
            let firstNumber = document.getElementById("first-num");
            firstNumber.innerHTML = selectedIndexes[0] + 1;
            let lastNumber = document.getElementById("last-num");
            lastNumber.innerHTML = selectedIndexes[selectedIndexes.length - 1] + 1;
        })
        .catch(error => console.error("Error loading file:", error));   
    }
}