// EXTENSIONS (for day.js) //

dayjs.extend(window.dayjs_plugin_calendar);
dayjs.extend(window.dayjs_plugin_advancedFormat);




// GLOBAL SELECTORS / CONSTANTS //

const currentDay = dayjs();
const timeEl = $('#currentTime');
const scheduleSectionDiv = $('.schedule-section');
const START_TIME = 9;
const END_TIME = 17;




// FUNCTIONS //

// Updates time every minute
function updateTime() {
    // sets current time to timeEl
    timeEl.text(dayjs().format('h:mm:ss A'));

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
        let currentHour = dayjs().hour();

        // Creates hour block
        let hourBlock = $(`<div class="row hour-block hour-block-${h}">`);
    
        // Creates hour column and appends the current hour
        let hourCol = $('<div class="col-3 col-md-2 hour">');
        hourCol.append(`<div class=${h}>${hour.format('h A')}</div>`);
    
        // Creates text column
        let textCol = $('<textarea class="col form-control description" name="description-text" id="textArea">');

        // Add appropriate class depending on hour of the day
        if (h === currentHour) {
            textCol.addClass('present');
        } else if (h < currentHour) {
            textCol.addClass('past');
        } else {
            textCol.addClass('future');
        }
        
        //  Creates Save button and appends icon
        let saveButton = $('<button type="button" class=" btn d-flex justify-content-center align-items-center btn-danger col-2 col-md-1 saveBtn">');
        saveButton.append('<i class="fas fa-save"></i>');
        
        // Appends all columns to hourBlock
        hourBlock.append(hourCol, textCol, saveButton);
    
        // Appends all hourBlock to shcedule div
        scheduleSectionDiv.append(hourBlock);
    });
}




// ## STARTUP FUNCTION ## //

function startApp () {
    // 1. Figure out today'sdate, and put it at the top of the page
    let dayEl = $('#currentDay');
    dayEl.text(currentDay.format('dddd, MMMM Do'));
    // Starts Timer
    updateTime()

    
    for (let i = START_TIME; i <= END_TIME; i++) {
        createHourBlock(i);
    }
}

// Calls startApp() function that starts all other startup functions
startApp()