import PropTypes from 'prop-types';
import React from 'react';

class Button extends React.Component {
  render() {
    const { key, datatestid, onClick = null, description } = this.props;
    return (
      <div>
        <button
          type="button"
          key={ key }
          data-testid={ datatestid }
          onClick={ onClick }
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
}.isRequired;

export default Button;
