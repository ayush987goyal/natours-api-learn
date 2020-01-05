/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe('pk_test_8MPTi5yFZjQDmTqLOf58CMDn');

export const bookTour = async tourId => {
  try {
    const res = await axios.get(`/api/v1/bookings/checkout-session/${tourId}`);
    const { session } = res.data;

    await stripe.redirectToCheckout({ sessionId: session.id });
  } catch (err) {
    showAlert('error', err.message);
  }
};
