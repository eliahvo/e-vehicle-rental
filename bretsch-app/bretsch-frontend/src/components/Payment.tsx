import React, { useContext, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { PaymentContext } from '../contexts/PaymentContext';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router';
import { AppContext } from '../contexts/AppContext';
import { Box } from '@material-ui/core';

export const Payment: React.FC<{ stopBooking: () => Promise<void>; price: number; setStopButtonClicked: any }> = ({
  stopBooking,
  price,
  setStopButtonClicked,
}) => {
  const history = useHistory();
  const [amount, setAmount] = useState(4);
  const [orderID, setOrderID] = useState(false);
  const paymentContext = useContext(PaymentContext);
  const { toggleCheckDialog } = React.useContext(AppContext);

  const handleClose = () => {
    paymentContext.toggleOpen();
    setStopButtonClicked(false);
  };
  function createOrder(_, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: price,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  }

  function onApprove(_, actions) {
    return actions.order.capture().then(function (_) {
      handleClose();
      stopBooking();
      history.push('/');
      toggleCheckDialog();
    });
  }

  return (
    <Dialog open={paymentContext.open} onClose={handleClose} fullWidth={true} maxWidth="xs">
      <DialogTitle id="form-dialog-title">Check Out</DialogTitle>
      <PayPalScriptProvider
        options={{
          'client-id': `${process.env.REACT_APP_PAYPAL_CLIENT_ID}`,
          currency: 'EUR',
        }}
      >
        <Box m={3}>
          <PayPalButtons createOrder={createOrder} forceReRender={amount} onApprove={onApprove} />
        </Box>
      </PayPalScriptProvider>
    </Dialog>
  );
};
