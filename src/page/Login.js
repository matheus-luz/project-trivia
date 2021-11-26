import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Button from '../components/Button';
import { loginUser, tokenAPI } from '../redux/action/index';

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
    console.log('token', token);
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
            onClick={ this.handleSettings }
            description="Configurações"
          />
        </form>
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
