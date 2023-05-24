// Used with "Exclude Founders" and "Hide Completed" buttons
function buttonCheck(button, text1, text2, desiredClass, container) {
    // Checks if the (text1 parameter) button is active
    if (button.innerHTML.indexOf(text1) !== -1) {
        for (let i = 0; i < container.length; i++) {
            // Checks if the item has the parameter desiredClass and hides it, if so
            if (container[i].classList.contains(desiredClass)) {
                container[i].style.display = "none";
            }
            // Changes the button's text to text2 parameter
            button.innerHTML = text2;
        }
    // Checks if the (text2 parameter) button is active
    } else {
        for (let i = 0; i < container.length; i++) {
            // Checks if the item has the parameter desiredClass and shows it, if so
            if (container[i].classList.contains(desiredClass)) {
                container[i].style.display = "block";
            }
        // Changes the button's text to text1 parameter
        button.innerHTML = text1;
        }
    }
}

// Updates various counters when items are clicked
function updateCounters(counter1, counter2, complete1, total1, complete2, total2) {
    // Changes the Total Mastery count
    counter1.innerHTML = `${complete1} / ${total1}`;
    // Changes the Category count
    counter2.innerHTML = `(${complete2} / ${total2})`;
}

export { buttonCheck, updateCounters };