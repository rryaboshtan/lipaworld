import React from 'react';

const CardsFooter = () => {
  return (
    <div className='footer-meta__payments footer-payments'>
      <svg
        className='icon icon--full-color'
        viewBox='0 0 38 24'
        xmlns='http://www.w3.org/2000/svg'
        width='38'
        height='24'
        role='img'
        aria-labelledby='pi-maestro'
      >
        <title id='pi-maestro'>Maestro</title>
        <path
          opacity='.07'
          d='M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z'
        ></path>
        <path
          fill='#fff'
          d='M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32'
        ></path>
        <circle fill='#EB001B' cx='15' cy='12' r='7'></circle>
        <circle fill='#00A2E5' cx='23' cy='12' r='7'></circle>
        <path
          fill='#7375CF'
          d='M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z'
        ></path>
      </svg>

      <svg
        className='icon icon--full-color'
        viewBox='0 0 38 24'
        xmlns='http://www.w3.org/2000/svg'
        role='img'
        width='38'
        height='24'
        aria-labelledby='pi-master'
      >
        <title id='pi-master'>Mastercard</title>
        <path
          opacity='.07'
          d='M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z'
        ></path>
        <path
          fill='#fff'
          d='M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32'
        ></path>
        <circle fill='#EB001B' cx='15' cy='12' r='7'></circle>
        <circle fill='#F79E1B' cx='23' cy='12' r='7'></circle>
        <path
          fill='#FF5F00'
          d='M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z'
        ></path>
      </svg>

      <svg
        className='icon icon--full-color'
        viewBox='0 0 38 24'
        xmlns='http://www.w3.org/2000/svg'
        width='38'
        height='24'
        role='img'
        aria-labelledby='pi-paypal'
      >
        <title id='pi-paypal'>PayPal</title>
        <path
          opacity='.07'
          d='M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z'
        ></path>
        <path
          fill='#fff'
          d='M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32'
        ></path>
        <path
          fill='#003087'
          d='M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z'
        ></path>
        <path
          fill='#3086C8'
          d='M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z'
        ></path>
        <path
          fill='#012169'
          d='M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z'
        ></path>
      </svg>

      <svg
        className='icon icon--full-color'
        viewBox='0 0 38 24'
        xmlns='http://www.w3.org/2000/svg'
        role='img'
        width='38'
        height='24'
        aria-labelledby='pi-visa'
      >
        <title id='pi-visa'>Visa</title>
        <path
          opacity='.07'
          d='M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z'
        ></path>
        <path
          fill='#fff'
          d='M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32'
        ></path>
        <path
          d='M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z'
          fill='#142688'
        ></path>
      </svg>
    </div>
  );
};

export default CardsFooter;
