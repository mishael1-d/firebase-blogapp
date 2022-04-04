import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function Modal({ setOpenModal, setIsAuth }) {
  const [numbers, setNumbers] = useState({
    phoneNumber: "",
    otp:""
  })
  let navigate = useNavigate();
const handleChange =(e)=>{
e.preventDefault()
const name= e.target.name
const value= e.target.value

setNumbers({...numbers, [name]: value})
}
  const configureCapture =()=>{
    const auth = getAuth();
window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
  'size': 'invisible',
  'callback': (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    onSignInSubmit();
    console.log("verified captcha")
  }
}, auth);
  }

   const onSignInSubmit =(e)=>{
     e.preventDefault()

     configureCapture()
     const phoneNumber = "+234" + numbers.phoneNumber;
     console.log(phoneNumber)
     const appVerifier = window.recaptchaVerifier;
     
     const auth = getAuth();
     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
         .then((confirmationResult) => {
           // SMS sent. Prompt user to type the code from the message, then sign the
           // user in with confirmationResult.confirm(code).
           window.confirmationResult = confirmationResult;
           console.log("Otp has been sent")
           // ...
         }).catch((error) => {
           // Error; SMS not sent
           // ...
          console.log("SMS not sent")
         });
   }
   const onSubmitOTP =()=> {
    const code = numbers.otp;
    console.log(code)
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      // ...
      console.log(JSON.stringify(user))
      alert("User verified")
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
    });
    localStorage.setItem("isAuth", true);
    setIsAuth(true);
    navigate("/");
   }
  return (
    <>
    <form className="mdContainer" onSubmit={onSignInSubmit}>
      <label>Please insert Phone Number</label>
      <div id="sign-in-button"></div>
      <input
      name="phoneNumber"
        type="text"
        placeholder="Start number with country code"
        onChange={handleChange}
        required
      />
      <button type="submit" id="sign-in-button">Send Code</button>
      </form>
      <form className="mdContainer" onSubmit={onSubmitOTP}>
      <label>Insert OTP</label>
      <input
      name="otp"
        type="text"
        placeholder=""
        onChange={handleChange}
        required
      />
      <button type="submit">Submit</button>
    </form>
    </>
  );
}

export default Modal;
