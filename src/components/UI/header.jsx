import Button from './button'
import Styles from './header.module.css'
import React from 'react';
const header = (props) => {
    return (
        <React.Fragment>
            <div className={Styles.navbar}>
                <h1>ReactMeals</h1>
                <Button showCart={props.cartShow} counter={props.counter} />
            </div>
            <div className={Styles.image}><img src="https://images.unsplash.com/photo-1547573854-74d2a71d0826?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZCUyMHRhYmxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" /></div>
        </React.Fragment>
    )
}

export default header;