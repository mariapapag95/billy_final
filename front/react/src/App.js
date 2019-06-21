import React, { Component } from 'react';
import Routes from './components/Routes'
import './App.css';

class App extends Component{
  constructor(props) {
    super(props);

    this.state ={
      isAuthenticated: false
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({isAuthenticated: authenticated});
  }

  render () {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      
      <div>
          <div className="body">
            <Routes childProps={childProps} />
          </div>
      </div>

    )
  }
}

export default App;