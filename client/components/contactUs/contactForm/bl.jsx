import { React, useState } from "react";
import { postMail } from "../../../pages/api/helperApi";

const bl = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [contactPhone, setContactPhone] = useState(false);
  const [contactEmail, setContactEmail] = useState(false);
  const [honey, setHoney] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);




  const handleSubmit = () => {
    if(!honey && message && name && email && phone) {
      setLoading(true)
      const emailData = {
        name: name,
        email: email,
        phone: phone,
        message: message,
        preference: contactPhone ? "Phone" : "Email",
      };

      postMail(emailData)
        .then((data) => {
          setLoading(false)
          setSuccess(data);
          setName("");
          setEmail("");
          setPhone("");
          setMessage("");
          setContactPhone(false);
          setContactEmail(false);
          setTimeout(() => {
            setSuccess("")
            setError("")
          }, 2000);
        })
        .catch((error) => {
          setError(error);
        });
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    message,
    setMessage,
    contactEmail,
    setContactEmail,
    contactPhone,
    setContactPhone,
    handleSubmit,
    success,
    error,
    honey,
    setHoney,
    loading, 
    setLoading
  };
};

export default bl;
