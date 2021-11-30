import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';
import Header from '../components/Header';
import requestQuestions from '../services/index';
import Timer from '../components/Timer';
import { setScore } from '../redux/action';

const buttonClassName = '.btn-question';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      loading: true,
      index: 0,
      timerId: 0,
      nextButton: false,
    };

    this.handleQuestion = this.handleQuestion.bind(this);
    this.createQuestions = this.createQuestions.bind(this);
    this.createButtonsArray = this.createButtonsArray.bind(this);
    this.handleQuestionClick = this.handleQuestionClick.bind(this);
    this.createButton = this.createButton.bind(this);
    this.setTimerId = this.setTimerId.bind(this);
    this.setNextButton = this.setNextButton.bind(this);
    this.nextQuestions = this.nextQuestions.bind(this);
  }

  componentDidMount() {
    this.handleQuestion();
    this.setLocalStorageState();
  }

  setTimerId(timerId) {
    this.setState({ timerId });
  }

  setLocalStorageState() {
    const { player } = this.props;
    localStorage.setItem('state', JSON.stringify({ player }));
  }

  setNextButton(boolean) {
    this.setState({ nextButton: boolean });
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

  createButton(question, datatestText, index, colorQuestion) {
    return (
      <Button
        key={ index }
        description={ question }
        datatestid={ `${datatestText}${index}` }
        className={ colorQuestion }
        handleClick={ this.handleQuestionClick }
      />
    );
  }

  changeButtonsColor() {
    const buttons = document.querySelectorAll(buttonClassName);
    buttons.forEach((button) => {
      if (button.classList.contains('correct')) {
        button.classList.add('green-border');
      } else {
        button.classList.add('red-border');
      }
    });
  }

  disableButtons() {
    const buttons = document.querySelectorAll(buttonClassName);
    buttons.forEach((button) => {
      button.disabled = true;
    });
  }

  async handleQuestionClick({ target }) {
    this.changeButtonsColor();
    this.stopTimer();
    await this.countScore(target);
    this.disableButtons();
    this.setLocalStorageState();
    this.setNextButton(true);
  }

  nextQuestions() {
    const { index } = this.state;
    const { history } = this.props;
    const five = 4;
    if (index === five) {
      history.push('/feedback');
    }
    this.setState(
      (prevState) => ({ index: prevState.index + 1, nextButton: false }),
    );
    this.enableButtons();
  }

  enableButtons() {
    const buttons = document.querySelectorAll(buttonClassName);
    buttons.forEach((button) => {
      button.disabled = false;
    });
  }

  nextButton() {
    return (
      <button
        data-testid="btn-next"
        onClick={ this.nextQuestions }
        type="button"
      >
        Próxima
      </button>
    );
  }

  countScore(questionClicked) {
    if (!questionClicked.classList.contains('incorrect')) {
      const { questions, index } = this.state;
      const { countScore } = this.props;
      const dificuldade = {
        easy: 1,
        medium: 2,
        hard: 3,
      };
      const timer = document.getElementById('timer');
      const timerValue = Number(timer.innerText);
      const defaultPoints = 10;
      const difficultyString = questions[index].difficulty;

      const score = defaultPoints + (timerValue * dificuldade[difficultyString]);
      countScore(score);
    }
  }

  stopTimer() {
    const { timerId } = this.state;
    clearInterval(timerId);
  }

  createButtonsArray(array) {
    const wrong = 'wrong-answer-';
    const correct = 'correct-answer';
    const correctColor = 'correct btn-question';
    const incorrectColor = 'incorrect btn-question';
    const buttonArray = [];
    array.forEach((question, index) => {
      if (index === array.length - 1) {
        buttonArray.push(this.createButton(question, correct, '', correctColor));
      } else {
        buttonArray.push(this.createButton(question, wrong, index, incorrectColor));
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
    const { questions, loading, index, nextButton } = this.state;
    return (
      <section>
        {
          loading ? <span>Loading...</span> : (
            <>
              <Header />
              <Timer
                changeButtonsColor={ this.changeButtonsColor }
                disableButtons={ this.disableButtons }
                setTimerId={ this.setTimerId }
              />
              <h4 data-testid="question-text">{questions[index].question}</h4>
              <h3 data-testid="question-category">{questions[index].category}</h3>
              { this.createQuestions(questions[index]) }
              { nextButton && this.nextButton() }
            </>
          )
        }
      </section>
    );
  }
}

Game.propTypes = {
  token: PropTypes.any,
  countScore: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
  player: state.playerReducer,
});

const mapDispatchToProps = (dispatch) => ({
  countScore: (score) => dispatch(setScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
