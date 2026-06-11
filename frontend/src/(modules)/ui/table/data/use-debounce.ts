import {useEffect, useState} from "react";

export function useDebounce<T>(value: T, delay = 300): T {
    const [debounce, setDebounce] = useState(value);

    useEffect(() => {
        const id = setTimeout(() => setDebounce(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);

    return debounce;
}