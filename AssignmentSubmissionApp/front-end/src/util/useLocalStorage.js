import { useEffect, useState } from "react";

const useLocalStrorage = (defaultValue, key) => {
  //The initial value of value is determined by a function passed to useState.
  const [value, setValue] = useState(() => {
    const localStorageValue = localStorage.getItem(key);

    return localStorageValue != null
      ? JSON.parse(localStorageValue)
      : defaultValue;
  });
  //console.log(`The local Storage value ${key} is: ${value}`);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    //  console.log(`Updating local storage ${key} to ${value}`);
  }, [key, value]);

  //The hook returns an array [value, setValue], making it consistent with the standard useState hook.
  return [value, setValue];
};

export { useLocalStrorage };
