import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../utils/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function ProductDetails() {
    const { _id } = useParams(); 
    const [product, setProduct] = useState(null);
    const { data, loading, error } = useFetch("http://localhost:5100/api/products"); 

    useEffect(() => {
        if (data?.products?.length) { 
            const selectedProduct = data.products.find((product) => String(product._id) === String(_id));
            setProduct(selectedProduct || null); // Set null if not found
        }
    }, [data, _id]);

    if (loading) {
        return <p className="extra"><FontAwesomeIcon icon={faSpinner} /> Loading...</p>;
    }

    if (error) {
        return <p className="extra">Error: {error?.message || "Something went wrong"}</p>;
    }    

    if (!product) {
        return <p className="extra">Product not found.</p>;
    }
    
    return (
        <div className="ProductDetails">
            <div className="image">
              <img src={product?.images?.[0] || "/placeholder.jpg"} alt={product?.ItemName || "Product"} />
            </div>
            
            <div className="basicDetails">
                <h2>{product?.ItemName}</h2>
                <p><strong>Price :</strong> ₹ {product?.price }</p>
            </div>

            <hr />

            <h2 id="h2">Additional Details: </h2>
            <div className="generalDetails">
                <p>Category: {product?.category}</p>
                <p><strong>Rating:</strong> {product?.rating}</p>
                <strong><p>Description:</p></strong>
                <p>{product?.description}</p>
            </div>

            <hr />
        </div>
    );
}

export default ProductDetails;
