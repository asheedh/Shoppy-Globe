import { useOutletContext } from "react-router-dom";
import ProductItem from "./ProductItem";
import { useFetch } from "../utils/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function ProductList() {
  const { searchItem } = useOutletContext();  // ✅ Using context for search
  const { data, error, loading } = useFetch("http://localhost:5100/api/products");

  // ✅ Ensure data.products is always an array
  const searchResults = (data?.products || []).filter(
    (product) =>
      searchItem === "" ||
      product?.ItemName?.toLowerCase().includes(searchItem?.toLowerCase()) || // ✅ Fixed field name
      product?.price?.toString().includes(searchItem) ||
      product?.category?.toLowerCase().includes(searchItem?.toLowerCase())
  );

  if (loading) return <p className="extra"><FontAwesomeIcon icon={faSpinner} /> Loading...</p>;
  if (error) return <p className="extra">Error: {error?.message || "Something went wrong."}</p>; // ✅ Fixed error handling

  return (
    <div className="ProductList">
      {searchResults.length > 0 ? (
        searchResults.map((product) => (
          <ProductItem key={product._id} details={product} />
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default ProductList;
