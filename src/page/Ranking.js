import PropTypes from 'prop-types';
import React from 'react';
import md5 from 'crypto-js/md5';

const GRAVATAR = 'https://www.gravatar.com/avatar/';
const EMAIL_TO_HASH = (email) => md5(email).toString();


class Ranking extends React.Component {
  constructor() {
    super();
    this.redirectToHome = this.redirectToHome.bind(this);
  }

  redirectToHome() {
    const { history } = this.props;
    history.push('/');
  }

  renderRanking() {
    const playerRanking = JSON.parse(localStorage.getItem('ranking'));
    const ordenedRanking = playerRanking.sort((one, two) => {
      if (two.score === one.score) {
        return two.score;
      }
      return two.score - one.score;
    });
    const rankingList = ordenedRanking.map((player, index) => {
      const { name, score, gravatarEmail } = player;
      return (
        <li key={ gravatarEmail }>
          <img
            src={ `${GRAVATAR}${EMAIL_TO_HASH(gravatarEmail)}` }
            data-testid="header-profile-picture"
            alt="gravatar"
          />
          <span data-testid={ `player-name-${index}` }>
            {' '}
            { name }
            {' '}
          </span>
          <span data-testid={ `player-score-${index}` }>
            {' '}
            { score }
            {' '}
          </span>
        </li>

      );
    });

    return rankingList;
  }


  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {this.renderRanking()}
        </ul>
        <button
          onClick={ this.redirectToHome }
          data-testid="btn-go-home"
          type="button"
        >
          Tela inicial

        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
