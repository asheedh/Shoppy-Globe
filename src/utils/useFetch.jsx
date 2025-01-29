// Creating Custom Hook for fetching API

import { useState, useEffect } from "react";

export function useFetch(url){ // Named Export

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        fetch(url).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then((result) => setData(result))
        .catch((err) => setError(err))
        .finally(() => setLoading(false))

    }, [url])
    return{data, error, loading}
}