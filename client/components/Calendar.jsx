import React from 'react'
import '../styles/Calendar.css'

export default class Calendar extends React.Component {

    constructor() {
        super();
        this.state = {
            day: 6,
            month: 2,
            year: 2018
        }

        this.dateChange = this.dateChange.bind(this);
    }

    render() {
        return (
            <div className="calendar">
                <h2> Calendar </h2>
                {this.genInputDate()}
                <br/>
                {this.genDayMap()}
            </div>
        )
    }

    genInputDate() {
        return (
            <div className="input-date">
                <select name="days" onChange={this.dateChange}>
                {Array.from({length: 31}, (v, i) => i+1).map(v => <option key={'day' + v} value={v}>{v}</option>)}
                </select>
                <select name="months" onChange={this.dateChange}>
                {Array.from({length: 12}, (v, i) => i+1).map(v => <option key={'month' + v} value={v}>{v}</option>)}
                </select>
                <select name="years" onChange={this.dateChange}>
                {Array.from({length: 100}, (v, i) => i+1950).map(v => <option key={'year' + v} value={v}>{v}</option>)}
                </select>
            </div>
        )
    }

    dateChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        switch (name) {
            case "days": this.setState(state => Object.assign(state, {day: eval(value)})); break;
            case "months": this.setState(state => Object.assign(state, {month: eval(value)})); break;
            case "years": this.setState(state => Object.assign(state, {year: eval(value)})); break;
        }
    }

    genDayMap() {
        let maps = this.generator();
        console.log(maps);
        return (
            <div className="maps">
            {Array.from(["Sun", 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']).map((item, index) => {
                if (index === 0 || index === 6) {
                    return (<div className="title red">{item}</div>)
                } else {
                    return (<div className="title">{item}</div>)
                }
            })}
            {maps.map((item, index) => {
                if (item === 0) {
                    return (<div className="gray">-</div>)
                } else if (item === this.state.day) {
                    return (<div className="green">{item}</div>)
                } else if (index % 7 === 0) {
                    return (<div className="red">{item}</div>)
                } else if (index > 0 && (index+1) % 7 === 0) {
                    return (<div className="red">{item}<br/></div>);
                } else {
                    return (<div className="black">{item}</div>)
                }
            })}
            </div>
        )
    }

    generator() {
        let day = this.state.day;
        let month = this.state.month;
        let year = this.state.year;

        console.log('call');

        return generateMonthCalendar(month, year);

        function generateMonthCalendar(month, year) {
            let monthMaps = []; //6x7 = 42
            let startWeekday = WTFisWeekday({day: 1, month: month, year: year});
            // fill in days of previous month
            let countDaysPreMonth = countDaysInMonth(month === 1? 12: month - 1);
            for (let i = 0; i < startWeekday; i++) monthMaps.push(0);//monthMaps.push(countDaysPreMonth - startWeekday + i + 1);
            // fill in days in month
            let countDays = countDaysInMonth(month, year);
            for (let i = 1; i <= countDays; i++) monthMaps.push(i);
            // fill in days for next month
            let i = 1;
            while (monthMaps.length < 42) monthMaps.push(0);//monthMaps.push(i++);
        
            return monthMaps;
        }

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
    }
}