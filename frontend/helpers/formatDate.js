export const getFullDate = (date) => {
  const newDate = `${date?.toLocaleString("default", {
    month: "long",
  })} ${date?.getDate()}, ${date?.toLocaleString("default", {
    year: "numeric",
  })}`;
  return newDate;
};

export const getDate = (date) => {
  const newDate = new Date(date).toLocaleString("en-US").replace(/,.*$/, "");
  return newDate;
};
