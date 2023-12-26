import React, { useState, useEffect, FC, useCallback } from 'react';
import PhoneInputWithCountrySelect, {
  parsePhoneNumber,
} from 'react-phone-number-input';
import lookup from 'country-code-lookup';
import 'react-phone-number-input/style.css';

interface IPhoneInputProps {
  setPhoneNumber: (value: string) => void;
  setCountryCode?: (value: string) => void;
  setCountry?: (value: string) => void;
  defaultCountry: string;
}

const PhoneInput: FC<IPhoneInputProps> = ({
  setPhoneNumber,
  setCountryCode,
  setCountry,
  defaultCountry,
}) => {
  const [phone, setPhone] = useState('');

  const updatePhoneNumber = useCallback(
    (phoneNumber: string) => {
      setPhoneNumber(phoneNumber);
    },
    [setPhoneNumber]
  );

  const updateCountryCode = useCallback(
    (countryCode: string) => {
      if (setCountryCode) {
        setCountryCode(countryCode);
      }
    },
    [setCountryCode]
  );

  const updateCountryName = useCallback(
    (countryCode: string) => {
      if (setCountry) {
        const countryDetail = lookup.byIso(countryCode);
        if (countryDetail) {
          setCountry(countryDetail.country);
        }
      }
    },
    [setCountry]
  );

  useEffect(() => {
    const parsedPhoneNumber = parsePhoneNumber(phone);
    if (parsedPhoneNumber) {
      const recipientCountryCode = parsedPhoneNumber.country ?? defaultCountry;
      const recipientPhone = parsedPhoneNumber.number;

      updatePhoneNumber(recipientPhone);
      updateCountryCode(recipientCountryCode);
      updateCountryName(recipientCountryCode);
    }
  }, [
    defaultCountry,
    phone,
    updatePhoneNumber,
    updateCountryCode,
    updateCountryName,
  ]);

  useEffect(() => {
    const phoneInput = document.getElementsByClassName(
      'PhoneInputInput'
    )[0] as HTMLElement;
    if (phoneInput) {
      phoneInput.style.backgroundColor = '#ffffff';
    }
  }, []);

  return (
    <div>
      <PhoneInputWithCountrySelect
        placeholder='Enter phone number'
        autoComplete='off'
        value={phone}
        international
        countryCallingCodeEditable={false}
        defaultCountry={defaultCountry === 'US' ? 'US' : 'ZA'}
        required
        onChange={(value) => {
          setPhone(value ? value : '');
        }}
        onBlur={() => {
          if (!phone) {
            setPhoneNumber('');
            if (setCountryCode) {
              setCountryCode('');
            }
            if (setCountry) {
              setCountry('');
            }
          }
        }}
      />
    </div>
  );
};

export default PhoneInput;
