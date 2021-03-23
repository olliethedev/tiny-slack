import React from "react";

export default function useLocalStorage(key, optionalCallback) {
  let initial;
  if (typeof window !== "undefined")
    initial = JSON.parse(localStorage.getItem(key));
  const [state, setState] = React.useState(initial);
  React.useEffect(() => {
    // chose to make this async
    const existingValue = localStorage.getItem(key);
    if (existingValue) {
      const parsedValue = JSON.parse(existingValue);
      setState(parsedValue);
      optionalCallback(parsedValue);
    }
  }, []);
  const removeItem = () => {
    setState(null);
    localStorage.removeItem(key);
    optionalCallback(null);
  };
  const setItem = (obj) => {
    setState(obj);
    localStorage.setItem(key, JSON.stringify(obj));
    optionalCallback(obj);
  };
  return [state, setItem, removeItem];
}
