import {
  PaymentElement,
  LinkAuthenticationElement,
} from '@stripe/react-stripe-js';
import mixpanel from 'mixpanel-browser';
import { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import styles from '../../styles/page.module.css';

// interface CheckoutFormProps {
//   user: any;
// }

export default function CheckoutForm({ user }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    mixpanel.track('Submit Payment Form');

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
      mixpanel.track(`Payment error: ${error.message}`);
    } else {
      setMessage('An unexpected error occured.');
      mixpanel.track(`Payment error: An unexpected error occured.`);
    }

    setIsLoading(false);
  };

  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id='link-authentication-element'
        // Access the email value like so:
        // onChange={(event) => {
        //  setEmail(event.value.email);
        // }}
        //
        // Prefill the email field like so:
        options={{ defaultValues: { email: user.email } }}
      />
      <PaymentElement id='payment-element' />
      <button
        className={styles.actionButton}
        disabled={isLoading || !stripe || !elements}
        id='submit'
      >
        <span id='button-text'>
          {isLoading ? (
            <div className='spinner' id='spinner'>
              Loading ...
            </div>
          ) : (
            'Pay now'
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id='payment-message'>{message}</div>}
    </form>
  );
}
