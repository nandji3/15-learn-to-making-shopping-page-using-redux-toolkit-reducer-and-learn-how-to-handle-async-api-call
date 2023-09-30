import { useDispatch } from 'react-redux';
import classes from './CartButton.module.css';
import { cartShowHideAction } from '../Redux/cartSlice';

const CartButton = (props) => {

  const dispatch = useDispatch();


  const cartShowHideHandler = () => {
    dispatch(cartShowHideAction())
  }

  return (
    <button className={classes.button} onClick={cartShowHideHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
