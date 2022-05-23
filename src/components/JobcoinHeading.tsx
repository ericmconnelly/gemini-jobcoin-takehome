import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { JobcoinHeadingStyled, JobcoinSenderStyled ,JobcoinProfileStyled, JobcoinSignedInStyled } from "../styles";

export const JobcoinHeading = () => {
  const { addressId } = useParams();
  return (
    <JobcoinHeadingStyled>
      <JobcoinSenderStyled>
        <span>{addressId}</span>
      </JobcoinSenderStyled>
      <JobcoinProfileStyled>
        <JobcoinSignedInStyled>Signed in</JobcoinSignedInStyled>
        <Link to={`/login`} style={{ textDecoration: "none", color: "blue" }}>
          Sign out
        </Link>
      </JobcoinProfileStyled>
    </JobcoinHeadingStyled>
  );
};
