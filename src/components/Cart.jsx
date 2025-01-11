import { useSelector } from "react-redux"; // Accessing Redux store
import CartItem from "./CartItem"; // Importing CartItem component
import { Link } from "react-router-dom"; // Link component for navigation
import { useMemo } from "react"; // Memoizing the total price calculation

function Cart() {

    // Accessing cart items from Redux store
    const cartItems = useSelector((state) => state.cart?.Items);

    // Memoizing total price calculation to prevent unnecessary re-renders
    const totalPrice = useMemo(() => {
        return cartItems.reduce(
            (total, item) => total + item.price * item.quantity, // Summing up item price * quantity
            0 // Starting with a total of 0
        );
    }, [cartItems]); // Recalculate when cartItems change

    // If cart is empty, display a message
    if (cartItems.length === 0) {
        return <p className="extra">Your cart is empty.</p>;
    }

    return (
        <div className="cart">
            <div className="cart_Items">
                {/* Mapping through cartItems and rendering CartItem component for each item */}
                {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                ))}
            </div>

            <div className="checkOut">
                {/* Displaying the total price (converted to INR) */}
                <p id="pid" className="paraButton">Total : ₹ {(totalPrice * 80).toFixed(2)}</p>
               
                {/* Link to Checkout page */}
                <Link to="/checkout" className="paraButton"> Check Out</Link>  
            </div>
        </div>
    );
}

export default Cart;
