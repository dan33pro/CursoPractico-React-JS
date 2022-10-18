import { useState } from "react";

const initialState = {
    cart: [],
    actualProduct: [],
};

const useInitialState = () => {
    const [state, setState] = useState(initialState);

    const addToCart = (payload) => {
        setState({
            ...state,
            cart: [
                ...state.cart,
                payload,
            ]
        })
    }

    const removeFromCart = (indexValue) => {
        setState({
            ...state,
            cart: state.cart.filter( (item, index) => index != indexValue ),
        })
    }

    const addToActualProduct = (payload) => {
        setState({
            ...state,
            actualProduct: [
                true,
                payload,
            ]
        })
    }

    const removeFromActualProduct = () => {
        setState({
            ...state,
            actualProduct: [ 
                false, 
            ],
        })
    }

    return {
        state,
        addToCart,
        removeFromCart,
        addToActualProduct,
        removeFromActualProduct,
    };
};

export default useInitialState;