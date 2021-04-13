import React from "react";
import { getAllUser } from "../actions";
import { connect } from "react-redux";
import MuiDatable from "mui-datatables";

const column = ["username", "phoneno", "email", "address"];

const User = ({ getAllUser, users }) => {
  const options = {
    download: false,
    print: false,
    viewColumns: false,
    selectableRowsOnClick: false,
    selectableRows: false,
  };
  React.useEffect(() => {
    getAllUser();
  }, []);
  return (
    <div>
      {users && <MuiDatable columns={column} data={users} options={options} />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.adReducers.allusers,
  };
};

export default connect(mapStateToProps, { getAllUser })(User);
