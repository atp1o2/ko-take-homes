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

const decadeBuilder = (years) => {
  let decades = [];
  years.sort();
  let floor = Math.floor(years[0] / 10) * 10;
  let ceiling = Math.ceil(years[years.length -1] / 10) * 10;
  for (let decade=floor; decade<ceiling; decade+=10) {
    decades.push(decade);
  }
  return decades;
}

export { sortObjectList, decadeBuilder };
