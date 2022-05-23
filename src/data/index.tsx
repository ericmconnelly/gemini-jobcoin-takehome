import axios from "axios";

export const fetchBalance = (address: string | undefined = "") => {
  return axios
    .get(`http://jobcoin.gemini.com/cultural-disband/api/addresses/${address}`)
    .then((res) => res.data);
};

export const fetchTransactions = () => {
  return axios
    .get("http://jobcoin.gemini.com/cultural-disband/api/transactions")
    .then((res) => res.data);
};
