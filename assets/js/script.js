// EXTENSIONS (for day.js) //

dayjs.extend(window.dayjs_plugin_calendar);
dayjs.extend(window.dayjs_plugin_advancedFormat);




// GLOBAL SELECTORS - CONSTANTS //

const timeEl = $('#currentTime');
const scheduleSectionDiv = $('.schedule-section');
const CURRENT_DATE = dayjs();
const dateFormated = `${CURRENT_DATE.format('YYMMDD')}`
const START_TIME = 9;
const END_TIME = 20;
const userData = JSON.parse(localStorage.getItem('userData')) || {};
console.log(userData);

let user = {
    lastSaved: dateFormated,
    schedule: {}
};



// FUNCTIONS //

// Updates time every minute
function updateTime() {
    // sets current time to timeEl
    timeEl.text(CURRENT_DATE.format('h:mm:ss A'));

    // Updates it every second
    setInterval( function() {
            let currentTime = dayjs();
            timeEl.text(currentTime.format('h:mm:ss A'));
        } ,1000);
}

// Creates hour-block
function createHourBlock(h) {
    $(document).ready(function() {

        // Get hour from day.js
        let hour = dayjs().hour(h);
        // Get current hour
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

        // Add appropriate class depending on hour of the day
        if (h === currentHour) {
            textCol.addClass('present');
        } else if (h < currentHour) {
            textCol.addClass('past');
        } else {
            textCol.addClass('future');
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

function startApp () {
    // 1. Figure out today'sdate, and put it at the top of the page
    let dayEl = $('#CURRENT_DATE');
    dayEl.text(CURRENT_DATE.format('dddd, MMMM Do'));
    // Starts Timer
    updateTime()

    
    for (let i = START_TIME; i <= END_TIME; i++) {
        createHourBlock(i);
    }
}

// Calls startApp() function that starts all other startup functions
startApp()

scheduleSectionDiv.on('click', function(e) {
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

    if (value !== "") {
        schedule[key] = value;
        console.log(user);
    } else {
        delete schedule[key];
        console.log(user);
    }

    userJSON = JSON.stringify(user);

    localStorage.setItem('userData', userJSON);
}