import React from "react";
import { Link } from "react-router-dom";
import PlaidLink from "./PlaidLink";

export default function BankInformation() {
  return (
    <>
      <PlaidLink />
      <Link to="/user">
        <button>Next</button>
      </Link>
    </>
  );
}
