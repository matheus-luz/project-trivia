import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { loginUser } from '../redux/action/index';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      name: '',
      email: '',
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick() {
    const { userLogin, history } = this.props;

    userLogin({ ...this.state });

    this.setState({ name: '', email: '' });

    history.push('/game');
  }

  render() {
    const { name, email } = this.state;
    return (
      <section>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="input-player-name"
            id="name"
            name="name"
            type="text"
            onChange={ this.handleChange }
            value={ name }
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            id="email"
            name="email"
            type="email"
            onChange={ this.handleChange }
            value={ email }
          />
        </label>

        <button
          type="button"
          data-testid="btn-play"
          disabled={ !email || !name }
          onClick={ this.handleClick }
        >
          Jogar
        </button>

      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  loginUser: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  userLogin: (state) => dispatch(loginUser(state)),
});

export default connect(null, mapDispatchToProps)(Login);
