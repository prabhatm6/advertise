import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import authForm from "./components/signup";
import Signin from "./components/signin";
import NewAd from "./components/NewAd";
import Home from "./components/Home";
import AdminSignin from "./components/AdminSignin";
import AdminSignup from "./components/AdminSignup";
import Myads from "./components/Myads";
import Budget from "./components/Budget";
import StripeContainer from "./components/checkout/StripeContainer";
import User from "./components/User";
import Forgotpass from "./components/Forgotpass";
import "boxicons";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact={true} component={Home} />
        <Route path="/your-ads" exact={true} component={Myads} />
        <Route path="/budget" exact={true} component={Budget} />
        <Route path="/signin" exact={true} component={Signin} />
        <Route path="/signin/as/admin" exact={true} component={AdminSignin} />
        <Route path="/signup/as/admin" exact={true} component={AdminSignup} />
        <Route path="/signup" exact={true} component={authForm} />
        <Route path="/newad" exact={true} component={NewAd} />
        <Route path="/ad/users" exact={true} component={User} />
        <Route path="/forgotpassword" exact={true} component={Forgotpass} />
        <Route
          path="/ad/checkout/:adid"
          exact={true}
          component={StripeContainer}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
