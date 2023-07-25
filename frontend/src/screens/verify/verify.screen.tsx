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
            navigate("/profile", {
              state: {
                name: "koushith",
                isVerified: true,
              },
            });
          }
        }, 3000);
      }
    } catch (error) {
      console.log("something went wrong, couldnt fetch", error);
    }
  };

  //check the status every 3 sec
  // if proved, proceed to payment
  // keyid rzp_test_cxokgq1hEQcypq

  //key sec urW0OyWCvNlQR9BMuRPDJDgy
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
      {/* <QRCcodeContainer>
        <QRCodeSVG value={state?.reclaimUrl} />
      </QRCcodeContainer> */}
      <QRCcodeContainer>
        <h1 className="title">Almost there. Lets get Verified!!</h1>

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
