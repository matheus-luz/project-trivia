import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import requestQuestions from '../services/index';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
    };

    this.handleQuestion = this.handleQuestion.bind(this);
  }

  async componentDidMount() {
    const { token } = this.props;
    const response = await requestQuestions(token);
    const questionsGame = response.results;
    this.handleQuestion();
    return questionsGame;
  }

  async handleQuestion() {
    const { token } = this.props;
    const response = await requestQuestions(token);
    const questionsGame = response.results;
    this.setState({ questions: questionsGame });
  }

  render() {
    const { questions } = this.state;
    return (
      <section>
        <span data-testid="question-category" />
        {/* <h4 data-testid="question-text" /> */}
        { console.log(questions) }
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
