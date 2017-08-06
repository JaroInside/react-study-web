import React from 'react';
import PropTypes from 'prop-types';

class Authentication extends React.Component {
  render() {
    return (
      <div>
          {this.props.mode ? 'loginView' : 'registerView' }
      </div>
    );
  }
}

Authentication.propTypes = {
    mode: PropTypes.bool,
};

Authentication.defaultProps = {
    mode: true,
};


export default Authentication;
