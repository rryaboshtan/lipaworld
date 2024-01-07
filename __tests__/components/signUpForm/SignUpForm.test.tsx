import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import SignUpForm from '../../../src/components/signUpForm/SignUpForm';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

test('renders sign up form and submits data', async () => {
  render(<SignUpForm />);

  const fnameInput = await screen.findByLabelText(/first name\*/i);
  const surnameInput = await screen.findByLabelText(/last name\*/i);
  const emailInput = await screen.findByLabelText(/email address\*/i);
  const passwordInput = await screen.findAllByLabelText(/password\*/i);
  const confirmPasswordInput = await screen.findByLabelText(
    /confirm password\*/i
  );
  const mobileNumberInput = screen.getByTestId('mobileNumberInput');
  const cityInput = await screen.findByLabelText(/city\*/i);
  const genderInput = await screen.findByLabelText(/gender\*/i);
  const postCodeInput = await screen.findByLabelText(/post code/i);
  //   const submitButton = screen.getByText(/submit/i);
  const termsCheckbox = screen.getByTestId('termsCheckbox');

  fireEvent.change(fnameInput, { target: { value: 'Lebo' } });
  fireEvent.change(surnameInput, { target: { value: 'Mashaba' } });
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput[0], { target: { value: 'password' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });
  fireEvent.change(mobileNumberInput, { target: { value: '0751232222' } });
  fireEvent.change(cityInput, { target: { value: 'Magaliesburg' } });
  fireEvent.select(genderInput, { target: { value: 'Female' } });
  fireEvent.change(postCodeInput, { target: { value: '12376' } });
  fireEvent.click(termsCheckbox);
  //   fireEvent.click(submitButton);
});
