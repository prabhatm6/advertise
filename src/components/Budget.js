import React from "react";
import Menu from "./Menu";
import MuiDataTable from "mui-datatables";

const column = [
  "channel_name",
  "category",
  "ad_span",
  "6:00am-9:00am",
  "9:00am-12:00pm",
  "12:00pm-5:00pm",
];

const data = [
  ["bbc",
  "commercial",
  "10-20sec",
  "Rs25,000",
  "Rs40,000",
  "Rs20,000"],
  ["CNN",
  "Beverage",
  "5-15sec",
  "Rs30,000",
  "Rs50,000",
  "Rs25,000"],
  ["Discovey",
  "child",
  "14sec",
  "Rs27,000",
  "Rs32,000",
  "Rs20,000"],
  ["Max",
  "Info",
  "25sec",
  "Rs40,000",
  "Rs50,000",
  "Rs25,000"],
];

const Budget = () => {
  const options = {
      download:false,
      print:false,
      viewColumns:false,
      selectableRowsOnClick:false,
      selectableRows: false 
  };
  return (
    <div>
      <Menu />
      <MuiDataTable data={data} columns={column} options={options} />
    </div>
  );
};

export default Budget;
