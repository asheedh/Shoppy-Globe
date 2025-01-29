import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";
import { useState, useEffect } from "react";

function ProductItem(props) {
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(false);
    const { _id, ItemName, price, category, rating, images } = props.details;
    const navigate = useNavigate();  // ✅ Corrected `useNavigate`

    // ✅ Check if user is logged in when component mounts
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsLogin(true);
        }
    }, []);

    function handleAddItem(item) {
        dispatch(addItem(item));
    }

    const handleCartClick = () => {
        if (!isLogin) {
            alert("Please log in to add items to the cart.");
            navigate("/login"); // ✅ Redirect to login page
        } else {
            handleAddItem(props.details); // ✅ Add item to cart
        }
    };

    return (
        <div className="Product">
            <Link to={`product/${_id}`}>
                <img src={images[0]} alt={ItemName} />
                <div className="Product-desc">
                    <b><p>{ItemName}</p></b>
                    <p>Cost: ₹ {price}</p>
                    <p>{category}</p>
                    <p>Rating: {rating}</p>
                </div>
            </Link>
            <button onClick={handleCartClick}>Add to Cart</button>
        </div>
    );
}

// ✅ Prop Validation 
ProductItem.propTypes = {
    details: PropTypes.shape({
        _id: PropTypes.any.isRequired,
        ItemName: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        images: PropTypes.array.isRequired,
        rating: PropTypes.number.isRequired,
    }).isRequired
};

export default ProductItem;
