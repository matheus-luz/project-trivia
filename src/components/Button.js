import PropTypes from 'prop-types';
import React from 'react';

class Button extends React.Component {
  render() {
    const {
      key,
      datatestid,
      handleClick = null,
      description,
      className = 'btn' } = this.props;
    return (
      <div>
        <button
          type="button"
          key={ key }
          data-testid={ datatestid }
          onClick={ handleClick }
          className={ className }
        >
          { description }
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  datatestid: PropTypes.string,
  description: PropTypes.string,
  key: PropTypes.number,
  className: PropTypes.string,
  handleClick: PropTypes.func,
}.isRequired;

export default Button;
