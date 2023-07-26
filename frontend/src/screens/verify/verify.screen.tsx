import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import Razorpay from "razorpay";
import axios from "axios";
import {
  ProgressStatus,
  QRCcodeContainer,
  Spinner,
  VerifyContainer,
} from "./verify.styles";
export const VerifyScreen = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [status, setStatus] = useState("");

  const checkout = () => {
    prompt("You will be charged 10$", "10");
    let paymentStatus = "paid";
    return paymentStatus;
  };

  const getstatus = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/verify/status/${state?.callbackId}`
      );

      console.log(data.status);
      setStatus(data.status);

      if (data.status === "VERIFIED") {
        setTimeout(() => {
          let paymentStatus = checkout();

          if (paymentStatus === "paid") {
            navigate(`/profile/${state?.tempReclaimId}`, {
              state: {
                name: "koushith",
                isVerified: true,
                reclaimName: state?.tempReclaimId,
              },
            });
          }
        }, 3000);
      }
    } catch (error) {
      console.log("something went wrong, couldnt fetch", error);
    }
  };

  console.log("what is in??", state);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getstatus();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [state]);
  return (
    <VerifyContainer>
      <QRCcodeContainer>
        <h1 className="title">
          Almost there. Lets get Verified!! <br /> and {state.tempReclaimId}
          .reclaim will be yours.
        </h1>

        <a
          className="link"
          target="_blank"
          rel="noreferrer"
          href={state?.reclaimUrl}
        >
          {" "}
          Click here to open in Reclaim Wallet
        </a>

        <p className="seperator">OR</p>

        <div className="qr-code">
          <QRCodeSVG value={state?.reclaimUrl} className="react-qr" />
        </div>

        <p className="scan-helper-text">
          <span>Scan the QR </span> to submit your claim on the Reclaim app
        </p>

        <ProgressStatus>
          <Spinner />
          Waiting to be verified. Please don't close this tab
        </ProgressStatus>
      </QRCcodeContainer>
    </VerifyContainer>
  );
};
