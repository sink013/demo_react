export const deepRecursive = (arr, pathname) => {
  let newArr = [];
  if (!Array.isArray(arr)) {
    return newArr;
  }
  arr.forEach((v) => {
    if (v.path === pathname) {
      newArr.push(v);
    }
    if (v.children) {
      const childrenArr = deepRecursive(v.children, pathname);
      if (childrenArr.length > 0) {
        newArr.push(v, ...childrenArr);
      }
    }
  });
  return newArr;
};
