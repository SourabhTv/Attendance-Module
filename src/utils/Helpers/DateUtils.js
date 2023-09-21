import moment from "moment";

// convert any date to YYYY-MM-DD format
export const formatDate = (input) => {
  let inputDate = moment(input).format("L");
  const dateParts = inputDate.split("/");
  if (dateParts.length !== 3) {
    throw new Error("Invalid date format.");
  }
  const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(
    2,
    "0"
  )}-${dateParts[1].padStart(2, "0")}`;
  return formattedDate;
};
