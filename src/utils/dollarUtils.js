const showAsDollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default showAsDollars;
