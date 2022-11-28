import React from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
const PaymentForm = () => {
  const { state } = useLocation();
  console.log(state);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:5000/api/property/buy-property",
          {
            id,
            amount: state.priceRange,
            p_id: state._id,
            category: "Sold",
            pName: state.pName,
            cover: state.cover,
            location: state.location,
            city: state.city,
            price: state.price,
            type: state.type,
            latitude: state.latitude,
            longitude: state.longitude,
            priceRange: state.priceRange,
            specification: state.specification,
          }
        );

        if (response.data.success) {
          toast.success("Payment Successful");
          // setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      <p>Price: {state.price}</p>
      <CardElement />
      <button
        className="stripe__button"
        type="submit"
        disabled={!stripe || !elements}
      >
        Pay
      </button>
    </form>
  );
};

export default PaymentForm;
