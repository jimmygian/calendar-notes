// day.js extensions
dayjs.extend(window.dayjs_plugin_calendar);
dayjs.extend(window.dayjs_plugin_advancedFormat);


// GLOBAL SELECTORS / CONSTANTS //

const currentDay = dayjs();
const timeEl = $('#currentTime');



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





// CREATE BLOCKS
// Figure out how to make a block for every hour from 9 to 5 inclusive
    // each block should: 
    // allow for text entry (textarea or input element)
    // include an hour label
    // include a save button that
        // has a click handler .on('click') that writes to local storage
    // be styled based on whether the hour is in the past, presest, or future

    // each block should add the stored notes to the appropriate



// Figure out how to make a block for every hour from 9 am to 5 pm inclusive
//   each block should allow for text entry (perhaps the block is an input element/textarea)
//   based on hour of the day, 
//      each block should be styled based on whether the
//          hour is in the past, present, or future
//      any block in the past should be locked such that
//          text cannot be edited (Nice to have)
//     
//   each block should include an hour label
//   each block should include a save button
//      each save button should have a click handler that
//         writes to local storage - somehow, we need to associate each hour's tasks
//         with a separate key
//         Maybe save a single object for the page where the keys in the object are hour numbers and the values are the tasks
//             -OR-
//         Maybe save each task separately to local storage, e.g.
//               localStorage.setItem("9 am", "eat some pie");
//               localStorage.setItem("10 am", "pretend to work")
//   each block should load stored tasks for the given hour from local storage


// Nice to have: Include reminder functionality
//  As the current time approaches the next hour, trigger
//  an alert/dialog/modal that will say what is upcoming
// Nice to have: Some way to indicate a task has been completed (checkbox, button, etc.?)




// ## STARTUP FUNCTION ## //

function startApp () {
    // 1. Figure out today'sdate, and put it at the top of the page
    let dayEl = $('#currentDay');
    dayEl.text(currentDay.format('dddd, MMMM Do'));
    // Starts Timer
    updateTime()
}

// Calls startApp() function that starts all other startup functions
startApp()