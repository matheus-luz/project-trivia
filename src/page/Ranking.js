import PropTypes from 'prop-types';
import React from 'react';

class Ranking extends React.Component {
  constructor() {
    super();
    this.redirectToHome = this.redirectToHome.bind(this);
  }

  redirectToHome() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
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
