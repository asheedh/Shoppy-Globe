import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

function NotFound() {
    const error = useRouteError();
    return (
        <>
         <h3>Oops!!!</h3>
         <h4>Error: {error.status} {error.statusText}</h4>
         <h4> {error.data} </h4>

         <Link to="/">
            <button> Back to Home</button>
         </Link>
        </>
    )
}

export default NotFound;