import mealImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
import classes from "./header.module.css";
const Header = (props) => {
  return (
    <div>
      <header className={classes.header}>
        <h1 className="header">Israel's Kitchen</h1>
        <HeaderCartButton onClick = {props.onShowCart}  />
      </header>
      <div className={classes['main-image']}>
        <img src={mealImage} />
      </div>
    </div>
  );
};

export default Header;
