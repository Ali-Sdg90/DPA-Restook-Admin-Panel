import { useEffect, useState, useCallback } from "react";

const useLocalStorage = (key, initialState) => {
    const [value, setValue] = useState(() => {
        try {
            const localValue = window.localStorage.getItem(key);
            return localValue !== null ? JSON.parse(localValue) : initialState;
        } catch (error) {
            console.error("Error parsing localStorage value", error);
            return initialState;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error setting localStorage value", error);
        }
    }, [key, value]);

    const setStoredValue = useCallback(
        (newValue) => {
            try {
                const valueToStore =
                    newValue instanceof Function ? newValue(value) : newValue;
                setValue(valueToStore);
            } catch (error) {
                console.error("Error setting state value", error);
            }
        },
        [value]
    );

    return [value, setStoredValue];
};

export default useLocalStorage;
