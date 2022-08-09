import { useState, useContext } from "react";
import { signin, authenticate, isAuthenticated } from "../../pages/api/adminApi";
import { useRouter } from 'next/router'
import {isAuth} from '../../context/index'

const bl = () => {
  const [password, setPassword] = useState("Password1");
  const [email, setEmail] = useState("demo-account@admin.com");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [redirectToReferer, setRedirectToReferer] = useState(false);
  const [open, setOpen] = useState(false);
  const [once, setOnce] = useState(false);
  const { setAuth } = useContext(isAuth);
  let router = useRouter();

  let validationErrors = [];
  let validationSuccess = false;

  const [emailError, setEmailError] = useState("");

  const [passwordError, setPasswordError] = useState("");



  const validate = () => {
    if (!once) {
   setOnce(true)
      validationSuccess = true;
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        validationErrors.push({ email: "email empty" });
        if (validationErrors.find((i) => i.email === "email empty"))
          setEmailError("A valid email required");
        validationSuccess = false;
      }
      if (!password) {
        validationErrors.push({ password: "password required" });
        if (validationErrors.find((i) => i.password === "password required"))
          setPasswordError("Password is required");
        validationSuccess = false;
      }
      handleSubmit();
      setOnce(false)
    }
  };



  const handleSubmit = () => {
    if (validationSuccess) {
    let user = { email, password, rememberMe };
    signin(user).then((data) => {
      if (data.error) {
        setError(data.error);
        setOnce(false)
      } else {
        authenticate(data, () => {
          setAuth(isAuthenticated());
          setRedirectToReferer(true);
          setOnce(false)
        });
      }
    });
  }
  };

  if (redirectToReferer) {
    router.push(`/admin/${isAuthenticated().user._id}`);
  }


  return { email, setEmail, password, setPassword, validate, rememberMe, setRememberMe, error, emailError, passwordError, setEmailError, setPasswordError, setError };
};

export default bl;
