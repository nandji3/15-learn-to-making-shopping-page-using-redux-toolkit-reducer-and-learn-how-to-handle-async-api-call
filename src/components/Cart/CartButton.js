import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { toggleCartAction } from '../Redux/uiSlice';

const CartButton = () => {

  const dispatch = useDispatch();

  const { totalQuantity } = useSelector(state => state.cart)

  const toggleCartHandler = () => {
    dispatch(toggleCartAction())
  }

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
