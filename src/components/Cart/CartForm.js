import classes from "./CartForm.module.css";
import { Fragment, useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";

const CartForm = (props) => {
  const [formInputsValidity, setFormInputsValidity] =  useState(
    {
        name: true,
        street:true,
        city: true
    }
  )
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreedIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    setFormInputsValidity({
        name: enteredNameIsValid,
        street: enteredStreedIsValid,
        city: enteredCityIsValid
    })

    const formIsValid =
      enteredNameIsValid && enteredStreedIsValid && enteredCityIsValid;
    if (!formIsValid){
        return
    }
    props.onSubmit({
        name: enteredName,
        street: enteredStreet,
        city: enteredCity
    })
  };

  return (
    <Fragment>
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={`${classes.control} ${formInputsValidity.name ? '':classes.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef}></input>
        {!formInputsValidity.name && <p>enter a valid Name</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.street ? '':classes.invalid}`}>
        <label htmlFor="street">Your Street</label>
        <input type="text" id="street" ref={streetInputRef}></input>
        {!formInputsValidity.street && <p>enter a valid street</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.city ? '':classes.invalid}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef}></input>
        {!formInputsValidity.city && <p>enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button className={classes.submit}>Confirm</button>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </form>
    </Fragment>
  );
};
export default CartForm;
