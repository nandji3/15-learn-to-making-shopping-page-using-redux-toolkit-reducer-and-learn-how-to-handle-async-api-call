import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { Fragment, useEffect } from 'react';
import { showNotification } from './components/Redux/uiSlice';
import Notification from './components/UI/Notification';


let isInitial = true;

function App() {

  const dispatch = useDispatch();
  const { cartIsVisible, notification } = useSelector(state => state.ui)
  const { cartItems } = useSelector(state => state.cart)

  // console.log("Inside App Component Notification -->", notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
      );

      const response = await fetch(
        'https://reduxtoolkitcart-c3fbf-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cartItems),
        }
      );
      // console.log("Inside App Component useEffect() to check response -->", response.ok)
      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }

      dispatch(showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sent cart data successfully!',
      })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sending cart data failed!',
      })
      );
    });
  }, [cartItems, dispatch]);

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
