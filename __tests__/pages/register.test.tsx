import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Register from '../../src/pages/register';

test('renders register form and submits data', () => {
  const mockSubmit = jest.fn() as jest.MockedFunction<typeof jest.fn>;

  render(<Register />);

  const nameInput = screen.getByLabelText(/name/i);
  const submitButton = screen.getByText(/submit/i);

  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.click(submitButton);

  expect(mockSubmit).toHaveBeenCalledWith('John Doe');
});
