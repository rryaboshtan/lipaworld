import React from 'react';
import Link from "next/link";
import Img from "next/image";

const Logo = () => {
  return (
      <Link href={`/?recipientCountryCode=ZA`}>
        <Img src='/logo.png' alt='logo' height={34} width={162} />
      </Link>
  );
};

export default Logo;