import { useState } from "react";
import { newClient } from "../../../pages/api/formApi";

const bl = () => {
  const [guardianfName, setGuardianfName] = useState("");
  const [guardianlName, setGuardianlName] = useState("");
  const [guardianemail, setGuardianemail] = useState("");
  const [guardianphone, setGuardianphone] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    guardianfName: "",
    guardianlName: "",
    guardianphone: "",
    guardianemail: "",
  });
  const [once, setOnce] = useState(false);
  let validationErrors = [];
  let validationSuccess = false;

  const validate = (e) => {
    if (!once) {
      setOnce(true);
      validationSuccess = true;
      if (!guardianfName) {
        validationErrors.push({ guardianfName: "First required" });
        if (validationErrors.find((i) => i.guardianfName === "First required"))
          setErrors((prevState) => ({
            ...prevState,
            guardianfName: "First name is required",
          }));
        validationSuccess = false;
        setOnce(false);
      }
      if (!guardianlName) {
        validationErrors.push({ guardianlName: "Last required" });
        if (validationErrors.find((i) => i.guardianlName === "Last required"))
          setErrors((prevState) => ({
            ...prevState,
            guardianlName: "Last name is required",
          }));
        validationSuccess = false;
        setOnce(false);
      }
      if (guardianphone === "") {
        validationErrors.push({ guardianphone: "enter a valid phone number" });

        if (
          validationErrors.find(
            (i) => i.guardianphone === "enter a valid phone number"
          )
        )
          setErrors((prevState) => ({
            ...prevState,
            guardianphone: "Valid phone required",
          }));
        validationSuccess = false;
        setOnce(false);
      }
      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(guardianemail)
      ) {
        validationErrors.push({ guardianemail: "A valid email is required" });
        if (
          validationErrors.find(
            (i) => i.guardianemail === "A valid email is required"
          )
        )
          setErrors((prevState) => ({
            ...prevState,
            guardianemail: "A valid email is required",
          }));
        validationSuccess = false;
        setOnce(false);
      }

      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (validationSuccess) {
      const user = {
        guardianfName,
        guardianlName,
        guardianemail,
        guardianphone,
      };
      newClient(user).then((data) => {
        if (data.error) {
         console.log(data.error)
         validationSuccess = false;
         setOnce(false);
         setError(data.error)
         if(data.error === "Email is taken!") {
          setGuardianemail("")
          validationSuccess = false;
          setOnce(false);
      
         }
        } else {
          setSuccess(data)
          validationSuccess = false;
        }
      });
      setTimeout(() => {
        setError("")
       }, 2000);
    }
  };

  return {
    guardianfName,
    setGuardianfName,
    guardianlName,
    setGuardianlName,
    guardianemail,
    setGuardianemail,
    guardianphone,
    setGuardianphone,
    handleSubmit,
    errors,
    validate,
    success,
    error,
    setErrors,
  };
};

export default bl;
