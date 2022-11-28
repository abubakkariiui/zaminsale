import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51LQyMDKrhyc13hMnHkZoiJaXAyIj50XvYJVbI1z6Tg6vWKy5RbOj5E3hA5yjpbeiCneuOOW1CS85HT43a81HRC2d002LSxbi9n";

const stripePromise = loadStripe(PUBLIC_KEY);
export default function StripeContainer() {
  return (
    <div className="stripe__container">
      <h4>Please add your billing information</h4>
      {/* <div>
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <i className="fa-solid fa-user"></i>
          <input type="text" placeholder="First Name" />
        </span>
        <span>
          <i className="fa-solid fa-user"></i>
          <input type="text" placeholder="Last Name" />
        </span>
      </div> */}
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
}
