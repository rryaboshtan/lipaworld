import React, { useState, useEffect, FC } from 'react';
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

  useEffect(() => {
    const phoneNumber = parsePhoneNumber(phone);
    if (phoneNumber) {
      const recipientCountryCode = phoneNumber.country ?? defaultCountry;
      const recipientPhone = phoneNumber.number;

      setPhoneNumber(recipientPhone);

      if (recipientCountryCode && setCountryCode && setCountry) {
        setCountryCode(recipientCountryCode);
        const countryDetail = lookup.byIso(recipientCountryCode);
        if (countryDetail) {
          setCountry(countryDetail.country);
        }
      }
    }
  }, [defaultCountry, phone, setCountry, setCountryCode, setPhoneNumber]);

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
