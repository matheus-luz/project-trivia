import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

const GRAVATAR = 'https://www.gravatar.com/avatar/';
const EMAIL_TO_HASH = (email) => md5(email).toString();

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    return (
      <header>
        <img
          src={ `${GRAVATAR}${EMAIL_TO_HASH(email)}` }
          data-testid="header-profile-picture"
          alt="gravatar"
        />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">{ score }</span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.playerReducer.name,
  email: state.playerReducer.email,
  score: state.playerReducer.score,
});

export default connect(mapStateToProps)(Header);
