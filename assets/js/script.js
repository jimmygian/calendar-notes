/* WORK DAY SCHEDULER

This project uses jQuery and day.js to display
a calendar-like scheduler that stores user's preferencees
to localStorage.

*/



// EXTENSIONS (for day.js) //
dayjs.extend(window.dayjs_plugin_calendar);
dayjs.extend(window.dayjs_plugin_advancedFormat);

// GLOBAL SELECTORS
const timeEl = $('#currentTime');
const scheduleSectionDiv = $('.schedule-section');

// GLOBAL CONSTANTS
const CURRENT_DATE = dayjs('2023-11-12 13:30:00'); // For testing
// const CURRENT_DATE = dayjs();
const dateFormated = `${CURRENT_DATE.format('YYMMDD')}`
const START_TIME = 9;
const END_TIME = 17;
const userData = JSON.parse(localStorage.getItem('userData')) || {};

// GLOBAL VARIABLES //
let hasData = false;
let user = { lastSaved: dateFormated, schedule: {} };


// ========= //
// Starts all startup functions (declared below)
startApp();
// ========= //




// ## FUNCTIONS ## //

// Updates time every minute
function updateTime() {
    // sets current time to timeEl
    timeEl.text(CURRENT_DATE.format('h:mm:ss A'));

    // Updates it every second
    setInterval(function () {
        let currentTime = dayjs();
        timeEl.text(currentTime.format('h:mm:ss A'));
    }, 1000);
}



// Updates 'hasData' and 'user[schedule]' based on userData
function updateUserData() {
    if (Object.keys(userData).length > 0) {
        if (userData['lastSaved'] === dateFormated && Object.keys(userData['schedule']).length > 0) {
            hasData = true;
            user.schedule = userData.schedule;
        } else {
            // Resets every day
            localStorage.removeItem('userData');
        }
    }
}



// Creates hour-block instance
function createHourBlock(h) {
    $(document).ready(function () {

        // Gets hour from day.js
        let hour = dayjs().hour(h);
        // Gets current hour
        let currentHour = CURRENT_DATE.hour();

        // Creates hour block
        let hourBlock = $(`<div class="row hour-block">`);
        hourBlock.attr('id', h)

        // Creates hour column and appends the current hour
        let hourCol = $('<div class="col-3 col-md-2 hour">');
        hourCol.append(`<div class=${h}>${hour.format('h A')}</div>`);
        hourCol.attr('id', `hour-col-${h}`)

        // Creates text column
        let textCol = $('<textarea class="col form-control description" name="description-text" id="textArea">');
        textCol.attr('id', `text-col-${h}`)

        // Adds appropriate class depending on hour of the day
        if (h === currentHour) {
            textCol.addClass('present');
            hourCol.addClass('hour-present');
        } else if (h < currentHour) {
            textCol.addClass('past');
            hourCol.addClass('hour-past');
        } else {
            textCol.addClass('future');
            hourCol.addClass('hour-future');
        }

        if (hasData) {
            if (userData['schedule'].hasOwnProperty(h)) {
                textCol.text(userData['schedule'][h]);
            }
        }

        //  Creates Save button and appends icon
        let saveButton = $('<button type="button" class=" fas fa-save btn d-flex justify-content-center align-items-center btn-danger col-2 col-md-1 saveBtn">');
        // saveButton.append('<i class="fas fa-save"></i>');
        saveButton.attr('id', `save-button-${h}`)

        // Appends all columns to hourBlock
        hourBlock.append(hourCol, textCol, saveButton);

        // Appends all hourBlock to shcedule div
        scheduleSectionDiv.append(hourBlock);
    });
}




// ## STARTUP FUNCTION ## //

function startApp() {
    // 1. Figures out today's date and display it at the top of the page
    let dayEl = $('#CURRENT_DATE');
    dayEl.text(CURRENT_DATE.format('dddd, MMMM Do'));

    // 2. Starts Timer
    updateTime();

    // 3. Updates 'user' and 'hasData' global vars depending on userData
    updateUserData();

    // 4. Creates hour blocks based on START and END global constants, declared on top
    for (let i = START_TIME; i <= END_TIME; i++) {
        createHourBlock(i);
    }
}



// ## EVENT HANDLERS ## //

scheduleSectionDiv.on('click', function (e) {
    console.log(e.target);
    console.log(e.target.parentElement);

    const target = e.target;
    if (target.tagName === 'BUTTON') {
        // Store hour-block's hour in a variable
        let blockText = target.previousElementSibling.value;
        let blockHour = target.parentElement.id;
        console.log(`${blockHour}: ${blockText}`);
        storeText(blockHour, blockText);
    }
});

function storeText(key, value) {

    let schedule = user.schedule;

    // Removes key if value is an empty string
    if (value.trim(" ") !== "") {
        schedule[key] = value.trim();
    } else {
        delete schedule[key];
    }

    // Stringify object and save it to localStorage
    userJSON = JSON.stringify(user);
    localStorage.setItem('userData', userJSON);
}