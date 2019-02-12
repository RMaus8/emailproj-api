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
    const valid = localStorage.getItem('valid') === 'true'
    const email = localStorage.getItem('email')
    const pass = localStorage.getItem('password')
    console.log(valid)
    if(valid) {
      this.setState({user: {
        email: email,
        password: pass
      },
        valid: valid}, () => this.goHome())    
    }    
  }

  goHome = () => {
    this.props.history.push('/home')
  }

  newEmail = event => {
    const data = {
      ...this.state,
      newUserName: event.target.value
    }
    this.setState({...data}, () => console.log(this.state))
  }

  newPassword = event => {
    const data = {
      ...this.state,
      newPassword: event.target.value
    }
    this.setState({...data}, () => console.log(this.state))
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
        alert(res.data.message);
        this.logout()
      })
  }

  onCreate = event => {
    event.preventDefault();
    const newUser = {
        user: { ...this.state.user } 
    }
    axios.post('/create', newUser.user)
      .then(res => {
        this.setState({user: {...res.data}, message:''})
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
          localStorage.setItem('valid', this.state.valid)       
          localStorage.setItem('email', this.state.user.email)       
          localStorage.setItem('password', this.state.user.password)       
          this.props.history.push('/home')      
        } else {
          this.setState({user: this.state.user, message:res.data.message})
        }
      })
    }

    logout = () => {
      this.setState({
          user: null,
          message: '',
          valid: null,
          newUserName: null,
          newPassword: null        
      })
      localStorage.setItem('valid', false)
      this.props.history.replace('/')
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
          <Route path="/home" render={() => <Home logout={this.logout}/>} />
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
