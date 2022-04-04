import React, { useState } from "react";
import { auth, provider } from "../firebase-server";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
function Login({ setIsAuth }) {
  const [openModal, setOpenModal] = useState(false);
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  return (
    <div className="loginPage">
      <p>Sign In With Google to Continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <br />
      <h3>Or</h3>
      <p>Sign In With Phone Number to Continue</p>
      <button
        className="login-with-phone-btn"
        onClick={() => setOpenModal(true)}
      >
        Sign in with Phone Number
      </button>
      {openModal && (
        <>
          <div className="overlay"></div>
          <Modal
            setOpenModal={setOpenModal}
            setIsAuth={setIsAuth}
          />
        </>
      )}
    </div>
  );
}

export default Login;
