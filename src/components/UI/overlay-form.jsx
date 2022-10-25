import Styles from './overlayForm.module.css'
import useApi from '../../hooks/useApi'
import useInput from '../../hooks/useInput';
import CartContext from './cartContext';
import { useEffect, useState, useContext } from 'react';
const overlayForm = (props) => {
    const contex = useContext(CartContext)
    const [data, setData] = useState('');
    const [formIsValid, setFormIsValid] = useState(false);
    const { isLoading, error, sendRequest: placeOrder } = useApi();

    const { enteredValue: enteredname,
        isValid: nameIsValid,
        changeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        isInvalid: nameIsInvalid,
        reset: nameReset } = useInput(value => value.trim() !== '')

    const { enteredValue: enteredAddress,
        isValid: addressIsValid,
        changeHandler: addressChangeHandler,
        inputBlurHandler: addressBlurHandler,
        isInvalid: addressIsInvalid,
        reset: addressReset } = useInput(value => value.trim() !== '')

    const { enteredValue: enteredAmount,
        isValid: amountIsValid,
        changeHandler: amountChangeHandler,
        inputBlurHandler: amountBlurHandler,
        isInvalid: amountIsInvalid,
        reset: amountReset } = useInput(value => value.trim() !== '' && value == props.amount)

    const submitHandler = (event) => {
        event.preventDefault();
        nameBlurHandler();
        addressBlurHandler();
        amountBlurHandler();

        if (!nameIsValid || !addressIsValid || !amountIsValid) {
            return;
        }

        setFormIsValid(true);

        setData({
            name: enteredname,
            amount: enteredAmount,
            address: enteredAddress,
            '1': contex.items['1'],
            '2': contex.items['2'],
            '3': contex.items['3'],
            '4': contex.items['4'],
        })

        props.cartShow();
        nameReset();
        addressReset();
        amountReset();

    }

    useEffect(() => {
        setFormIsValid(false);
        const request = {
            method: 'POST',
            body: data,
            url: 'https://food-order-app-51714-default-rtdb.firebaseio.com/orderlist.json',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        placeOrder(request, '')


    }, [data])

    const nameInputClasses = nameIsInvalid
        ? 'form-control invalid'
        : 'form-control';

    const addressInputClasses = addressIsInvalid
        ? 'form-control invalid'
        : 'form-control';
    const amountInputClasses = amountIsInvalid
        ? 'form-control invalid'
        : 'form-control';

    return (
        <form onSubmit={submitHandler}>
            <div className={Styles.personal}>
                <div className={nameInputClasses}>
                    <label htmlFor='name'>Your Name</label>
                    <input
                        type='text'
                        id='name'
                        value={enteredname}
                        onChange={nameChangeHandler}
                        onBlur={nameBlurHandler}
                    />
                    {nameIsInvalid && (
                        <p className='error-text'>Name must not be empty.</p>
                    )}
                </div>
                <div className={addressInputClasses}>
                    <label htmlFor='name'>Your address</label>
                    <input
                        type='text'
                        id='name'
                        value={enteredAddress}
                        onChange={addressChangeHandler}
                        onBlur={addressBlurHandler}
                    />
                    {addressIsInvalid && (
                        <p className='error-text'>Address must not be empty.</p>
                    )}
                </div>
            </div>
            <div className={amountInputClasses}>
                <label htmlFor='name'>Amount</label>
                <input
                    type='text'
                    id='name'
                    value={enteredAmount}
                    onChange={amountChangeHandler}
                    onBlur={amountBlurHandler}
                />
                {amountIsInvalid && (
                    <p className='error-text'>Entered amount does not match amount to be paid.</p>
                )}
            </div>
            <div className='form-actions'>
                <h2>Amount: ${contex.totalPrice}</h2>
                <button id='button' type='submit'>Order</button>
            </div>
        </form>
    );
}

export default overlayForm;