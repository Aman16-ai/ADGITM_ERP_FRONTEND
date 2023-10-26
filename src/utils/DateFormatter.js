export const formateDateInputStringWithFullYearMonthAndDateOnly = (date) => {
  try {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return `${year}-${month}-${day}`;
  } catch (err) {
    console.log(err);
  }
};
