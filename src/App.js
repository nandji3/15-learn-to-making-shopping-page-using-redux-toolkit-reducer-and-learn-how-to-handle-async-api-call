import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { Fragment, useEffect } from 'react';
import Notification from './components/UI/Notification';
import { getCartDataFromBackend, sendCartData } from './components/Redux/cartAction';


let isInitial = true;

function App() {

  const dispatch = useDispatch();

  const { cartIsVisible, notification } = useSelector(state => state.ui)

  const cart = useSelector(state => state.cart)

  // console.log("Inside App Component -->", cart);

  useEffect(() => {
    dispatch(getCartDataFromBackend())
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);


  return (
    <Fragment>
      {notification && (<Notification
        status={notification.status}
        title={notification.title}
        message={notification.message} />)}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
