import React from 'react';
import axios from 'axios';
import {Button, Card, CardContent, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: '35vh auto',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
  },
  button: {
    margin: '2em auto 1em',
  },
});

const Subscription = ({email}) => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmitPay = async (event) => {
    if (!stripe || !elements) {
      return;
    }

    const res = await axios.post('http://localhost:3000/pay', {email: email});

    const clientSecret = res.data['client_secret'];

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Payment received!');

      }
    }
  };

  const handleSubmitSub = async (event) => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        email: email,
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      const res = await axios.post('/subscribe', {'payment_method': result.paymentMethod.id, 'email': email});
      const {client_secret, status} = res.data;

      if (status === 'requires_action') {
        stripe.confirmCardPayment(client_secret).then(function(result) {
          if (result.error) {
            console.log('Issue with payment: ', result.error);
          } else {
            console.log('Payment received. Thank you for subscribing!');
          }
        });
      } else {
        console.log('Payment received. Thank you for subscribing!');

      }
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant="h6" gutterBottom>Email: {email}</Typography>
        <CardElement />
        <div className={classes.div}>
          <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmitPay}>
            Pay
          </Button>
          <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmitSub}>
            Subscription
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Subscription;