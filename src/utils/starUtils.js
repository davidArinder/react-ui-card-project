const numberForStars = (stars) => {
  const splitStr = stars.split("");
  return Number(splitStr[0]);
};

export default numberForStars;
