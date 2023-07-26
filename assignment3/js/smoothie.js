/* 
    Name: Tyler Elliott
    Student Number: 200345596
    Date: July 26th, 2023
*/

// instantiate summary and smoothieOrder variables
let summary;
let smoothieOrder;

// add event listener to call playSong function on mouse click in document
document.addEventListener("click", playSong);
// playSong function plays music from audio element in HTML
function playSong() {
    // play music from audio element
    document.getElementById("music").play();
    // remove event listener so that song will not keep restarting when user clicks
    document.removeEventListener("click", playSong());
}

// create Smoothie class to utilize form data
class Smoothie {
    // constructor to accept form data variables and smoothie cost variable
    constructor(name, size, style, liquids, creams, fruits, veggies, add, special, cost) {
        // set each argument variable value to class variable value
        this.name = name;
        this.size = size;
        this.style = style;
        this.liquids = liquids;
        this.creams = creams;
        this.fruits = fruits;
        this.veggies = veggies;
        this.add = add;
        this.special = special;
        this.cost = cost;
    };
    // confirmOrder() class function to create smoothie image and display user order summary
    confirmOrder() {
        // instantiate height and margin variables
        let height;
        let leftMargin;
        // switch statement for size to determine custom smoothie image size and leftMargin amount
        switch (this.size) {
            case "Small":
                height = 200;
                leftMargin = 40;
                break;
            case "Medium":
                height = 250;
                leftMargin = 39;
                break;
            case "Large":
                height = 300;
                leftMargin = 38;
                break;
            default:
                height = 350;
                leftMargin = 35;
        }
        // generate the floor of a random number between 0 - 999
        let hue = Math.floor(Math.random() * 1000);
        // original code edited from https://stackoverflow.com/questions/7415872/change-color-of-png-image-via-css
        // set customSmoothie img style to predefined values with height and leftMargin defined by switch statement, and hue amount
        // set by floor of Math.random() * 1000
        document.getElementById("customSmoothie").style =
            "visibility: visible; height: " + height + "px; width: auto; filter: invert(48%) sepia(13%) saturate(3207%) hue-rotate(" +
            hue + "deg) brightness(100%) contrast(80%); margin-left: " + leftMargin + "%;";
        // if creams is empty, set value to "no"
        if (this.creams == "") {
            this.creams = "no";
        }
        // if fruits is empty, set value to "no"
        if (this.fruits == "") {
            this.fruits = "no";
        }
        // if veggies is empty, set value to "no"
        if (this.veggies == "") {
            this.veggies = "no";
        }
        // if add is empty, set value to "nothing"
        if (this.add == "") {
            this.add = "nothing";
        }
        // if special is empty, set value to "nonexistent"
        if (this.special == "") {
            this.special = "nonexistent"
        }
        // store summary of smoothie order by passing all constructor variables of Smoothie object to innerHTML of summary element
        summary.innerHTML = `Thank you, ${this.name}! Your ${this.size} and ${this.style} smoothie is currently being prepared 
                                using ${this.liquids} as a liquid base. You chose to add ${this.creams} ice cream, ${this.fruits} fruits, 
                                and ${this.veggies} vegetables. As for the add-on, you chose to add ${this.add} to your smoothie. Lastly, your
                                special instructions were ${this.special}. All in all, your smoothie total cost is $${this.cost}. Enjoy!`;
        // change summary color to black in case the text was red from error message
        summary.style = "color: black";
    };
};

