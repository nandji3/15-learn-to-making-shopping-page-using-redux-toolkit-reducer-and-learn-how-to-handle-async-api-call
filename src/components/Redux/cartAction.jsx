import { replaceCart } from "./cartSlice";
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
            const getCartState = await fetchData();
            console.log("Inside getCartDataFromBackend -->", getCartState);
            dispatch(replaceCart(getCartState));
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
export const sendCartData = (cartState) => {
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
                    body: JSON.stringify(cartState),
                }
            );
            if (!response.ok) {
                throw new Error("Sending cart data failed.");
            }
        };

        // console.log("Inside App Component useEffect() to check response -->", response.ok)
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
