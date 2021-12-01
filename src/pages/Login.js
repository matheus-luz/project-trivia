import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Bootstrap from '../components/Bootstrap';
import Button from '../components/Button';
import { loginUser, tokenAPI } from '../redux/action/index';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.sendTokenToLocalStorage = this.sendTokenToLocalStorage.bind(this);
    this.handleSettings = this.handleSettings.bind(this);

    this.state = {
      name: '',
      email: '',
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { userLogin, history, setToken } = this.props;

    userLogin({ ...this.state });

    this.setState({ name: '', email: '' });

    await setToken();
    this.sendTokenToLocalStorage();
    history.push('/game');
  }

  sendTokenToLocalStorage() {
    const { token } = this.props;
    localStorage.setItem('token', token);
  }

  handleSettings() {
    const { history } = this.props;

    history.push('/settings');
  }

  render() {
    const { name, email } = this.state;
    return (
      <section>
        <img src={ logo } className="logo-login" alt="jogo-trivia" />
        <form>
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
              className="input-email"
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
          <Button
            type="button"
            datatestid="btn-settings"
            handleClick={ this.handleSettings }
            description="Configurações"
          />
        </form>
        <Bootstrap />
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
  setToken: (token) => dispatch(tokenAPI(token)),
});

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
