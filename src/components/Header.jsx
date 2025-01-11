import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState } from "react";
import { faBars } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line react/prop-types
function Header({ setSearchItem }) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggling menu between different screen sizes 
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  }
  const cartItems = useSelector((store) => store.cart.Items)
  const [isSearchVisible, setSearchVisible] = useState(false);

  const toggleSearchBar = () => setSearchVisible(!isSearchVisible);

  return (
    <div className="header">

      <div className="hamburger-menu" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      <h1> <Link to="/">Shoppy Globe </Link></h1>

      <div className={`menu ${isMenuOpen ? "open" : ""}`}>
        <button onClick={toggleSearchBar}>Search</button>
        {isSearchVisible && (
          <input type="text" placeholder="Search products..." onChange={(e) => setSearchItem(e.target.value)} />
        )}
        <Link to="/"> Home </Link>
      </div>
      
      <Link to="/Cart">
        <FontAwesomeIcon icon={faCartShopping} size="xl" /> <sup>{cartItems.length > 0 ? cartItems.length : ""}</sup>
      </Link>
    </div>
  );
}

export default Header;