import { useEffect, useState } from "react";

const useLocalStrorage = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    const localStorageValue = localStorage.getItem(key);

    return localStorageValue != null
      ? JSON.parse(localStorageValue)
      : defaultValue;
  });
  console.log(`The local Storage value ${key} is: ${value}`);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(`Updating local storage ${key} to ${value}`);
  }, [key, value]);

  return [value, setValue];
};

export { useLocalStrorage };
