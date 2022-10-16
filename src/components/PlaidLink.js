import { BanknotesIcon } from "@heroicons/react/24/outline";
import React, { useCallback, useState, useEffect } from "react";
import { usePlaidLink, PlaidLinkOnSuccess } from "react-plaid-link";

function PlaidLink() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const createLinkToken = async () => {
      const response = await fetch(
        "https://backend-lucky-production.up.railway.app/api/accounts/initial_token"
      );
      const { link_token } = await response.json();
      setToken(link_token);
    };
    createLinkToken();
  }, []);

  const onSuccess = useCallback(async (publicToken, metadata) => {
    //TODO: Start showing loading screen
    const result = await fetch(
      "https://backend-lucky-production.up.railway.app/api/accounts/public_token",
      {
        method: "POST",
        body: JSON.stringify({
          publicToken: publicToken,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(result.json());
  }, []);

  const { open, ready } = usePlaidLink({ token, onSuccess });

  return (
    <button
      onClick={() => open()}
      disabled={!ready}
      className="group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300 "
    >
      <BanknotesIcon className="h-6 w-6 flex-none fill-blue-600 group-active:fill-current" />
      <span className="ml-3">Connect to your Bank</span>
    </button>
  );
}

export default PlaidLink;
