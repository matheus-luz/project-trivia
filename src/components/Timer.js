import PropTypes from 'prop-types';
import React from 'react';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      time: 30,
      timerOn: true,
      timerId: 0,
    };
    this.turnTimer = this.turnTimer.bind(this);
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

  turnTimer(bool) {
    this.setState({
      timerOn: bool,
    });
  }

  updateSeconds() {
    const ONE_SECOND = 1000;
    const { timerOn } = this.state;
    const timerId = setInterval(() => {
      if (timerOn) {
        this.setState((prevState) => ({ time: prevState.time - 1 }));
      }
    }, ONE_SECOND);
    this.setState({ timerId });
  }

  render() {
    const { time } = this.state;
    return (
      <section>
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
