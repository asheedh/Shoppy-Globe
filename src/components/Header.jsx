import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
function Header({ setSearchItem }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();
  const cartItems = useSelector((store) => store.cart.Items);

  // Check if user is logged in
  useEffect(() => {
    const checkLoginStatus = () => {
      const storedUser = localStorage.getItem("email");
      setIsLogin(!!storedUser);
      setUserName(storedUser || "");
    };
  
    window.addEventListener("storage", checkLoginStatus); // ✅ Listen for storage changes
  
    checkLoginStatus(); // ✅ Initial check on mount
  
    return () => {
      window.removeEventListener("storage", checkLoginStatus); // ✅ Clean up event
    };
  }, []);
  

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const toggleSearchBar = () => setSearchVisible(!isSearchVisible);

  // Handle Cart Click
  const handleCartClick = () => {
    if (!isLogin) {
      alert("Please log in to access your cart.");
      navigate("/login"); // Redirect to login page
    } else {
      navigate("/cart"); // Go to cart if logged in
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("email"); // ✅ Fix: Correct key name
  
    window.dispatchEvent(new Event("storage")); // ✅ Notify all components that user logged out
  
    setIsLogin(false); // ✅ Update UI immediately
    alert("Logged out successfully!");
    navigate("/login");
  };
  

  return (
    <div className="header">
      <div className="hamburger-menu" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      <h1><Link to="/">Shoppy Globe</Link></h1>

      <div className={`menu ${isMenuOpen ? "open" : ""}`}>
        <button onClick={toggleSearchBar}>Search</button>
        {isSearchVisible && (
          <input type="text" placeholder="Search products..." onChange={(e) => setSearchItem(e.target.value)} />
        )}
        <Link to="/">Home</Link>
        {isLogin ? (
          <>
            <span>Welcome, {userName.split("@")[0]}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">SignUp</Link>
          </>
        )}
      </div>

      {/* Cart Icon - Only Clickable if Logged In */}
      <div onClick={handleCartClick} style={{ cursor: "pointer" }}>
        <FontAwesomeIcon icon={faCartShopping} size="xl" />
        <sup>{isLogin && cartItems.length > 0 ? cartItems.length : ""}</sup>
      </div>
    </div>
  );
}

export default Header;
