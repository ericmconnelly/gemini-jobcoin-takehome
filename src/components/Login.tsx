import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LoginSectionStyled,
  LoginBodyStyled,
  LoginButtonStyled,
  LoginContainerStyled,
  LoginHeaderStyled,
  LoginInputStyled,
  LoginHeadingStyled,
  LoginInputLabelStyled,
} from "../styles";

export const Login = () => {
  const [address, setAddress] = useState("");

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  return (
    <LoginContainerStyled>
      <LoginSectionStyled>
        <LoginHeaderStyled>
          <LoginHeadingStyled>
            Welcome! Signin With Your Jobcoin Address
          </LoginHeadingStyled>
        </LoginHeaderStyled>
        <LoginBodyStyled>
          <LoginInputLabelStyled>Jobcoin Address</LoginInputLabelStyled>
          <LoginInputStyled value={address} onChange={handleAddressChange} />
          <Link to={`/address/${address}`}>
            <LoginButtonStyled>Sign In</LoginButtonStyled>
          </Link>
        </LoginBodyStyled>
      </LoginSectionStyled>
    </LoginContainerStyled>
  );
};
