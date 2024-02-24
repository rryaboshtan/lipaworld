import {
  useDispatchRecipients,
  useDispatchUser,
  useRecipients,
} from '@/context';
import { IUser } from '@/context/UserContext';
import { IRecipient } from '@/types';
import axios from 'axios';
import mixpanel from 'mixpanel-browser';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

export const AppController: React.FC<Props> = ({ children }) => {
  const dispatchUser = useDispatchUser();
  const dispatchRecipients = useDispatchRecipients();
  const recipients = useRecipients();
  const [user, setUser] = useState<null | IUser>(null);
  const [render, setRender] = useState(0);

  const router = useRouter();

  const settleRecipients = async (user: IUser) => {
    if (recipients.length > 0) {
      const payload: IRecipient = {
        name: recipients[0].name,
        surname: recipients[0].surname,
        country: recipients[0].country,
        countryCode: recipients[0].countryCode,
        mobileNumber: recipients[0].mobileNumber,
        email: recipients[0].email ?? '',
        electricityMeterNumber: recipients[0].electricityMeterNumber ?? '',
        senderId: user.id,
        active: recipients[0].active,
        id: recipients[0].id,
      };

      mixpanel.track('Create Recipient from pre-login');

      await fetch(`${process.env.NEXT_PUBLIC_API_RECIPIENTS_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).catch((error) => {
        console.log('error', error);
      });
    }

    const url = `${process.env.NEXT_PUBLIC_API_RECIPIENTS_URL}/recipients?userId=${user.id}`;
    try {
      const response2 = await axios.get(url);
      // console.log('start adding recipients');
      dispatchRecipients({
        type: 'ADD_RECIPIENTS',
        payload: response2.data['recipients'],
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (render < 9) {
      setRender(render + 1);
    }
    try {
      if (typeof window !== 'undefined' && sessionStorage.getItem('user')) {
        const user = JSON.parse(sessionStorage.getItem('user')!) as IUser;
        if (user) {
          dispatchUser({
            type: 'SET_USER',
            payload: user,
          });
          // setIsLoading(false)
          // Run settleRecipients in a separate async operation
          settleRecipients(user).catch((error) => {
            console.error('Failed to settle recipients:', error);
            // Handle the failure of settleRecipients here
            // This could be showing a notification, logging the error, etc.
          });
        }
        mixpanel.identify(user.email);
        // if (searchParams?.has('return_url')) {
        //   router.push(searchParams.get('return_url') ?? '/cart');
        // } else {
        router.push('/?recipientCountryCode=ZA');
      }
    } catch (error: any) {
      console.log('catch', error);
    }
  }, [render]);

  useEffect(() => {
    if (user) {
      router.push('/user-settings');
    }
  }, [user]);

  return <>{children}</>;
};
