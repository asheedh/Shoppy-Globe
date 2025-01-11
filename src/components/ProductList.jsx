import { useOutletContext } from "react-router-dom";
import ProductItem from "./ProductItem";
import { useFetch } from "../utils/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function ProductList() {
  const { searchItem } = useOutletContext();  // using useOutletContext for search operation 
  const { data, error, loading } = useFetch("https://dummyjson.com/products");

  const searchResults = data?.products?.filter(
    (product) =>
      searchItem === "" ||
      product.title.toLowerCase().includes(searchItem.toLowerCase()) ||
      product.price.toString().includes(searchItem) ||
      product.category.toLowerCase().includes(searchItem.toLowerCase())
  );

  if (loading) return <p className="extra"><FontAwesomeIcon icon={faSpinner} /> Loading...</p>;
  if (error) return <p className="extra">Error: {error.message}</p>;

  return (
    <div className="ProductList">
      {searchResults?.length > 0 ? (
        searchResults.map((product) => (
          <ProductItem key={product.id} details={product} />
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default ProductList;
