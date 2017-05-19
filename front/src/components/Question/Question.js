import React from 'react';

import './Question.css';

export default function question(props) {
    return (
            <div className="Question"> 
                <div className="Question__Panel panel panel-info">
                    <div className="panel-heading"> 
                        <span>
                            {props.type} 
                        </span>
                    </div>
                    <div className="panel-body">
                        <span>
                            {props.question} 
                        </span>
                    </div>
                </div>
            </div>
    ) 
};
