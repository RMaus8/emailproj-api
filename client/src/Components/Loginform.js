import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom'

import styles from './styles.module.css';

const loginForm = (props) => (
    <Fragment>
        <h4>{props.message}</h4>
        <NavLink to='/create'>Create a login?</NavLink>
        <form className={styles.form} onSubmit={(e) => props.onSubmit(e)}>
            <h1>Login</h1>
            <div>
                <input type="text" name="email" placeholder="email" onChange={(e) => props.onChangeHandler(e)}/>
                <input type="password" name="password" placeholder="password" onChange={(e) => props.onChangeHandler(e)}/>            
            </div>
            <button>Submit</button>
        </form>
    </Fragment>
    
)


    

export default loginForm