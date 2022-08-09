import { React, useEffect, useState } from "react";
import {
  updatePrice,
  getAdmin,
  isAuthenticated,
  getNewClient,
  getNewCarer,
} from "../../../pages/api/adminApi";
import { useRouter } from "next/router";

const bl = () => {
  const router = useRouter();

  const [admin, setAdmin] = useState();
  const [clients, setClients] = useState([]);
  const [carer, setCarer] = useState([]);
  const adminId = router.query.id;
  const [priceCounter, setPriceCounter] = useState(0);

  useEffect(() => {
    getAdmin(adminId, isAuthenticated().token)
      .then((data) => {
        setAdmin(data);
      })
      .catch((error) => {
        console.log("Error", error);
      });

    getNewClient(adminId, isAuthenticated().token)
      .then((data) => {
        setClients(data);
      })
      .catch((error) => {
        console.log("error", error);
      });

    getNewCarer(adminId, isAuthenticated().token)
      .then((data) => {
        setCarer(data);
      })
      .catch((error) => {
        console.log("error", error);
      });
    console.log(admin);
  }, []);

  const update_Price = (data) => {
    updatePrice(adminId, isAuthenticated().token, data)
      .then((data) => {
        setAdmin(data);
        console.log("here", data);
      })
      .catch((error) => {
        console.log("here", error);
      });
  };

  // Create handleIncrement event handler
  const handleIncrementPrice = () => {
    setPriceCounter((prevCount) => prevCount + 0.05);
  };

  //Create handleDecrement event handler
  const handleDecrementPrice = () => {
    setPriceCounter((prevCount) =>
      prevCount !== 0 ? prevCount - 0.05 : prevCount
    );
  };

  return {
    admin,
    handleIncrementPrice,
    handleDecrementPrice,
    priceCounter,
    update_Price,
    clients,
    carer,
  };
};
export default bl;
