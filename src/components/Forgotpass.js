import { useFormik } from "formik";
import React from "react";
import { connect } from "react-redux";
import { forgotPassword } from "../actions";

const Forgotpass = ({ forgotPassword }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      newpassword: "",
    },
    onSubmit: (values) => {
      forgotPassword(values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="newpassword"
            value={formik.values.newpassword}
            onChange={formik.handleChange}
          />
        </div>
        <button>submit</button>
      </form>
    </div>
  );
};

export default connect(null, { forgotPassword })(Forgotpass);
