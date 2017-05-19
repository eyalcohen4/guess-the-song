import React, { Component } from 'react';

import './Clock.css';

export default class Clock extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            current: props.deadline
        }

        this.timeout = null;
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(this.tick, 1000);
    }
    
    componentWillReceiveProps(props) {
        clearInterval(this.interval);

        this.setState({ 
            current: props.deadline,
            onClockEnd: props.onClockEnd,
        });

       return this.interval = setInterval(this.tick, 1000);        
    }

    tick() {
        if (this.state.current === 0) {
            this.props.onClockEnd();
            clearInterval(this.interval); 
            return null; 
        };

        return this.setState({
            current: this.state.current - 1
        })
    }

    render() {

        return (
            <div className="d-flax">
                <div className="Clock">
                    <span className="Clock__Time"> {this.state.current} </span> 
                </div>
            </div>
        ) 
    }
};
