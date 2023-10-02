import { replaceCartAction } from "./cartSlice";
import { showNotification } from "./uiSlice";

export const getCartDataFromBackend = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
                "https://reduxtoolkitcart-c3fbf-default-rtdb.firebaseio.com/cart.json"
            );
            if (!response.ok) {
                throw new Error("Could not fetch cart data !");
            }
            const data = response.json();
            return data;
        };

        try {
            const getCartData = await fetchData();
            // console.log("Inside getCartDataFromBackend -->", getCartState);
            dispatch(
                replaceCartAction({
                    cartItems: getCartData.cartItems || [],
                    totalQuantity: getCartData.totalQuantity,
                })
            );
            dispatch(
                showNotification({
                    status: "success",
                    title: "Success!",
                    message: "Sent cart data successfully!",
                })
            );
        } catch (error) {
            dispatch(
                showNotification({
                    status: "error",
                    title: "Error!",
                    message: "Sending cart data failed!",
                })
            );
        }
    };
};

//sendCartData --> Action Creator -- which create action object automatically
export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            showNotification({
                status: "pending",
                title: "Sending...",
                message: "Sending cart data!",
            })
        );

        const sendRequest = async () => {
            const response = await fetch(
                "https://reduxtoolkitcart-c3fbf-default-rtdb.firebaseio.com/cart.json",
                {
                    method: "PUT",
                    body: JSON.stringify({
                        cartItems: cart.cartItems,
                        totalQuantity: cart.totalQuantity,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Sending cart data failed.");
            }
        };

        try {
            await sendRequest();

            dispatch(
                showNotification({
                    status: "success",
                    title: "Success!",
                    message: "Sent cart data successfully!",
                })
            );
        } catch (error) {
            dispatch(
                showNotification({
                    status: "error",
                    title: "Error!",
                    message: "Sending cart data failed!",
                })
            );
        }
    };
};