// function to validate the form data
function validateForm() {
    // store summary reference
    summary = document.getElementById("summary");
    // error message if name is empty
    if (document.getElementById("name").value == "") {
        summary.innerHTML = "Please enter your name.";
        summary.style = "color: red";
        return;
    }
    // error message if size is empty
    else if (document.getElementById("size").value == "") {
        summary.innerHTML = "Please select a size.";
        summary.style = "color: red";
        return;
    }
    // error message if style is empty
    else if (document.getElementById("style").value == "") {
        summary.innerHTML = "Please select a blend style.";
        summary.style = "color: red";
        return;
    }
    // error message if no liquid is checked
    else if (!document.getElementById("liquid1").checked && !document.getElementById("liquid2").checked && !document.getElementById("liquid3").checked) {
        summary.innerHTML = "Please choose a liquid base.";
        summary.style = "color: red";
        return;
    }
    // if data passes validation above, call setData() function to store user smoothie choices
    setData();
}

// function to set user smoothie data from form
function setData() {
    // store references to summary (p) and smoothieOrder (form) elements
    summary = document.getElementById("summary");
    smoothieOrder = document.getElementById("smoothieOrder");
    // instantiate cost variable for calculating cost of smoothie
    let cost = 0.00;
    // store name and size input values from form element index
    let name = smoothieOrder.elements[0].value;
    let size = smoothieOrder.elements[1].value;
    // switch statement to determine cost based on size chosen
    switch (size) {
        case "Small":
            cost = 2.00;
            break;
        case "Medium":
            cost = 3.00;
            break;
        case "Large":
            cost = 4.00;
            break;
        default:
            cost = 5.00;
    }
    // store style input value from form element index
    let style = smoothieOrder.elements[2].value;
    // liquidArray to hold different smoothie options from user
    let liquidArray = [];
    // for loop iterates 3 times to check checkbox values
    for (let i = 3; i < 6; i++) {
        // if checkbox is checked, push checked value to liquidArray
        if (smoothieOrder.elements[i].checked) {
            liquidArray.push(smoothieOrder.elements[i].value);
            // switch statement for current checked item to increment cost based on liquid
            switch (smoothieOrder.elements[i].value) {
                case "Milk":
                    cost += 2.00;
                    break;
                case "Water":
                    cost += 1.00;
                    break;
                default:
                    cost += 1.50;
            }
        }
    }
    // creamArray to hold different ice cream choices
    let creamArray = [];
    // for loop to iterate through ice cream checkboxes
    for (let i = 6; i < 10; i++) {
        // if checkbox is checked, push checked value to creamArray and increment cost by 1
        if (smoothieOrder.elements[i].checked) {
            creamArray.push(smoothieOrder.elements[i].value);
            cost += 1.00;
        }
    }
    // fruitArray to hold fruit choices
    let fruitArray = [];
    // for loop to iterate through fruit checkboxes
    for (let i = 10; i < 14; i++) {
        // if checkbox is checked, push value to fruitArray and increment cost by 0.75
        if (smoothieOrder.elements[i].checked) {
            fruitArray.push(smoothieOrder.elements[i].value);
            cost += 0.75;
        }
    }
    // vegArray to hold veggie choices
    let vegArray = [];
    // for loop to iterate through veggie checkboxes
    for (let i = 14; i < 18; i++) {
        // if checkbox is checked, push value to vegArray and increment cost by 0.75
        if (smoothieOrder.elements[i].checked) {
            vegArray.push(smoothieOrder.elements[i].value);
            cost += 0.75;
        }
    }
    // store add-on input value from form element index
    let add = smoothieOrder.elements[18].value;
    // switch statement to increment cost by add-on choice value
    switch (add) {
        case "Espresso Shot":
            cost += 0.50;
            break;
        case "Whipped Cream":
            cost += 1.00;
            break;
        default:
            cost += 1.00;
    }
    // store special instructions value from form element index
    let special = smoothieOrder.elements[19].value;
    // create Smoothie object by passing form data and cost as arguments; store new object in customerSmoothie variable
    let customerSmoothie = new Smoothie(name, size, style, liquidArray.join(" + "), creamArray.join(" + "), fruitArray.join(" + "),
        vegArray.join(" + "), add, special, cost.toFixed(2));
    // call confirmOrder() function from customerSmoothie to output order summary
    customerSmoothie.confirmOrder();
}