import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartBotton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const btnClass = `${classes.button} ${isHighlighted ? classes.bump : ''}`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setIsHighlighted(true);
    const timer = setTimeout(() => {
      setIsHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <div>
      <button className={btnClass} onClick={props.onClick}>
        <span className={classes.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
      </button>
    </div>
  );
};

export default HeaderCartButton;
