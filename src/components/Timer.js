import PropTypes from 'prop-types';
import React from 'react';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      time: 30,
      timerId: 0,
    };
  }

  componentDidMount() {
    this.updateSeconds();
  }

  componentDidUpdate() {
    const { time, timerId } = this.state;
    const { changeButtonsColor, disableButtons } = this.props;
    const TIME_LIMIT = 0;
    if (time === TIME_LIMIT) {
      changeButtonsColor();
      disableButtons();
      clearInterval(timerId);
    }
  }

  updateSeconds() {
    const ONE_SECOND = 1000;
    const { setTimerId } = this.props;
    const timerId = setInterval(() => {
      this.setState((prevState) => ({ time: prevState.time - 1 }));
    }, ONE_SECOND);
    this.setState({ timerId });
    setTimerId(timerId);
  }

  render() {
    const { time } = this.state;
    return (
      <section id="timer">
        <p>
          {' '}
          { time }
          {' '}
        </p>
      </section>
    );
  }
}

Timer.propTypes = {
  changeButtonsColor: PropTypes.func,
  disableButtons: PropTypes.func,
}.isRequired;

export default Timer;
