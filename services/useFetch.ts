import { useEffect, useState } from "react";

const useFetch = <T>(fatchFunction: () => Promise<T>, autoFatch= true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fatchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fatchFunction();
            setData(data);
        } catch (error) {
            setError(error as string);
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setData(null);
        setError(null);
        setLoading(false);
    };
    useEffect(() => {
        if (autoFatch) {
            fatchData();
        }
    }, []);

    return { data, loading, error,refetch: fatchData, reset };
};

export default useFetch;