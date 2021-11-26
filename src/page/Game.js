import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';
import Header from '../components/Header';
import requestQuestions from '../services/index';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      loading: true,
      index: 0,
    };

    this.handleQuestion = this.handleQuestion.bind(this);
    this.createQuestions = this.createQuestions.bind(this);
    this.createButtonsArray = this.createButtonsArray.bind(this);
  }

  componentDidMount() {
    this.handleQuestion();
  }

  async handleQuestion() {
    const { token } = this.props;
    const response = await requestQuestions(token);
    const questionsGame = response.results;
    this.setState({ questions: questionsGame, loading: false });
  }

  // pegamos está função desse vídeo - https://www.youtube.com/watch?v=myL4xmtAVtw
  arrayShuffle(array) {
    let newPos;
    let temp;
    for (let i = array.length - 1; i > 0; i -= 1) {
      newPos = Math.floor(Math.random() * (i + 1));
      temp = array[i]; array[i] = array[newPos]; array[newPos] = temp;
    } return array;
  }

  createButton(question, datatestText, index) {
    return (
      <Button
        key={ index }
        description={ question }
        datatestid={ `${datatestText}${index}` }
      />
    );
  }

  createButtonsArray(array) {
    const wrong = 'wrong-answer-';
    const correct = 'correct-answer';
    const buttonArray = [];
    array.forEach((question, index) => {
      if (index === array.length - 1) {
        buttonArray.push(this.createButton(question, correct, ''));
      } else {
        buttonArray.push(this.createButton(question, wrong, index));
      }
    });
    return buttonArray;
  }

  createQuestions({
    correct_answer: correctAnswer, incorrect_answers: incorrectAnswers }) {
    const questionsArray = [...incorrectAnswers, correctAnswer];
    const questionButton = this.createButtonsArray(questionsArray);
    const sortedQuestions = this.arrayShuffle(questionButton);
    return sortedQuestions;
  }

  render() {
    const { questions, loading, index } = this.state;
    return (
      <section>
        {
          loading ? <span>Loading...</span> : (
            <>
              <Header />
              <h4 data-testid="question-text">{questions[index].question}</h4>
              <h3 data-testid="question-category">{questions[index].category}</h3>
              { this.createQuestions(questions[index]) }
            </>
          )
        }
      </section>
    );
  }
}

Game.propTypes = {
  token: PropTypes.any,
}.isRequired;

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
});

export default connect(mapStateToProps)(Game);
