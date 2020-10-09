import React, {useState} from 'react';
import axios from 'axios';
import {Button, Card, CardContent, CircularProgress, Grid, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import User from 'api/User';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: '35vh auto',
  },
  card: {
    width: '500px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
  },
  button: {
    margin: '2em auto 2em',
    textAlign: 'center'
  },
  receipt: {
    paddingBottom: '20px'
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
  },
});

const Subscribe = ({user, setUser}) => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  let {_id, name, email} = user;
  const [loading, setLoading] = useState(false)
  console.log({user})
  const handleSubmitSub = async (event) => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    
    if (user.stripeCustomerId !== "free") {
      setLoading(true)
      User.subscribe({id: _id, stripeCustomerId: "free"})
      await axios.post('stripe/subscribe', {...user, stripeCustomerId: user.stripeCustomerId})
      setUser({...user, stripeCustomerId: "free"});
      setLoading(false)
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
        setLoading(true);

        const res = await axios.post('/stripe/subscribe', {...user, 'payment_method': result.paymentMethod.id});
        const {client_secret, status, stripeInfo} = res.data;
        
        if (status === 'requires_action') {
          stripe.confirmCardPayment(client_secret).then(function(result) {
            if (result.error) {
              console.log('Issue with payment: ', result.error);
            } else {
              console.log('Payment received. Thank you for subscribing!');
              User.subscribe({id: _id, stripeCustomerId: stripeInfo.stripeCustomerId});
              setUser({...user, stripeCustomerId: stripeInfo.stripeCustomerId})
            }
          });
        } else {
          setUser({...user, stripeCustomerId: stripeInfo.stripeCustomerId})
          User.subscribe({id: _id, stripeCustomerId: stripeInfo.stripeCustomerId});
          console.log('Payment received. Thank you for subscribing!');
        }
        console.log({user})
        cardElement.clear()
        setLoading(false)
      }
    };
    }
               

  return (
    <Card className={classes.card}>
        <Card className={classes.content}>
          <CardContent className={classes.content}>
            <div className={classes.button}>
              <Typography variant="h2" gutterBottom>Kanban Premium</Typography>
              <Typography variant="h2" gutterBottom>$5/mo</Typography>
              <Typography variant="h6">Unlimited Boards</Typography>
              <Typography variant="h6">Unlimited Columns</Typography>
            </div>
          <CardElement options={{disabled: user.stripeCustomerId !== "free"}} />
          {loading ? <CircularProgress className={classes.button} /> : 
            <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmitSub} >
              {user.stripeCustomerId !== "free" ? "Cancel Subscription" : "Subscribe"}
            </Button>
          }
          </CardContent>
        </Card>
    </Card>
  );
}

export default Subscribe;