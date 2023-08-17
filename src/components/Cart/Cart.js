import { Fragment, useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import CartForm from "./CartForm";
const Cart = (props) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `#${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length > 0;
  const handleOnAdd = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const handleOnRemove = (id) => {
    cartCtx.removeItem(id);
  };

  const handleSubmit = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch(
      "https://react-project-311c0-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, orderItems: cartCtx.items }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearItem();
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={handleOnRemove.bind(null, item.id)}
          onAdd={handleOnAdd.bind(null, item)}
        />
      ))}
    </ul>
  );

  const handleOnClick = () => {
    setIsCheckingOut(true);
  };
  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItem && (
        <button className={classes.button} onClick={handleOnClick}>
          Order
        </button>
      )}
    </div>
  );

  const cartModal = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckingOut && (
        <CartForm onSubmit={handleSubmit} onCancel={props.onClose} />
      )}
      {!isCheckingOut && modalAction}
    </Fragment>
  );
const didSubmitModalContent = <p>Successfully sent the order!</p>
const isSubmittingModalContent = <p>Sending order...</p>
  return <Modal onClose={props.onClose}>
    {!isSubmitting && !didSubmit && cartModal}
    {isSubmitting && isSubmittingModalContent}
    {!isSubmitting && didSubmit && didSubmitModalContent}
  </Modal>;
};

export default Cart;
