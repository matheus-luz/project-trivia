import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      name: '',
      email: '',
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
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
        >
          Jogar
        </button>

      </section>
    );
  }
}

export default Login;
