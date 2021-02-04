import React, { useContext, useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons, FUNDING } from '@paypal/react-paypal-js';
import { PaymentContext } from '../../contexts/PaymentContext';
export const Payment = () => {
  const [amount, setAmount] = useState(4);
  const [orderID, setOrderID] = useState(false);
  const paymentContext = useContext(PaymentContext);

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: amount,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  }

  return (
    <PayPalScriptProvider
      options={{
        'client-id': 'AadAfDCrXnMGJ-AoFZ1UoOWEA7tM8HTBrp5Dbsm33BugQRbQqQsY-NKLJlPs74Fw-OFcSdBOTxRfe5sn',
        currency: 'EUR',
      }}
    >
      <PayPalButtons createOrder={createOrder} forceReRender={amount} fundingSource={FUNDING.PAYPAL} />
    </PayPalScriptProvider>
  );
};
