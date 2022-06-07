import {  SendJobcoinProps } from "../types";
import {
  SendJobcoinBody,
  SendJobcoinStyled,
  SectionHeading,
  ErrorStyled,
  Label,
  Input,
  Button,
  InputRow,
} from "../styles";

export const SendJobcoin = ({
  destAddress,
  handleDestAddrChange,
  amountToSend,
  handleAmountToSendChange,
  handleSend,
  error,
}: SendJobcoinProps) => {
  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Minus') {
        e.preventDefault();
    }
  };

  return (
    <SendJobcoinStyled>
      <SectionHeading>Send Jobcoin</SectionHeading>
      <SendJobcoinBody>
        <InputRow>
          <Label>Destination Address</Label>
          <Input
            value={destAddress}
            type="text"
            onChange={handleDestAddrChange}
          />
        </InputRow>
        <InputRow>
          <Label>Amount to Send</Label>
          <Input
            value={amountToSend}
            onChange={handleAmountToSendChange}
            onKeyPress={handleOnKeyPress}
            type="number"
            min="0"
          />
        </InputRow>
        <InputRow>
          <Button onClick={handleSend}>Send Jobcoins</Button>
        </InputRow>
        {error ? (
          <InputRow>
            <ErrorStyled>{error.data && error.data.error && JSON.stringify(error.data.error)}</ErrorStyled>
          </InputRow>
        ) : null}
      </SendJobcoinBody>
    </SendJobcoinStyled>
  );
};
