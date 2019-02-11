import React, {Fragment} from 'react';

import styles from './styles.module.css';

const create = (props) => (
    <Fragment>
        <form className={styles.form} onSubmit={(e) => props.onCreate(e)}>
            <h1>create a login</h1>
            <div>
                <input type="text" name="email" placeholder="email" onChange={(e) => props.onChangeHandler(e)}/>
                <input type="password" name="password" placeholder="password" onChange={(e) => props.onChangeHandler(e)}/>            
            </div>
            <button>Submit</button>
        </form>
    </Fragment>
)

export default create;