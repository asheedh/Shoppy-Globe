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
                src={item.images[0] }
                alt={item.ItemName }
            />  
            
            <div className="item-details">
                <h3>{item.ItemName }</h3>
                <p>Price: ₹ {item.price}</p>
                <p> Rating: {item.rating}</p>
                <p>No.of Items : {count} </p>
                <p> Total Price: {count * item.price }</p>
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
            quantity: PropTypes.number.isRequired,
            ItemName: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            category: PropTypes.string.isRequired,
            images: PropTypes.array.isRequired,
            rating: PropTypes.number.isRequired,
        }).isRequired
};

export default CartItems;
