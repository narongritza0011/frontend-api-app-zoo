export const getDate = () => {
  //   const today = new Date();
  //   const month = today.getMonth() + 1;
  //   const year = today.getFullYear();
  //   const date = today.getDate();
  //   return `${month}/${date}/${year}`;

  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-GB");
  return formattedDate;
};

export const formatDate = (dateString) => {
  const options = { day: "numeric", month: "numeric", year: "numeric" };
  const formattedDate = new Date(dateString).toLocaleString("en-GB", options);
  return formattedDate;
};

//เเปลงเป็นวันเเบบ TH
export const dateTimeTH = (datetime) => {
  if (datetime == null) {
    return "ยังไม่ได้จอง";
  }
  //เเปลงเป็นวันเเบบ TH
  const dateTimeString = datetime;
  const dateTime = new Date(dateTimeString);
  const optionsDate = { day: "numeric", month: "long", year: "numeric" };
  const formattedDateTimeTH = dateTime.toLocaleDateString("th-TH", optionsDate);
  //เเปลงเวลา TH
  const optionsTime = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  const formattedTimeTH = dateTime.toLocaleTimeString("th-TH", optionsTime);

  //fulldatetimeth
  return formattedDateTimeTH + " / " + formattedTimeTH;
};
