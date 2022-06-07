import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import * as d3 from "d3";
import { TransactionGraph } from "./TransactionGraph";
import { JobcoinHeading } from "./JobcoinHeading";
import { SendJobcoin } from "./SendJobcoin";
import { fetchBalance, fetchTransactions } from "../data";
import { Transaction, Error } from "../types";
import {
  Balance,
  Body,
  LeftBody,
  RightBody,
  SectionHeading,
  SectionBody,
} from "../styles";

export const JobcoinMain = () => {
  const { addressId } = useParams();
  const [balance, setBalance] = useState(null);
  const [destAddress, setDestAddress] = useState("");
  const [amountToSend, setAmountToSend] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState<Error | null>(null);

  const handleFetchTransaction = () => {
    fetchTransactions().then((newTransactions) => {
      let currBalance = 0;

      const filteredTransactions = newTransactions
        .filter(
          (tr: Transaction) =>
            tr.fromAddress === addressId || tr.toAddress === addressId
        )
        .sort(
          (a: Transaction, b: Transaction) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        )
        .map((tr: Transaction) => {
          if (tr.fromAddress === addressId) {
            currBalance -= Number(tr.amount);
          } else {
            currBalance += Number(tr.amount);
          }

          return {
            ...tr,
            date: d3.time.format("%Y-%m-%dT%H:%M:%S.%LZ").parse(tr.timestamp),
            balance: currBalance,
          };
        });
      setTransactions(filteredTransactions);
    });
  };

  const handleFetchBalance = () => {
    fetchBalance(addressId)
    .then((json) => setBalance(json.balance))
    .catch(setError);
  };

  useEffect(() => {
    handleFetchBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressId]);

  useEffect(() => {
    handleFetchTransaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressId]);

  const handleDestAddrChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDestAddress(e.target.value);
  const handleAmountToSendChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/-(?=\d)/g,'');

    console.log(value)
    
    setAmountToSend(value);
  };

  const handleSend = () => {
    setError(null);
    const formData = new FormData();
    formData.append("toAddress", destAddress);
    formData.append("amount", amountToSend);
    formData.append("fromAddress", addressId as string);

    axios
      .post(
        "https://jobcoin.gemini.com/cultural-disband/api/transactions",
        formData
      )
      .then(() => {
        handleFetchTransaction();
        handleFetchBalance()
      })
      .catch((e) => {
        setError(e.response);
      });
  };

  return (
    <main>
      <JobcoinHeading />
      <Body>
        <LeftBody>
          <Balance>
            <SectionHeading>Jobcoin Balance</SectionHeading>
            <SectionBody>{balance || 0}</SectionBody>
          </Balance>
          <SendJobcoin
            destAddress={destAddress}
            handleDestAddrChange={handleDestAddrChange}
            amountToSend={amountToSend}
            handleAmountToSendChange={handleAmountToSendChange}
            handleSend={handleSend}
            error={error}
          />
        </LeftBody>
        <RightBody>
          <TransactionGraph transactions={transactions} balance={balance} />
        </RightBody>
      </Body>
    </main>
  );
};
