import React from 'react'

import Calendar from './Calendar.jsx'
import Note from './Note.jsx'

import '../styles/App.css'

export default class App extends React.Component {
    render() {
        return (
            <div id="container">
                <div className="box">
                    <div className="left">
                        <Calendar />
                    </div>
                    <div className="right">
                        <Note />
                    </div>
                </div>
            </div>
        );
    }
}