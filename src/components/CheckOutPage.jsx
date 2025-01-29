import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CheckOutPage() {
    const cartItems = useSelector((store) => store.cart.Items)
    // State for user shipping details
    const [shippingDetails, setShippingDetails] = useState({
        name: "",
        address: "",
        city: "",
        postalCode: "",
        mblNumber: "",
    });
    

    // Handle changes in form fields
    function handleInputChange(event) {
        const { name, value } = event.target;
        setShippingDetails(prevDetails => ({
            ...prevDetails,
            [name]: value,
        }));
    }

    // Calculate total price
    const totalPrice = useMemo(() => {
        return cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    }, [cartItems]);

    // Handle form submission
    function handleSubmit(event) {
        event.preventDefault();
        console.log("Order Placed:", { shippingDetails, cartItems,  });
        alert(
            `Order placed successfully!,
            Customer :  ${ shippingDetails.name},
           Total Price : ₹ ${(totalPrice*80).toFixed(2)}`
        );

        setShippingDetails({
            name: "",
            address: "",
            city: "",
            postalCode: "",
            mblNumber: "",
        });
    }

    return (
        <div className="checkout-page">
            <h2>CheckOut</h2>

            {/* Cart Items Section */}
            <div className="checkout-items">
                
                {cartItems.length > 0 ? (
                    cartItems.map(item => (
                        <div key={item._id} className="checkout-item">
                            <div id = "div1">
                                <img src={ item.thumbnail } alt={item.title} />
                                <span> <b>{item.title}  &#215; {item.quantity} </b> </span>
                            </div>
                            
                            <div className = "checkout-item-details">    
                                <p>Price: ₹ {(item.price * 80).toFixed(2)}</p>
                                <p>Subtotal: ₹ {(item.price * 80 * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <center><p>Your cart is empty.</p></center>
                )}     
            </div>

            <h2>Total Price: ₹ {(totalPrice*80).toFixed(2)}</h2>
            {/* Shipping Details Form */}

            {cartItems.length > 0 ?
                <div className="shipping-details">
                    <h2>Shipping Details</h2>
                    <form onSubmit={handleSubmit}>
                        <label> Full Name: </label>
                        <input type="text" name="name" value={shippingDetails.name} onChange={handleInputChange} required />
                        

                        <label> Address: </label>
                        <input type="text" name="address" value={shippingDetails.address} onChange={handleInputChange} required />
                        

                        <label> City: </label>
                        <input type="text" name="city" value={shippingDetails.city} onChange={handleInputChange} required />
                        

                        <label> Postal Code: </label>
                        <input type="text" name="postalCode" value={shippingDetails.postalCode} onChange={handleInputChange} required />
                        

                        <label> Mbl No: </label>
                        <input type="tel" pattern="[6-9][0-9]{9}" name="mblNumber" value={shippingDetails.mblNumber} onChange={handleInputChange} required />
                        
                        <div id = "div2">
                            <button type="submit">Place Order</button>
                            <Link to="/cart"><button>Back to cart</button></Link>
                        </div>
                        
                    </form>
                </div> 
                :
                ""
            }       
            
        </div>
    );
}

export default CheckOutPage;
