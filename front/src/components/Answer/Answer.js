import React, { Component } from 'react';

import './Answer.css';

export default class Answer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answer: null,
            onAnswer: null,
        }
    }

    render() {
        return (
            <div className="d-flax">
                <div className="Answer">
                    <button className="Answer__button" onClick={this.props.onAnswer}> {this.props.answer} </button> 
                </div>
            </div>
        ) 
    }
};