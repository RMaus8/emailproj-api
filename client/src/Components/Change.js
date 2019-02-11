import React, {Fragment} from 'react'

import styles from './styles.module.css';

const change = (props) => (
    <Fragment>
        <form className={styles.form} onSubmit={(e) => props.onChange(e)}>
            <h1>Change your info</h1>
            <div>
                <input type="text" name="email" placeholder="email" onChange={(e) => props.newEmail(e)}/>
                <input type="password" name="password" placeholder="password" onChange={(e) => props.newPassword(e)}/>            
            </div>
            <button>Submit</button>
        </form>
    </Fragment>
)

export default change;