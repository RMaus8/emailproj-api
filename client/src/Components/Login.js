import React, {Component} from 'react';
import axios from '../axios-user';

import styles from './styles.module.css';

class Login extends Component {
    state = {
        user: {

        }
    }

    onChange = event => {
        let userData = {
            ...this.state.user,
            [event.target.name]: event.target.value
        }
        this.setState({user: userData})
    }

    onSubmit = event => {
        event.preventDefault();

        const newUser = {
            user: { 
                ...this.state.user
            } 
        }
        
        axios.post('/', newUser)
            .then(res => res.data)
            .then(() => this.props.history.replace('/home'))
            
    }

    render () {
        return (
            <form className={styles.form} onSubmit={this.onSubmit}>
                <h1>Login</h1>
                <div>
                    <input type="text" name="email" placeholder="email" />
                    <input type="password" name="password" placeholder="password" />            
                </div>
                <button>Submit</button>
            </form>
        )
    }
}
    

export default Login