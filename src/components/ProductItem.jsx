import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";
import { useState } from "react"

function ProductItem(props) {
    const dispatch = useDispatch();
    const [, setCount] = useState(0); // Only using set Function from useState hook
    const { id, title, price, category, images, rating } = props.details;

    function handleAddItem(item) {
        dispatch(addItem(item));
        setCount(prevCount => prevCount + 1);
    }

    return (
        <div className="Product">
            <Link to={`product/${id}`}>
                <img
                    src={images[0]}
                    alt={title}
                />
                <div className="Product-desc">
                    <b><p>{title}</p></b>
                    <p>Cost: ₹ {(price * 80).toFixed(2)}</p>
                    <p>{category}</p>
                    <p>Rating: {rating}</p>
                </div>
            </Link>
            <button onClick={() => handleAddItem(props.details)}>
            Add to Cart
            </button>
            
        </div>
    );
}

// Prop Validation 

ProductItem.propTypes = {
    details: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        images: PropTypes.array.isRequired,
        rating: PropTypes.number.isRequired,
    }).isRequired
};

export default ProductItem;
