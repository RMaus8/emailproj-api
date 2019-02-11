import React from 'react';
import { NavLink } from 'react-router-dom'

import styles from './styles.module.css'

const home = () => (
    <div className={styles.Home}>
        <h1>home page</h1>
        <NavLink to="/logout">Logout</NavLink>
        <NavLink to="/change">Change login info</NavLink>
    </div>
    
)

export default home;