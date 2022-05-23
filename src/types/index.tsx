export type Transaction = {
  timestamp: string;
  fromAddress: string;
  toAddress: string;
  amount: string;
  date: Date;
  balance: Number;
};

type DataError = {
  error: string;
};

type HeadersError = any;
type RequestError = any;

export type Error = {
  data: DataError;
  status: Number;
  statusText: string;
  headers: HeadersError;
  request: RequestError;
};

export type SendJobcoinProps = {
    destAddress: string;
    amountToSend: string;
    handleDestAddrChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAmountToSendChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSend: () => void;
    error: Error | null;
  };
  