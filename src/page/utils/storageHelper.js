// @ts-check

/**
 *
 * @typedef {'localStorage' | 'sessionStorage'} SaveType
 *
 * @param {string} key
 * @param {string} value
 * @param {SaveType} saveType
 */
const setItem = (key, value, saveType = "localStorage") => {
   if (saveType === "localStorage") {
      localStorage.setItem(key, value);
   } else {
      sessionStorage.setItem(key, value);
   }
};

/**
 * @param {string} key
 */
const getItem = key => {
   const sessionStorageValue = sessionStorage.getItem(key);
   const localStorageValue = localStorage.getItem(key);

   return localStorageValue || sessionStorageValue || null;
};

/**
 *
 * @param {string} key
 */
const removeItem = key => {
   localStorage.removeItem(key);
   sessionStorage.removeItem(key);
};

const clear = () => {
   localStorage.clear();
   sessionStorage.clear();
};

export default { setItem, getItem, removeItem, clear };
