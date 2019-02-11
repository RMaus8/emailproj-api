import React, { Component } from 'react';
import Login from './Components/Loginform';
import Home from './Components/Home';
import Create from './Components/Create';
import Change from './Components/Change';
import axios from './axios-user';
import {withRouter, Route, Redirect, Switch} from 'react-router-dom'

import styles from './App.module.css';

class App extends Component {
  state = {
    user: null,
    message: '',
    valid: null,
    newUserName: null,
    newPassword: null
  }

  componentDidMount () {
    axios.get('/').then(res => {
      console.log(res.data)
      this.setState({valid: res.data.valid})
    })
  }

  newEmail = event => {
    const data = {
      ...this.state,
      newUserName: event.target.value
    }
    this.setState({data})
  }

  newPassword = event => {
    const data = {
      ...this.state,
      newPassword: event.target.value
    }
    this.setState({data})
  }

  onChangeHandler = event => {
    let userData = {
        ...this.state.user,
        [event.target.name]: event.target.value
    }
    this.setState({user: userData})
  }

  onChange = event => {
    event.preventDefault();
    const newUser = {
        ...this.state
    }
    axios.post('/change', newUser)
      .then(res => {
        this.props.history.push('/home')
      })
  }

  onCreate = event => {
    event.preventDefault();
    const newUser = {
        user: { ...this.state.user } 
    }
    axios.post('/create', newUser.user)
      .then(res => {
        this.setState({user: {...res.data}})
        this.props.history.push('/home');
      })
  }

  onSubmit = event => {
    event.preventDefault();
    const newUser = {
        user: { ...this.state.user } 
    }
    console.log(newUser)
    axios.post('/', newUser)
      .then(res => {
        if(res.data.valid || res.data.email) {        
          this.setState({valid: true, message:'user logged in'})       
          this.props.history.push('/home')       
        } else {
          this.setState({user: this.state.user, message:res.data.message})
        }
      })
    }

  render() {
    let routes = (
      <Switch>
        <Route path="/create" render={() => <Create onChangeHandler={this.onChangeHandler} onCreate={this.onCreate}/>} />
        <Route path="/" exact render={() => <Login message={this.state.message} onChangeHandler={this.onChangeHandler} onSubmit={this.onSubmit}/>} />
        <Redirect to="/" />
      </Switch>
    )
    if(this.state.valid) {
      routes = (
        <Switch>
          <Route path="/home" render={() => <Home/>} />
          <Route path="/create" render={() => <Create onChangeHandler={this.onChangeHandler} onCreate={this.onCreate}/>} />
          <Route path="/change" render={() => <Change newEmail={this.newEmail} newPassword={this.newPassword} onChange={this.onChange}/>} />
          <Route path="/" exact render={() => <Login message={this.state.message} onChangeHandler={this.onChangeHandler} onSubmit={this.onSubmit}/>} />
          <Redirect to="/" />
        </Switch>
      );
    }
    
    return (
      <div className={styles.App}>
        {routes}        
      </div>
    );
  }
}

export default withRouter(App);
