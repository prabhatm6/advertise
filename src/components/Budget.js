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
  "5:00pm-9:00pm",
];

const data = [
  ["bbc",
  "commercial",
  "10-20sec",
  "Rs12,000",
  "Rs20,000",
  "Rs30,000",
  "Rs40,000",
],
  ["CNN",
  "Beverage",
  "5-15sec",
  "Rs15,000",
  "Rs22,000",
  "Rs45,000",
  "Rs42,000",
],
  ["Discovey",
  "child",
  "14sec",
  "Rs20,000",
  "Rs25,000",
  "Rs32,000",
  "Rs45,000",
],
  ["Star",
  "Info",
  "25sec",
  "Rs30,000",
  "Rs40,000",
  "Rs45,000",
  "Rs50,000",
],
  ["RBharat",
  "Info",
  "25sec",
  "Rs10,000",
  "Rs12,000",
  "Rs20,000",
  "Rs30,000",
],
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
