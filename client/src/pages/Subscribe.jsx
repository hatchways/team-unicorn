import React, {useState} from 'react';
import axios from 'axios';
import {Button, Card, CardContent, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import User from 'api/User';

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
  receipt: {
    paddingBottom: '20px'
  }
});

const Subscription = ({user}) => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  let {_id, name, email, stripeCustomerId} = user;

  const [stripeId, setStripeId] = useState(stripeCustomerId);

  const handleSubmitSub = async (event) => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (stripeId !== "free") {
      await User.subscribe({id: _id, stripeCustomerId: "free"})
      await setStripeId("free")
      await axios.post('stripe/subscribe', {...user, stripeCustomerId: stripeId})
    } else {

      const result = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          name: name,
          email: email,
        },
      });
  
      if (result.error) {
        console.log(result.error.message);
      } else {
        const res = await axios.post('/stripe/subscribe', {...user, 'payment_method': result.paymentMethod.id});
        const {client_secret, status, stripeInfo} = res.data;
        
        if (status === 'requires_action') {
          stripe.confirmCardPayment(client_secret).then(function(result) {
            if (result.error) {
              console.log('Issue with payment: ', result.error);
            } else {
              console.log('Payment received. Thank you for subscribing!');
              User.subscribe({id: _id, stripeCustomerId: stripeInfo.stripeCustomerId})
              setStripeId(stripeInfo.stripeCustomerId)
            }
          });
        } else {
          setStripeId(stripeInfo.stripeCustomerId)
          User.subscribe({id: _id, stripeCustomerId: stripeInfo.stripeCustomerId})
          console.log('Payment received. Thank you for subscribing!');
        }
        cardElement.clear()
      }
    };
    }
               

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant="h5" className={classes.receipt}>Email: {email}</Typography>
        <CardElement options={{disabled: stripeId !== "free"}} />
        <div className={classes.div}>
          <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmitSub}>
            {stripeId !== "free" ? "Cancel Subscription" : "Subscribe"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Subscription;