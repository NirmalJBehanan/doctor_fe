import React, { useEffect, useState } from 'react'
import "./Activate.css";
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
const Activate = () => {
  const { token } = useParams();
  const [loading, isloading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setmessage] = useState("Verifying your email...");
  useEffect(() => {
    const activateAccount = async () => {
      try {
        isloading(true)
        const response = await axios.post(
          "/activate",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setmessage(response.data.message);

        if (response.data.message === "Email verified successfully!") {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      } catch (error) {
        setSuccess(false);
        setmessage(
          error.response?.data?.message ||
          "Email activation failed. Please try again."
        );
      }
      finally {
        isloading(false)
      }
    };

    if (token) {
      activateAccount();
    } else {
      setSuccess(false);
      setmessage("Activation token is missing.");
    }
  }, [token]);


  const navigate = useNavigate()
  if (loading) {
    return (
      <div className="Main">
        <div className="main-section">
          <div className="section11">
            <p>
              <i
                className="fa-solid fa-spinner fa-spin fa-2xl"
                style={{ color: "rgb(45, 194, 149)" }}
              ></i>
            </p>

            <h1>Verifying Your Email...</h1>

            <p>
              Please wait while we verify your email address
              and activate your MediSlot account.
            </p>
          </div>

          <div className="section22">
            <div className="section2-box">
              <h6>Almost there!</h6>
              <p>
                We are securely checking your activation link.
              </p>
              <p>
                Please do not close or refresh this page.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return success ? (
    <div className="Main">
      <div className="main-section">
        <div className="section11">
          <p>
            <i
              className="fa-solid fa-circle-check fa-2xl"
              style={{ color: "rgb(45, 194, 149)" }}
            ></i>
          </p>

          <h1>Email Verified Successfully!</h1>

          <p>
            Your MediSlot account is now active and ready to use.
          </p>
        </div>

        <div className="section22">
          <div className="section2-box">
            <h6>What you can do now</h6>
            <p>✓ Browse doctors and available appointments.</p>
            <p>✓ Book your doctor appointments.</p>
          </div>

          <Link to="/login">
            <button>Continue to Portal</button>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="Main">
      <div className="main-section">
        <div className="section11">
          <p>
            <i
              className="fa-solid fa-circle-xmark fa-2xl"
              style={{ color: "red" }}
            ></i>
          </p>

          <h1>Activation Failed</h1>
          <p>{message}</p>
        </div>

        <div className="section22">
          <Link to="/login">
            <button>Go to Login</button>
          </Link>
        </div>
      </div>
    </div>
  );

}

export default Activate