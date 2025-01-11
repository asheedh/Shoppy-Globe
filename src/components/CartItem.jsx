import PropTypes from "prop-types";
import { removeItem } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

function CartItems({ item }) {
    const dispatch = useDispatch();
    const [count, setCount] = useState(item.quantity || 0);

    function handleRemoveItem(item) {
        if (count > 0) {
            dispatch(removeItem(item));
            setCount(prevCount => Math.max(prevCount - 1, 0));
        }
    }

    return (
        <>
        <div className="cartItem">
            <img
                src={item.thumbnail }
                alt={item.title }
            />  
            
            <div className="item-details">
                <h3>{item.title }</h3>
                <p>Price: ₹ {(item.price * 80).toFixed(2)}</p>
                <p> Rating: {(item.rating)}</p>
                <p>No.of Items : {count} </p>
                <p> Total Price: {(count * item.price * 80).toFixed(2)}</p>
            </div>

            <div className="btn">
                <button onClick={() => handleRemoveItem(item)}>
                    Remove from Cart
                </button>
            </div>
                
        </div>
        <hr />
        </>
        
    );
}

// PropType validation for better debugging
CartItems.propTypes = {
    item: PropTypes.shape({
        thumbnail: PropTypes.string,
        title: PropTypes.string,
        rating: PropTypes.number,
        price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        quantity: PropTypes.number,
    }).isRequired,
};

export default CartItems;
