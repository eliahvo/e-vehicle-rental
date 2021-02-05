import React, { useContext, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { PaymentContext } from '../contexts/PaymentContext';
import { useSnackbar } from 'notistack';
export const Payment: React.FC<{ stopBooking: () => Promise<void> }> = ({ stopBooking }) => {
  const [amount, setAmount] = useState(4);
  const [orderID, setOrderID] = useState(false);
  const paymentContext = useContext(PaymentContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    paymentContext.toggleOpen();
  };
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

  function onApprove(data, actions) {
    return actions.order.capture().then(function (details) {
      enqueueSnackbar('Transaction completed by ' + details.payer.name.given_name, { variant: 'success' });
      handleClose();
      stopBooking();
    });
  }

  return (
    <Dialog open={paymentContext.open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Check Out</DialogTitle>
      <PayPalScriptProvider
        options={{
          'client-id': `${process.env.REACT_APP_PAYPAL_CLIENT_ID}`,
          currency: 'EUR',
        }}
      >
        <PayPalButtons createOrder={createOrder} forceReRender={amount} onApprove={onApprove} />
      </PayPalScriptProvider>
    </Dialog>
  );
};
