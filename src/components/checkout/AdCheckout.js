import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { connect } from "react-redux";
import { checkout, getAd } from "../../actions";
import { useFormik } from "formik";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";
import { css } from "styled-components";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #000;
`;

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const Row = styled.div`
  width: 475px;
  margin: 30px auto;
  box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 #829fff;
  border-radius: 4px;
  background-color: #7795f8;
  position: relative;
`;

const iframeStyles = {
  base: {
    color: "#fff",
    fontSize: "16px",
    iconColor: "#fff",
    "::placeholder": {
      color: "#87bbfd",
    },
  },
  invalid: {
    iconColor: "#FFC7EE",
    color: "#FFC7EE",
  },
  complete: {
    iconColor: "#cbf4c9",
  },
};

const PaymentButton = styled.button`
    width:100%,
    text-align:center,
    font-family:inherit,
    font-size:18px,
    font-weight:bold
`;

const cardElementOpts = {
  iconStyle: "solid",
  style: iframeStyles,
  hidePostalCode: true,
};

const AdCheckout = ({ checkout, adid, history, ad, loading }) => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id } = paymentMethod;
      checkout({ amount: Number(ad.price), paymentId: id }, adid, () =>
        history.push("/your-ads")
      );
    } else {
      console.log(error.message);
    }
  };
  return (
    <div className="payment__container">
      {ad && !ad.payment ? (
        <>
          <h3 style={{ textAlign: "center" }}>
            Make a payment for {ad.adname} Rs {ad.price}
          </h3>
          <div className="payment__wrapper">
            <form onSubmit={handleSubmit}>
              <Row>
                <CardElementContainer>
                  <CardElement options={cardElementOpts} />
                </CardElementContainer>
                {loading ? (
                  <button className="ad__btn">
                    <ClipLoader loading={true} color={"white"} size={15} />
                  </button>
                ) : (
                  <button className="ad__btn">pay</button>
                )}
              </Row>
            </form>
          </div>
        </>
      ) : (
        <p>payment is done for this ad!</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ad: state.adReducers.ad,
    loading: state.adReducers.loading,
  };
};

export default connect(mapStateToProps, { checkout })(AdCheckout);
