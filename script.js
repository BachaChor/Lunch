let todayButtonElement = document.querySelector(".today-button")
let calenderElement = document.querySelector("#calender");
let entryBoxElement = document.querySelector("#entry-box");
let submitButtonElement = document.querySelector("#leave-submit");
let reasonContentElement = document.querySelector("#reason-content");
let Meal_LeaveArray = JSON.parse(localStorage.getItem("MealLeave")) || [];

let radioContent = ["Call_issue", "Cooking", "Biryani", "Collage",  "Other"]
let fragment = document.createDocumentFragment();
let mealLeaveCounter = 0;
let idx = 0;


let Meal_Leave = {
    serial_no : mealLeaveCounter,
    date : "someDate",
    reason : "someReason",
    time_of_day : "morning",
};



///////////////////////////////////////////////////////////////////////////////////////////////////
let createEntry = (leave) => {
    
    let{serial_no, reason, date, timeOfDay} = leave;
    

    let element_SERIAL = document.createElement("div");
    element_SERIAL.classList.add("leave-serial", "USER_ENTRY");
    element_SERIAL.innerText = serial_no;

    let element_REASON = document.createElement("div");
    element_REASON.classList.add("leave-reason", "USER_ENTRY");
    element_REASON.innerText = reason;

    let element_DATE = document.createElement("div");
    element_DATE.classList.add("leave-date", "USER_ENTRY")
    element_DATE.innerText = date;

    let element_TIME_OF_DAY = document.createElement("div");
    element_TIME_OF_DAY.classList.add("leave-time-of-day", "USER_ENTRY");
    element_TIME_OF_DAY.innerText = timeOfDay;


    let wrapperDiv = document.createElement("div");
    wrapperDiv.classList.add("user-leave-entry");
    wrapperDiv.appendChild(element_SERIAL);
    wrapperDiv.appendChild(element_REASON);
    wrapperDiv.appendChild(element_DATE);
    wrapperDiv.appendChild(element_TIME_OF_DAY);

    reasonContentElement.appendChild(wrapperDiv);
    
    console.log("running");
}



showPreviousEntry = () => {
    Meal_LeaveArray.forEach(element => {
        createEntry(element);
    });
}

showPreviousEntry();    // calling the function


let createRadioButtons = (totalButtonNumbers) => {
    let radioButtonCotainerElement = document.createElement("div");
    radioButtonCotainerElement.id = "radio-button-container";
    for(let i=0; i<totalButtonNumbers; i++) {
        let reasonRadioElement = document.createElement("input");
        reasonRadioElement.type = "radio";
        reasonRadioElement.name = "leave-reason";
        reasonRadioElement.value = radioContent[idx];
        reasonRadioElement.setAttribute("id", `radio-${idx}`);

        let reasonRadioLabelElement = document.createElement("label");
        reasonRadioLabelElement.setAttribute("for", `radio-${idx}`);
        reasonRadioLabelElement.innerText = radioContent[idx];
        reasonRadioLabelElement.style.cssText = "margin-right : 5px";

        let reasonWrapperElement = document.createElement("div");
        reasonWrapperElement.classList.add("radio-wrapper");
        reasonWrapperElement.appendChild(reasonRadioLabelElement);
        reasonWrapperElement.appendChild(reasonRadioElement);
        
        radioButtonCotainerElement.appendChild(reasonWrapperElement);
        idx++;
    }
    entryBoxElement.insertBefore(radioButtonCotainerElement, submitButtonElement);
}


createRadioButtons(radioContent.length);



submitButtonElement.addEventListener("click", function() {
    
    let currentDate = calenderElement.value;
    let selectedTimeOfDay = document.querySelector("input[name='time-of-day']:checked")?.value;
    let reason = document.querySelector("input[name='leave-reason']:checked")?.value;


    Meal_Leave = {
        serial_no : ++mealLeaveCounter,
        date : currentDate,
        reason : reason,
        time_of_day : selectedTimeOfDay,
    }

    if(currentDate && selectedTimeOfDay && reason) {
        Meal_LeaveArray.push(Meal_Leave);
        localStorage.setItem("MealLeave", JSON.stringify(Meal_LeaveArray));
        createEntry(Meal_Leave);
    } else {
        alert("Fill the details correctly.");
    }


})











