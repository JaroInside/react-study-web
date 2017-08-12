import React from 'react';

class Authentication extends React.Component {
  render() {
    return (
      <div>
          {this.props.mode ? 'loginView' : 'registerView' }
      </div>
    );
  }
}

export default Authentication;
