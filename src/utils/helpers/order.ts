import differenceInSeconds from "date-fns/differenceInSeconds";

const initialOrderNumber = new Date(2022, 1, 1);

const getOrder = () => {
  return differenceInSeconds(Date.now(), initialOrderNumber);
};

export { getOrder };
