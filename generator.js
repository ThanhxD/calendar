// Datepicker in Zeller
// weekday = [(13 * month - 1) / 5  + year / 4 + century / 4 + day + year - 2 * century] % 7
//      weekday: 0 = Sunday, 1 = Monday,...
//      day = 1,..,31
//      month = 1 = March, 2 = April,..., 11 = Jan, 12 = Feb 
//      year = 2 last characters in current year: 2016 = 16
//      century = 2 first characters in current year: 2016 = 20
// Ex: 18/09/2016
// day = 18, month = 7, year = 16, century = 20
// => weekday = 0 => Sunday

// Implement
/**
 * Calculate weekday
 * @param {json} date {day, month, year}
 */
function WTFisWeekday(date) {
    date = reCalculateDate(date);
    let day = calculateDay(date.day);
    let month = calculateMonth(date.month);
    let year = calculateYear(date.year);
    let century = calculateCentury(date.year);

    // console.log('calculate for: ', day, ' - ', month, ' - ', year, ' - ', century);
    let weekday = (Math.floor(13 * (month + 1) / 5)  + Math.floor(year / 4) + Math.floor(century / 4) + day + year + 5 * century) % 7;
    
    return Math.trunc((Math.trunc(weekday) + 6) % 7);
}

function reCalculateDate(date) {
    if (date.month >= 3) return date;
    return {
        day: date.day,
        month: date.month + 12,
        year: date.year - 1
    };
}

function calculateDay(day) {
    return day;
}

function calculateMonth(month) {
    return month >= 3
            ? month
            : month + 12;
}

function calculateYear(year) {
    return year % 100;
}

function calculateCentury(year) {
    return Math.floor(year / 100);
}

function isLeap(year) {
    if ((year % 4 !== 0) || (year % 100 === 0 && year % 400 !== 0)) return 0;
    return 1;
}

function countDaysInMonth(month, year) {
    let daysMap = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return (month !== 2)? daysMap[month-1]: (28 + isLeap(year));
}

function generateMonthCalendar(month, year) {
    let monthMaps = []; //6x7 = 42
    let startWeekday = WTFisWeekday({day: 1, month: month, year: year});
    // fill in days of previous month
    let countDaysPreMonth = countDaysInMonth(month === 1? 12: month - 1);
    for (let i = 0; i < startWeekday; i++) monthMaps.push(countDaysPreMonth - startWeekday + i + 1);
    // console.log('result: ', monthMaps);
    // console.log(countDaysPreMonth);
    // console.log(startWeekday)
    // fill in days in month
    let countDays = countDaysInMonth(month, year);
    for (let i = 1; i <= countDays; i++) monthMaps.push(i);
    // fill in days for next month
    let i = 1;
    while (monthMaps.length < 42) monthMaps.push(i++);

    return monthMaps;
}

// Test
let dateText = '06/02/2018';
let date = preprocess(dateText);
let weekdayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
console.log(`====== calendar ${date.month}/${date.year} ======`);
const colors = require('colors');
let monthCalendar = generateMonthCalendar(date.month, date.year);
let startDayIndex = WTFisWeekday({day: 1, month: date.month, year: date.year});
let endDayIndex = startDayIndex + countDaysInMonth(date.month) - 1;
console.log('Sun Mon Tue Wed Thu Fri Sat');
for (let i = 0, j = monthCalendar.length; i < j; i++) {
    if (i < startDayIndex || i > endDayIndex) {
        process.stdout.write(`${colors.gray(monthCalendar[i])}${(monthCalendar[i] >= 10)? '  ': '   '}`);
    } else if (i % 7 === 0 || (i + 1) % 7 === 0) {
        process.stdout.write(`${colors.red(monthCalendar[i])}${(monthCalendar[i] >= 10)? '  ': '   '}`);
    } else if (monthCalendar[i] === date.day) {
        process.stdout.write(`${colors.green(monthCalendar[i])}${(monthCalendar[i] >= 10)? '  ': '   '}`);
    } else {
        process.stdout.write(`${colors.white(monthCalendar[i])}${(monthCalendar[i] >= 10)? '  ': '   '}`);
    }
    if (i > 0 && (i + 1) % 7 === 0) process.stdout.write('\n');
}

// Utils
function preprocess(dateText) {
    let pieces = dateText.split('/');
    let date = {
        day: eval(pieces[0]),
        month: eval(pieces[1]),
        year: eval(pieces[2])
    }

    return date;
}
