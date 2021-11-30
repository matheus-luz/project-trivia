import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { player: { score, assertions } } = this.props;
    const NUMBER_THREE = 3;
    return (
      <>
        <Header />
        <main>
          <h2 data-testid="feedback-total-score">
            { score }
          </h2>
          <h2 data-testid="feedback-total-question">
            { assertions }
          </h2>
          <h1 data-testid="feedback-text">
            {assertions >= NUMBER_THREE ? 'Mandou bem!' : 'Podia ser melhor...' }
          </h1>
          <button
            data-testid="btn-play-again"
            type="button"
          >
            Jogar Novamente

          </button>
          <button
            data-testid="btn-ranking"
            type="button"
          >
            Ver Ranking

          </button>
        </main>
      </>
    );
  }
}

Feedback.propTypes = {
  player: PropTypes.shape({
    assertions: PropTypes.number,
    score: PropTypes.number,
  }),
}.isRequired;

const mapStateToProps = (state) => (
  {
    player: state.playerReducer,
  }
);

export default connect(mapStateToProps)(Feedback);
