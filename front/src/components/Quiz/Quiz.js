import lodash from 'lodash';
import React, { Component } from 'react';

import Question from '../Question/Question';
import Answer   from '../Answer/Answer';
import Clock    from '../Clock/Clock';

import './Quiz.css';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.timeout = null;

    this.state = {
        level: props.level,
        questionNumber: 0,
        isAnswerCorrect: null,
        userAnswerCorrect: [],
        userAnswerWrong: [],
    }

    this.onAnswer          = this.onAnswer.bind(this);
    this.onClockEnd        = this.onClockEnd.bind(this);
    this.renderAnswersList = this.renderAnswersList.bind(this);
    this.renderCounters    = this.renderCounters.bind(this);
  }

  // Life cycle
  componentWillReceiveProps(newProps) {
    this.setState({
      level: newProps.level,
      questionNumber: 0,
      isAnswerCorrect: null,
      userAnswerCorrect: [],
      userAnswerWrong: [],
    });
  }

  nextQuestion() {
    let nextQuestionNumber = this.state.questionNumber + 1;

    if (nextQuestionNumber > this.state.level.length) {
      return null;
    }

    clearTimeout(this.timeout);    
    this.setState({ 
      questionNumber: nextQuestionNumber, 
      isAnswerCorrect: null, 
    });
  }

  nextLevel(resetLevelNumber) {
    this.props.getLevel(resetLevelNumber)
  }

  // Events
  onAnswer(event, timeEnd) {
    if (!event && timeEnd) {
      this.setState({
          userAnswerWrong: this.state.userAnswerWrong.concat(this.state.level[this.state.questionNumber].id),        
      })

      return this.timeout = setTimeout(() => {
          this.nextQuestion();        
      }, 500)
    }

    let userAnswer = event.currentTarget.textContent.trim();
    let isUserCorrect;

    for (let answer of this.state.level[this.state.questionNumber].answers) {
      if (answer.correct && answer.answer.trim() === userAnswer) {
        isUserCorrect = true;
        
        this.setState({ 
          userAnswerCorrect: this.state.userAnswerCorrect.concat(this.state.level[this.state.questionNumber].id),
          isAnswerCorrect: true,
        })
        
        this.timeout = setTimeout(() => {
          return this.nextQuestion();
        }, 500);
      };
    }

    if (!isUserCorrect) {
      this.setState({ 
          userAnswerWrong: this.state.userAnswerWrong.concat(this.state.level[this.state.questionNumber].id),
        })

        this.timeout = setTimeout(() => {
          return this.nextQuestion();
        }, 500);
    }
  }

  onClockEnd() {
    this.onAnswer(null, true);
  }

  // Renders 
  renderCounters(question) {
    let questionNumber    = this.state.questionNumber;    
    let userAnswerCorrect = this.state.userAnswerCorrect;
    let userAnswerWrong   = this.state.userAnswerWrong;

    let className = question.id === questionNumber ? "Question-Number Question-Number--Active" : "Question-Number"
    let isAnswerCorrect = lodash.includes(userAnswerCorrect, question.id);
    let isAnswerWrong   = lodash.includes(userAnswerWrong, question.id);

      return ( 
            <div key={question.id} className={className}> 
                <div key={question.id + 1} > 
                  {isAnswerCorrect ? <span>&#10004;</span> : isAnswerWrong ? <span> X </span> : (question.id + 1)} 
                </div>
            </div>
        )
  }

  renderAnswersList(answer) {
    return <Answer key={answer.id} answer={answer.answer} onAnswer={this.onAnswer} />  
  }

  render() {
    if (!this.props.level) { return <div> Loading ... </div> };  
    if (this.state.userAnswerWrong.length > 2) { return <div onClick={() => this.nextLevel(true)}> טעית 3 פעמים, נסה מההתחלה! </div> }
    if (this.props.level.message) { 
      return <div> שגיאה  </div>
    }
    
    let isLevelEnd = this.state.questionNumber < this.state.level.length
    let questionNumber = this.state.questionNumber;

    return (         
        <div className="Quiz">
            <div className="Quiz__Questions-Count">
              {this.state.level.map(this.renderCounters)}
            </div>
            <Clock deadline="30" onClockEnd={this.onClockEnd} /> 

          { isLevelEnd ? 
            (<div className="Quiz__Question-Container">
                <Question question={this.state.level[questionNumber].question} type={this.state.level[questionNumber].type} />
                {this.state.level[questionNumber].answers.map(this.renderAnswersList)}
            </div>) : <div> <button onClick={() => this.nextLevel(false)}> לשלב הבא! </button> </div>}
 
        </div>
    )
  }
}

export default Quiz;
