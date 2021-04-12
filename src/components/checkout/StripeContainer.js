import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import AdCheckout from "./AdCheckout";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getAd } from "../../actions";

const StripeContainer = ({ history, getAd }) => {
  const { adid } = useParams();
  React.useEffect(() => {
      getAd(adid);
  }, [adid]);

  const PUBLIC_KEY =
    "pk_test_51H4JBoIKF8mRURx6VEVdoizFHECWKV1FkA63LmddVV82w8PNrRw3j8eIdaObXWbgekfpb61nSIfJrPU9o5PyEwK400aK2r2CpB";
  const stripeTestPromise = loadStripe(PUBLIC_KEY);
  return (
    <>
      <Elements stripe={stripeTestPromise}>
        <AdCheckout adid={adid} history={history} />
      </Elements>
    </>
  );
};

export default connect(null, { getAd })(StripeContainer);
