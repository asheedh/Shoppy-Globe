import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../utils/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function ProductDetails() {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const { data, loading, error } = useFetch("https://dummyjson.com/products"); // Fetching Data from API by using custom hook

    useEffect(() => {
        if (data?.products) {
            const selectedProduct = data.products.find((product) => product.id === Number(id));
            setProduct(selectedProduct);
        }
    }, [data, id]);

    if (loading) {
        return <p className="extra"><FontAwesomeIcon icon={faSpinner} /> Loading...</p>;
    }

    if (error) {
        return <p className="extra">Error: {error.message}</p>;
    }

    if (!product) {
        return <p className="extra">Product not found.</p>;
    }
    
    return (
        <div className="ProductDetails">
            <div className="image">
              <img src={product.thumbnail} alt={product.title} />
            </div>
            
            <div className="basicDetails">
                <h2>{product.title}</h2>
                <p><strong>Price :</strong> ₹ {(product.price * 80).toFixed(2)}</p>
            </div>

            <hr />

            <h2 id = "h2">Additional Details: </h2>
            <div className="generalDetails">
                <p>Brand: {product.brand}</p>
                <p><strong>Rating:</strong> {product.rating}</p>
                <strong><p>Description:</p></strong>
                <p>{product.description}</p>
            </div>

            <hr />

        {/* Reviews  */}
            <div className="reviews">
                <h2>Reviews</h2>
                {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((review, index) => (
                        <><div key={index} className="review">
                            <p><b>Reviewer:</b> {review.reviewerName}</p>
                            <p><b>Rating:</b> {review.rating}</p>
                            <p><b>Comment:</b> {review.comment}</p>
                            <p><b>Email:</b> {review.reviewerEmail}</p>
                            <p><b>Date:</b> {new Date(review.date).toLocaleDateString()}</p>
                        </div><hr /></>
                        
                    ))
                ) : (
                    <p>No reviews available.</p>
                )}
            </div>
        </div>
    );
}

export default ProductDetails;
