import React from 'react';
import { NavLink } from 'react-router-dom'

import styles from './styles.module.css'

const home = (props) => (
    <div className={styles.Home}>
        <h1>home page</h1>
        <h5 onClick={props.logout}>Logout</h5>
        <NavLink to="/change">Change login info</NavLink>
    </div>
    
)

export default home;