const sortObjectList = (list, property) => {
  return list.sort((a, b) => {
    const A = a[property].toLowerCase();
    const B = b[property].toLowerCase();
    if (A < B) {
      return -1;
    }
    else if (A > B) {
      return 1;
    }
    else {
      return 0;
    }
  })
};

export { sortObjectList };
