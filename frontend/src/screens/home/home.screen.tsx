import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HomeContainer } from "./home.styles";

export const HomeScreen = () => {
  const [tempReclaimId, setTempReclaimId] = useState("");
  const [isIdExist, setIsIdExist] = useState(false);
  const [reclaimUrl, setReclaimUrl] = useState("");
  const [callbackId, setCallbackId] = useState("");

  const navigate = useNavigate();

  const checkIfIdExist = async () => {
    try {
      const { data } = await axios.post(
        "http://192.168.68.109:8000/verify/init",
        {
          tempReclaimId,
        }
      );
      console.log("data------", data);
      if (data.code === "TAKEN") {
        setIsIdExist(true);
        throw new Error(
          "This name is taken... please try with different name."
        );
      } else {
        setReclaimUrl(data.callbackUrl);
        setCallbackId(data.callbackId);

        navigate("/verify", {
          state: {
            callbackId: data.callbackId,
            reclaimUrl: data.callbackUrl,
          },
        });
      }
    } catch (error) {
      console.log("something went wrong", error.message);
    }
  };
  return (
    <HomeContainer>
      <h1>Welcome to ReclaimID. Don't trust, verify</h1>

      <div className="input">
        <p className="sub-title">Claim your ReclaimID before it's too late!</p>
        <div className="form">
          <input
            type="text"
            placeholder="verify.com/username.reclaim"
            value={tempReclaimId}
            onChange={(e) => setTempReclaimId(e.target.value)}
          />
          <button onClick={checkIfIdExist}>Check Now</button>
        </div>
        {isIdExist && (
          <p className="taken-text">
            This ID is already taken, you’re a little late.😐
          </p>
        )}
      </div>
    </HomeContainer>
  );
};
