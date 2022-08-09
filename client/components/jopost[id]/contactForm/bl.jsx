import { useState } from "react";

import { apply } from "../../../pages/api/jobPostApi";

import { useRouter } from "next/router";

const bl = () => {
  const router = useRouter();
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [applications, setApplications] = useState([
    { jobPostId: router.query.jobid },
  ]);

  const page = router.pathname;

  const [success, setSuccess] = useState("");
  //errors
  const [error, setError] = useState("");
  const [fNameError, setFnameError] = useState("");
  const [lNameError, setLnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [once, setOnce] = useState(false);
  let validationErrors = [];
  let validationSuccess = false;

  const validate = (e) => {
    if (!once) {
      setOnce(true);
      validationSuccess = true;
      if (!fName) {
        validationErrors.push({ fName: "First name must not be empty" });
        if (
          validationErrors.find(
            (i) => i.fName === "First name must not be empty"
          )
        )
          setFnameError("First is name required");
        validationSuccess = false;
      }
      if (!lName) {
        validationErrors.push({ fName: "Last name must not be empty" });
        if (
          validationErrors.find(
            (i) => i.fName === "Last name must not be empty"
          )
        )
          setLnameError("Last is name required");
        validationSuccess = false;
      }
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        validationErrors.push({ email: "A valid email is required" });
        if (
          validationErrors.find((i) => i.email === "A valid email is required")
        )
          setEmailError("A valid email is required");
        validationSuccess = false;
      }
      if (phone === "+" || "" || phone.length < 4) {
        validationErrors.push({ phone: "enter a valid phone number" });

        if (
          validationErrors.find((i) => i.phone === "enter a valid phone number")
        )
          setPhoneError("A phone number is required");
        validationSuccess = false;
      }

      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (validationSuccess) {
      const user = {
        fName,
        lName,
        email,
        phone,
        applications,
        page,
      };

      apply(user).then((data) => {
        if (data.error) {
          setError(data.error);
          setOnce(false);
          validationSuccess = true;
        } else {
          setOnce(false);
          validationSuccess = true;
          setSuccess(data);
          setTimeout(() => {
            setSuccess("");
          }, 3000);
        }
      });
    }
  };

  return {
    phone,
    setPhone,
    email,
    setEmail,
    lName,
    setLname,
    fName,
    setFnameError,
    setFname,
    setLnameError,
    handleSubmit,
    fNameError,
    lNameError,
    phoneError,
    setPhoneError,
    emailError,
    setEmailError,
    validate,
    success,
    error,
  };
};

export default bl;
