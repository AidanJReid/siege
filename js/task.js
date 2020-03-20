// Define UI Vars

const form = document.querySelector("#target-form");
const targetList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-targets");
const filter = document.querySelector("#filter");
const targetInput = document.querySelector("#target");

// Load all event listeners

loadEventListeners();

function loadEventListeners() {
    // DOM load event
    document.addEventListener("DOMContentLoaded", getTargets);
    // Add target event
    form.addEventListener("submit", addTarget);
    // Remove target event
    targetList.addEventListener("click", removeTarget);
    // Clear Target events
    clearBtn.addEventListener("click", clearTarget);
    // Filter Target events
    filter.addEventListener("keyup", filterTarget);
}

// Get Targets from LS
function getTargets(){
let targets;
    if(localStorage.getItem("targets") === null){
        targets = [];
    } else {
        targets = JSON.parse(localStorage.getItem("targets"));
    }

    targets.forEach(function(target){
        //Create li element
        const li = document.createElement("li");
        // Add class
        li.className = "collection-item";
        // Create text node and append to li
        li.appendChild(document.createTextNode(target));
        // Create new link element
        const link = document.createElement("a");
        // Add class
        link.className = "delete-item secondary-content";
        // Add icon html
        link.innerHTML = "<i class='fa fa-remove'></i>";
        // Append the link to li
        li.appendChild(link);

        //Append LI to UL
        targetList.appendChild(li);
        });
}

// Add Target
function addTarget(e){
    if(targetInput.value === "") {
        alert("Add a target!");
    }

    //Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(targetInput.value));
    // Create new link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = "<i class='fa fa-remove'></i>";
    // Append the link to li
    li.appendChild(link);

    //Append LI to UL
    targetList.appendChild(li);

    // Store in local storage
    storeTargetInLocalStorage(targetInput.value);

    //Clear input
    targetInput.value = "";

    e.preventDefault();
}

// Store Task
function storeTargetInLocalStorage(target){
    let targets;
    if(localStorage.getItem("targets") === null){
        targets = [];
    } else {
        targets = JSON.parse(localStorage.getItem("targets"));
    }

    targets.push(target);
    localStorage.setItem("targets", JSON.stringify(targets));
}

// Remove Target
function removeTarget(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("Are You Sure?")) {
        e.target.parentElement.parentElement.remove();

        // Remove from LS
        removeTargetFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from LS
function removeTargetFromLocalStorage(targetItem){
    let targets;
    if(localStorage.getItem("targets") === null){
        targets = [];
    } else {
        targets = JSON.parse(localStorage.getItem("targets"));
    }

    targets.forEach(function(target, index){
        if(targetItem.textContent === target){
            targets.splice(index, 1);
        }
    });

    localStorage.setItem("targets", JSON.stringify(targets));
}

// Clear Targets
function clearTarget (){
    while(targetList.firstChild){
        targetList.removeChild(targetList.firstChild)
    }

    // Clear Targets from LS
    clearTargetsFromLocalStorage();
}

// Clear Targets from LS
function clearTargetsFromLocalStorage(){
    localStorage.clear();
}

// Filter Target
function filterTarget(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach
    (function(target){
        const item = target.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1){
            target.style.display = "block";
        } else {
            target.style.display = "none";
        }
    });
}