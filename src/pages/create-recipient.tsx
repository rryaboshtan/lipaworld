import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/context';
import { IRecipient } from '@/types';
import { useDispatchRecipients } from '@/context';
import { TextField } from '@mui/material';
import mixpanel from 'mixpanel-browser';
import { v4 as uuidv4 } from 'uuid';

import SideNav from '../components/sideNav/SideNav';
import Nav from '../components/nav/Nav';
import NavMobile from '../components/navMobile/NavMobile';
import { Montserrat } from 'next/font/google';
import PhoneForm from '../components/phoneInput/PhoneInput';

import styles from '../styles/page.module.css';

const montserrat = Montserrat({ subsets: ['latin'] });

export default function CreateRecipient() {
  const dispatchRecipients = useDispatchRecipients();
  const router = useRouter();
  const user = useUser();
  const senderId = user?.id ?? null;

  const [message, setMessage] = useState<string | null>(null);
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(
    null
  );

  const hackyRegex =
    /<script|<\/script>|javascript:|<|>|onload=|onerror=|onmouseover=|onmouseout=|onfocus=|onblur=|onclick=|ondblclick=|onkeydown=|onkeypress=|onkeyup=|onsubmit=|onreset=|onselect=|onchange=|onloadstart=|onprogress=|onabort=|onloadend=|oncanplay=|oncanplaythrough=|ondurationchange=|onemptied=|onended=|onerror=|oninput=|oninvalid=|onpause=|onplay=|onplaying=|onprogress=|onratechange=|onreadystatechange=|onseeked=|onseeking=|onstalled=|onsuspend=|ontimeupdate=|onvolumechange=|onwaiting=/i;

  const nameRegex = /^[a-zA-Z]+$/;

  useEffect(() => {
    const params: URLSearchParams = new URLSearchParams(window.location.search);
    setSearchParams(params);
  }, []);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    const fname = event.currentTarget.fname.value.trim();
    const surname = event.currentTarget.surname.value.trim();
    const email = event.currentTarget.email.value.trim();
    const electricityMeterNumber =
      event.currentTarget.electricityMeterNumber.value.trim();

    if (
      hackyRegex.test(fname) ||
      hackyRegex.test(surname) ||
      hackyRegex.test(email) ||
      hackyRegex.test(electricityMeterNumber) ||
      hackyRegex.test(mobileNumber)
    ) {
      setMessage('Invalid characters detected.');
      return;
    }

    if (!nameRegex.test(fname)) {
      setMessage('First name must only contain alphabetic characters');
      return;
    }

    if (!nameRegex.test(surname)) {
      setMessage('Last name must only contain alphabetic characters');
      return;
    }

    if (fname === '' || surname === '' || mobileNumber === '') {
      setMessage('Name, surname and mobile number are required.');
      return;
    }
    if (fname.length < 3 || fname.length > 50) {
      setMessage('First name is too short.');
      return;
    }

    if (surname.length < 3 || surname.length > 50) {
      setMessage('Last name is too short.');
      return;
    }

    if (mobileNumber.length < 9 || mobileNumber.length > 20) {
      setMessage('Mobile number is not the right length.');
      return;
    }

    const payload: IRecipient = {
      name: fname,
      surname,
      country,
      countryCode,
      mobileNumber,
      email,
      electricityMeterNumber,
      senderId,
      active: true,
      id: uuidv4(),
    };

    mixpanel.track('Create Recipient');

    if (senderId) {
      fetch(`${process.env.NEXT_PUBLIC_API_RECIPIENTS_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response: any) => {
          if (response.ok) {
            dispatchRecipients({
              type: 'ADD_RECIPIENT',
              payload,
            });

            // if (searchParams?.has('return_url')) {
            //   router.push(searchParams.get('return_url') ?? '/cart');
            // } else {
            router.push(
              '/select-deal?recipientCountryCode=ZA&category=Shopping'
            );
            // }
          }
        })
        .catch((error: any) => {
          console.log(error);
          setMessage('Something went wrong. Please try again later.');
        });
    } else {
      try {
        dispatchRecipients({
          type: 'ADD_RECIPIENT',
          payload,
        });

        // if (searchParams?.has('return_url')) {
        //   router.push(searchParams.get('return_url') ?? '/cart');
        // } else {
        router.push('/select-deal?recipientCountryCode=ZA&category=Shopping');
        // }
      } catch (error) {
        console.log(error);
        setMessage('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <main className={`${montserrat.className} ${styles.main}`}>
      <NavMobile withCart={true} />

      <div className={styles.contentBody}>
        <div className={styles.navSidedBody}>
          <SideNav />
          <div>
            <div className={styles.pageHeading}>Recipient&apos;s details</div>
            <br />
            <br />
            <form onSubmit={submitHandler}>
              <div className={styles.formElement}>
                <label htmlFor='fname'>
                  First name<span className={styles.required}>*</span>:
                </label>
                <TextField
                  autoComplete='off'
                  hiddenLabel
                  id='fname'
                  defaultValue=''
                  variant='outlined'
                  name='fname'
                  required
                  style={{ width: '100%', backgroundColor: '#ffffff' }}
                />
              </div>
              <div className={styles.formElement}>
                <label htmlFor='surname'>
                  Last name<span className={styles.required}>*</span>:
                </label>
                <TextField
                  autoComplete='off'
                  hiddenLabel
                  id='surname'
                  defaultValue=''
                  variant='outlined'
                  name='surname'
                  required
                  style={{ width: '100%', backgroundColor: '#ffffff' }}
                />
              </div>

              <div className={styles.formElement}>
                <label htmlFor='mobileNumber'>
                  Mobile number (Airtime top-ups)
                  <span className={styles.required}>*</span>:
                </label>
                <PhoneForm
                  setPhoneNumber={setMobileNumber}
                  setCountryCode={setCountryCode}
                  setCountry={setCountry}
                  defaultCountry='ZA'
                />
              </div>

              <div className={styles.formElement}>
                <label htmlFor='email'>Email address (optional)</label>
                <TextField
                  hiddenLabel
                  type='email'
                  id='email'
                  defaultValue=''
                  variant='outlined'
                  name='email'
                  style={{ width: '100%', backgroundColor: '#ffffff' }}
                />
              </div>

              <div className={styles.formElement}>
                <label htmlFor='electricityMeterNumber'>
                  Electricity meter number (optional)
                </label>
                <TextField
                  autoComplete='off'
                  hiddenLabel
                  id='electricityMeterNumber'
                  defaultValue=''
                  variant='outlined'
                  name='electricityMeterNumber'
                  style={{ width: '100%', backgroundColor: '#ffffff' }}
                />
              </div>

              {message && <p className={styles.errorMessage}>{message}</p>}

              <div className={styles.contentFooter}>
                <input
                  type='submit'
                  className={styles.actionButton}
                  value='Create Recipient'
                />
              </div>
              {/* <div>
                  <p>
                    <Link href='/select-recipient'>
                      Select a recent recipient.
                    </Link>
                  </p>
                </div> */}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
