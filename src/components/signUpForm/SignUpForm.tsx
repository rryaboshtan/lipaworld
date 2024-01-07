import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import mixpanel from 'mixpanel-browser';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import styles from '../styles/page.module.css';
import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({ subsets: ['latin'] });
import PhoneForm from '../phoneInput/PhoneInput';

const SignUpForm = () => {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [message, setMessage] = useState<null | string>(null);
  const [agreedWithTerms, setAgreedWithTerms] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const registerUrl = `${process.env.NEXT_PUBLIC_API_USERS_URL}/register`;

  const hackyRegex =
    /<script|<\/script>|javascript:|<|>|onload=|onerror=|onmouseover=|onmouseout=|onfocus=|onblur=|onclick=|ondblclick=|onkeydown=|onkeypress=|onkeyup=|onsubmit=|onreset=|onselect=|onchange=|onloadstart=|onprogress=|onabort=|onloadend=|oncanplay=|oncanplaythrough=|ondurationchange=|onemptied=|onended=|onerror=|oninput=|oninvalid=|onpause=|onplay=|onplaying=|onprogress=|onratechange=|onreadystatechange=|onseeked=|onseeking=|onstalled=|onsuspend=|ontimeupdate=|onvolumechange=|onwaiting=/i;

  const nameRegex = /^[^<>;"{}()0-9_|\\n]+$/;

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    mixpanel.track('Register');

    const email = event.currentTarget.email.value.trim();
    const password = event.currentTarget.password.value.trim();
    const confirmPassword = event.currentTarget.confirmPassword.value.trim();
    const name = event.currentTarget.fname.value.trim();
    const surname = event.currentTarget.surname.value.trim();
    const dateOfBirthDD = event.currentTarget.dateOfBirthDD.value.trim();
    const dateOfBirthMM = event.currentTarget.dateOfBirthMM.value.trim();
    const dateOfBirthYYYY = event.currentTarget.dateOfBirthYYYY.value.trim();
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
      !dateOfBirthDD ||
      !dateOfBirthMM ||
      !dateOfBirthYYYY ||
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
      hackyRegex.test(dateOfBirthDD) ||
      hackyRegex.test(dateOfBirthMM) ||
      hackyRegex.test(dateOfBirthYYYY) ||
      hackyRegex.test(postCode) ||
      hackyRegex.test(city) ||
      hackyRegex.test(country);

    const alphaNames = !nameRegex.test(name) || !nameRegex.test(surname);

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    const dateOfBirth = `${dateOfBirthDD}/${dateOfBirthMM}/${dateOfBirthYYYY}`;

    if (new Date(dateOfBirth) > new Date()) {
      setMessage('Date of birth is invalid.');
      return;
    }

    if (!dateOfBirthDD || !dateOfBirthMM || !dateOfBirthYYYY) {
      setMessage('Date of Birth is required');
      return;
    }

    if (dateOfBirthDD < 1 || dateOfBirthDD > 31) {
      setMessage('Day must be between 1 and 31');
      return;
    }

    if (dateOfBirthMM < 1 || dateOfBirthMM > 12) {
      setMessage('Month must be between 1 and 12');
      return;
    }

    const currentYear = new Date().getFullYear();
    if (dateOfBirthYYYY < 1900 || dateOfBirthYYYY > currentYear - 18) {
      setMessage(
        `Year must be between 1900 and ${currentYear - 18}. At least aged 18.`
      );
      return;
    }

    if (missingDetail) {
      setMessage('Please fill in all required fields.');
      return;
    }

    if (!agreedWithTerms) {
      setMessage('Please accept our Terms & Conditions and Privacy Policy.');
      return;
    }

    if (hackyDetail || alphaNames) {
      setMessage('Invalid characters found in first or last name.');
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
      mixpanel.track('Registration successful');

      // console.log(response);
      router.push(
        '/login/?useremail=' +
          email +
          '&return_url=' +
          '/select-deal?recipientCountryCode=ZA&category=Electricity'
      );
    } catch (error: any) {
      mixpanel.track(`Registration failed with code: ${error.code}`);

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
          Mobile number<span className={styles.required}>*</span>:
        </label>
        <PhoneForm
          setPhoneNumber={setMobileNumber}
          setCountryCode={setCountryCode}
          setCountry={setCountry}
          defaultCountry='US'
          data-testid='mobileNumberInput'
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TextField
            autoComplete='off'
            hiddenLabel
            type='number'
            id='dateOfBirthDD'
            defaultValue=''
            variant='outlined'
            name='dateOfBirthDD'
            required
            placeholder='DD'
            sx={{
              width: '20%',
              backgroundColor: '#ffffff',
              margin: '0 20px 0 0',
            }}
          />
          /
          <TextField
            autoComplete='off'
            hiddenLabel
            type='number'
            id='dateOfBirthMM'
            defaultValue=''
            variant='outlined'
            name='dateOfBirthMM'
            required
            placeholder='MM'
            sx={{
              width: '20%',
              backgroundColor: '#ffffff',
              margin: '0 20px',
            }}
          />
          /
          <TextField
            autoComplete='off'
            hiddenLabel
            type='number'
            id='dateOfBirthYYYY'
            defaultValue=''
            variant='outlined'
            name='dateOfBirthYYYY'
            required
            placeholder='YYYY'
            sx={{
              width: '30%',
              backgroundColor: '#ffffff',
              margin: '0 20px',
            }}
          />
        </div>
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
        <label htmlFor='postCode'>{isEnglishUS ? 'Zip' : 'Post'} code:</label>
        <TextField
          autoComplete='off'
          hiddenLabel
          type='text'
          id='postCode'
          defaultValue=''
          variant='outlined'
          name='postCode'
          style={{ width: '100%', backgroundColor: '#ffffff' }}
        />
      </div>

      <div className={styles.formElement}>
        <label htmlFor='gender' id='genderLabel'>
          Gender<span className={styles.required}>*</span>:
        </label>
        <FormControl variant='outlined' style={{ width: '100%' }}>
          <Select
            aria-labelledby='genderLabel'
            labelId='gender-label'
            id='gender'
            name='gender'
            defaultValue=''
            required
            style={{ width: '100%', backgroundColor: '#ffffff' }}
          >
            <MenuItem value='Female'>Female</MenuItem>
            <MenuItem value='Male'>Male</MenuItem>
            <MenuItem value='Other'>Other</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className={styles.formElement}>
        <label htmlFor='password'>
          Password<span className={styles.required}>*</span>:
        </label>
        <TextField
          autoComplete='off'
          hiddenLabel
          type={showPassword ? 'text' : 'password'}
          id='password'
          defaultValue=''
          variant='outlined'
          name='password'
          required
          style={{ width: '100%', backgroundColor: '#ffffff' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
          label='Confirm password*'
          required
          style={{ width: '100%', backgroundColor: '#ffffff' }}
        />
      </div>
      <div className={styles.formCheckboxElement}>
        <label htmlFor='confirmPassword'>
          I accept your{' '}
          <Link href={'/terms-conditions'} target='_blank'>
            Terms of use
          </Link>{' '}
          and{' '}
          <Link href={'/privacy-policy'} target='_blank'>
            Privacy Policy
          </Link>
          .
        </label>
        <Checkbox
          checked={agreedWithTerms}
          required
          onChange={(event) => setAgreedWithTerms(event.target.checked)}
          color='success'
          data-testid='termsCheckbox'
        />
      </div>

      <div> {message && <p className='message'>{message}</p>}</div>
      <div className={styles.contentFooter}>
        <input type='submit' className={styles.actionButton} value='Join Now' />
        <div>
          {/*<p>*/}
          {/*  By clicking &quot;Join now&quot;, you are agreeing to our*/}
          {/*  Terms &amp; Conditions and Privacy Policy*/}
          {/*</p>*/}
          <p>
            Already have an account? <Link href='/login'>Sign In</Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
