import { useState } from 'react';
import axios from 'axios';
import Img from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { TextField } from '@mui/material';
import mixpanel from 'mixpanel-browser';
import styles from '../styles/page.module.css';

import Nav from '../components/nav/Nav';
import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({ subsets: ['latin'] });
import PhoneForm from '../components/phoneInput/PhoneInput';
import SideNav from '../components/sideNav/SideNav';
import NavMobile from '../components/navMobile/NavMobile';

export default function Register(): JSX.Element {
  const router = useRouter();

  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [message, setMessage] = useState<null | string>(null);

  const registerUrl = `${process.env.NEXT_PUBLIC_API_USERS_URL}/register`;

  const hackyRegex =
    /<script|<\/script>|javascript:|<|>|onload=|onerror=|onmouseover=|onmouseout=|onfocus=|onblur=|onclick=|ondblclick=|onkeydown=|onkeypress=|onkeyup=|onsubmit=|onreset=|onselect=|onchange=|onloadstart=|onprogress=|onabort=|onloadend=|oncanplay=|oncanplaythrough=|ondurationchange=|onemptied=|onended=|onerror=|oninput=|oninvalid=|onpause=|onplay=|onplaying=|onprogress=|onratechange=|onreadystatechange=|onseeked=|onseeking=|onstalled=|onsuspend=|ontimeupdate=|onvolumechange=|onwaiting=/i;

  const nameRegex = /^[a-zA-Z]+$/;

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    mixpanel.track('Register');

    const email = event.currentTarget.email.value.trim();
    const password = event.currentTarget.password.value.trim();
    const confirmPassword = event.currentTarget.confirmPassword.value.trim();
    const name = event.currentTarget.fname.value.trim();
    const surname = event.currentTarget.surname.value.trim();
    const dateOfBirth = event.currentTarget.dateOfBirth.value.trim();
    const postCode = event.currentTarget.postCode.value.trim();
    const city = event.currentTarget.city.value.trim();
    const gender = event.currentTarget.gender.value.trim();

    mixpanel.identify(email);

    const missingDetail =
      !name ||
      !surname ||
      !email ||
      !mobileNumber ||
      !password ||
      !confirmPassword ||
      !gender ||
      !dateOfBirth ||
      !postCode ||
      !city ||
      !country;

    const hackyDetail =
      hackyRegex.test(surname) ||
      hackyRegex.test(mobileNumber) ||
      hackyRegex.test(email) ||
      hackyRegex.test(password) ||
      hackyRegex.test(confirmPassword) ||
      hackyRegex.test(name) ||
      hackyRegex.test(dateOfBirth) ||
      hackyRegex.test(postCode) ||
      hackyRegex.test(city) ||
      hackyRegex.test(country);

    const alphaNames = !nameRegex.test(name) || !nameRegex.test(surname);

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    if (missingDetail) {
      setMessage('Please fill in all required fields');
      return;
    }

    if (hackyDetail || alphaNames) {
      setMessage('Invalid characters detected.');
      return;
    }

    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
      },
    };

    const requestBody = {
      name,
      surname,
      dateOfBirth,
      email,
      password,
      gender,
      mobileNumber,
      postCode,
      city,
      country,
      countryCode,
    };

    try {
      const response = await axios.post(
        registerUrl,
        requestBody,
        requestConfig
      );
      setMessage('Registration successful');

      // console.log(response);
      router.push('/login/?useremail=' + email);
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        setMessage('Invalid credentials');
      } else {
        setMessage('Something went wrong. Please try again later');
      }
      console.log(error);
    }
  };

  const isEnglishUS =
    typeof window !== 'undefined'
      ? window.navigator.language === 'en-US'
      : false;

  return (
    <main className={`${montserrat.className} ${styles.main}`}>
      <NavMobile />

      <div className={styles.contentBody}>
        <div className={styles.navSidedBody}>
          <SideNav />
          <div>
            <div className={styles.pageHeading}>Create an account</div>
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
                  type='text'
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
                  type='text'
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
                  Mobile Number<span className={styles.required}>*</span>:
                </label>
                <PhoneForm
                  setPhoneNumber={setMobileNumber}
                  setCountryCode={setCountryCode}
                  setCountry={setCountry}
                  defaultCountry='US'
                />
              </div>
              <div className={styles.formElement}>
                <label htmlFor='email'>
                  Email address<span className={styles.required}>*</span>:
                </label>
                <TextField
                  hiddenLabel
                  type='email'
                  id='email'
                  defaultValue=''
                  variant='outlined'
                  name='email'
                  required
                  style={{ width: '100%', backgroundColor: '#ffffff' }}
                />
              </div>
              <div className={styles.formElement}>
                <label htmlFor='dateOfBirth'>
                  Date of birth<span className={styles.required}>*</span>:
                </label>
                <TextField
                  autoComplete='off'
                  hiddenLabel
                  type='text'
                  id='dateOfBirth'
                  defaultValue=''
                  variant='outlined'
                  name='dateOfBirth'
                  required
                  style={{ width: '100%', backgroundColor: '#ffffff' }}
                />
              </div>

              <div className={styles.formElement}>
                <label htmlFor='city'>
                  City<span className={styles.required}>*</span>:
                </label>
                <TextField
                  autoComplete='off'
                  hiddenLabel
                  type='text'
                  id='city'
                  defaultValue=''
                  variant='outlined'
                  name='city'
                  required
                  style={{ width: '100%', backgroundColor: '#ffffff' }}
                />
              </div>

              <div className={styles.formElement}>
                <label htmlFor='postCode'>
                  {isEnglishUS ? 'Zip' : 'Post'} code:
                </label>
                <TextField
                  autoComplete='off'
                  hiddenLabel
                  type='text'
                  id='postCode'
                  defaultValue=''
                  variant='outlined'
                  name='postCode'
                  required
                  style={{ width: '100%', backgroundColor: '#ffffff' }}
                />
              </div>

              <div className={styles.formElement}>
                <label htmlFor='gender'>
                  Gender<span className={styles.required}>*</span>:
                </label>
                <TextField
                  autoComplete='off'
                  hiddenLabel
                  type='text'
                  id='gender'
                  defaultValue=''
                  variant='outlined'
                  name='gender'
                  required
                  style={{ width: '100%', backgroundColor: '#ffffff' }}
                />
              </div>

              <div className={styles.formElement}>
                <label htmlFor='password'>
                  Password<span className={styles.required}>*</span>:
                </label>
                <TextField
                  autoComplete='off'
                  hiddenLabel
                  type='password'
                  id='password'
                  defaultValue=''
                  variant='outlined'
                  name='password'
                  required
                  style={{ width: '100%', backgroundColor: '#ffffff' }}
                />
              </div>
              <div className={styles.formElement}>
                <label htmlFor='confirmPassword'>
                  Confirm password<span className={styles.required}>*</span>:
                </label>
                <TextField
                  autoComplete='off'
                  hiddenLabel
                  type='password'
                  id='confirm-password'
                  defaultValue=''
                  variant='outlined'
                  name='confirmPassword'
                  required
                  style={{ width: '100%', backgroundColor: '#ffffff' }}
                />
              </div>

              <div> {message && <p className='message'>{message}</p>}</div>
              <div className={styles.contentFooter}>
                <input
                  type='submit'
                  className={styles.actionButton}
                  value='Join Now'
                />
                <div>
                  <p>
                    By clicking &quot;Join now&quot;, you are agreeing to our
                    Terms &amp; Conditions and Privacy Policy
                  </p>
                  <p>
                    Already have an account? <Link href='/login'>Sign In</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Nav />
    </main>
  );
}
