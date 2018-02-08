import React from 'react'
import '../styles/Note.css'

export default class Note extends React.Component {

    constructor() {
        super();
        this.state = {
            notes: ["hello", "it's me", "i was wondering if after all these years", "you lied to me"]
        }
    }
    render() {
        return (
            <div className="note">
                <h2> Note </h2>
                <div className="note-container">
                    <div className="list">
                    {this.state.notes.map((note, index) => {
                        return (
                            <div className="note-box" key={"note" + index}>
                                <div className="note-content" >{note}</div>
                                <div className="delete">x</div>
                            </div>
                        );
                    })}
                    </div>
                    <div className="add">+</div>
                </div>
            </div>
        )
    }
}