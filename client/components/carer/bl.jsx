import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  singleCarer,
  getAllDocs,
  isAuthenticated,
} from "../../pages/api/adminApi";
import { update } from "../../pages/api/formApi";
import moment from "moment";

const bl = () => {
  const router = useRouter();
  const [carer, setCarer] = useState({
    email: "",
    fName: "",
    lName: "",
    phone: "",
    address: "",
    nationality: "",
    language: "",
    emergencyNumber: "",
    emergencyEmail: "",
    emergencyRelationship: "",
    emergencyName: "",
    workersComp: "",
    medical: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
    visaDetails: "",
  });

  const [handleVisaState, setHandleVisaState] = useState(false);
  const [handleAgeState, setHandleAgeState] = useState(false);
  const carerid = router.query.carerid;
  
  const [documents, setDocuments] = useState({
    cv: null,
    wwc: null,
    pc: null,
    fa: null,
    cpr: null,
    c1: null,
    c2: null,
    c3: null,
    c4: null,
  });

  const [loading, setLoading] = useState({
    cv: false,
    wwc: false,
    pc: false,
    fa: false,
    cpr: false,
    c1: false,
    c2: false,
    c3: false,
    c4: false,
  });

  const [carerUpdate, setCarerUpdate] = useState({
    email: "",
    fName: "",
    lName: "",
    phone: "",
    address: "",
    nationality: "",
    language: "",
    emergencyNumber: "",
    emergencyEmail: "",
    emergencyRelationship: "",
    emergencyName: "",
    workersComp: "",
    medical: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
    visaDetails: "",
    photo: null,
    wwc: null,
    c1: null,
    c2: null,
    c3: null,
    c4: null,
    pc: null,
    fa: null,
    cpr: null,
    cv: null,
  });

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    singleCarer(carerid).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCarer(data);
        setCarerUpdate((prevState) => ({
          ...prevState,
          fName: data.fName,
          lName: data.lName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          nationality: data.nationality,
          language: data.language,
          emergencyNumber: data.emergencyNumber,
          emergencyEmail: data.emergencyEmail,
          emergencyRelationship: data.emergencyRelationship,
          emergencyName: data.emergencyName,
          workersComp: data.workersComp,
          medical: data.medical,
          monday: data.monday,
          tuesday: data.tuesday,
          wednesday: data.wednesday,
          thursday: data.thursday,
          friday: data.friday,
          saturday: data.saturday,
          sunday: data.sunday,
          visaDetails: data.visaDetails,
          state: data.state,
          postcode: data.postcode,
          suburb: data.suburb,
          city: data.city,
          age: data.age,
          car: data.car,
          ausCitizen: data.ausCitizen,
        }));
      }
    });
  }, [router.isReady]);

  const handleSave = () => {
    const dayVisa = carerUpdate.visaDetails.toString().split("/")[0];
    const monthVisa = carerUpdate.visaDetails.toString().split("/")[1];
    const yearVisa = carerUpdate.visaDetails.toString().split("/")[2];
    let NewDateVisa = `${monthVisa}${"/"}${dayVisa}${"/"}${yearVisa}`;

    const day = carerUpdate.age.toString().split("/")[0];
    const month = carerUpdate.age.toString().split("/")[1];
    const year = carerUpdate.age.toString().split("/")[2];
    let NewDate = `${month}${"/"}${day}${"/"}${year}`;

    let user = new FormData();
    user.set("monday", carerUpdate.monday);
    user.set("tuesday", carerUpdate.tuesday);
    user.set("wednesday", carerUpdate.wednesday);
    user.set("thursday", carerUpdate.thursday);
    user.set("friday", carerUpdate.friday);
    user.set("sunday", carerUpdate.sunday);
    user.set("saturday", carerUpdate.saturday);
    user.set("fName", carerUpdate.fName);
    user.set("lName", carerUpdate.lName);
    user.set("email", carerUpdate.email);
    user.set("phone", carerUpdate.phone);
    user.set("address", carerUpdate.address);
    user.set("state", carerUpdate.state);
    user.set("postcode", carerUpdate.postcode);
    user.set("suburb", carerUpdate.suburb);
    user.set("city", carerUpdate.city);
    user.set("nationality", carerUpdate.nationality);
    user.set("language", carerUpdate.language);
    user.set(
      "visaDetails",
      handleVisaState ? NewDateVisa : carerUpdate.visaDetails
    );
    user.set("emergencyName", carerUpdate.emergencyName);
    user.set("emergencyRelationship", carerUpdate.emergencyRelationship);
    user.set("emergencyNumber", carerUpdate.emergencyNumber);
    user.set("emergencyEmail", carerUpdate.emergencyEmail);
    user.set("medical", carerUpdate.medical);
    user.set("workersComp", carerUpdate.workersComp);
    user.set("car", carerUpdate.car);
    user.set("age", handleAgeState ? NewDate : carerUpdate.age);

    update(carerid, user, isAuthenticated().token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          router.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const uploadFile = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    const size = e.target.files[0].size;

    if (size < 4000000) {
      setLoading({
        cv: name === "cv" ? true : false,
        wwc: name === "wwc" ? true : false,
        pc: name === "pc" ? true : false,
        fa: name === "fa" ? true : false,
        cpr: name === "cpr" ? true : false,
        c1: name === "c1" ? true : false,
        c2: name === "c2" ? true : false,
        c3: name === "c3" ? true : false,
        c4: name === "c4" ? true : false,
      });
      let user = new FormData();
      name === "cv" ? user.set("cv", file) : null;
      name === "wwc" ? user.set("wwc", file) : null;
      name === "pc" ? user.set("policeCheck", file) : null;
      name === "fa" ? user.set("firstAid", file) : null;
      name === "cpr" ? user.set("cpr", file) : null;
      name === "c1" ? user.set("certOne", file) : null;
      name === "c2" ? user.set("certTwo", file) : null;
      name === "c3" ? user.set("certThree", file) : null;
      name === "c4" ? user.set("certFour", file) : null;
      update(carerid, user, isAuthenticated().token)
        .then((data) => {
          if (data.error) {
            console.log(error);
          } else {
            setLoading({
              cv: false,
              wwc: false,
              pc: false,
              fa: false,
              cpr: false,
              c1: false,
              c2: false,
              c3: false,
              c4: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("PDF - 4mb Max Size");
    }
  };

  const handleAccordian = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //handle input capture
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarerUpdate((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (e.target.name === "car") {
      setCarerUpdate((prevState) => ({
        ...prevState,
        [name]: carerUpdate.car ? false : true,
      }));
    }
    if (e.target.name === "visaDetails") {
      setHandleVisaState(true);
    }
    if (e.target.name === "age") {
      setHandleAgeState(true);
      const day = value.toString().split("/")[0];
      const month = value.toString().split("/")[1];
      const year = value.toString().split("/")[2];
      let NewDate = `${month}${"/"}${day}${"/"}${year}`;

      setCarerUpdate((prevState) => ({
        ...prevState,
        age: value,
      }));
      console.log("old date", value);
      console.log("NewDate", NewDate);
    }
  };

  const getFile = (type) => {
    getAllDocs(type, carerid).then((data) => {
      if (data.error) {
        setError(data);
      } else {
        switch (type) {
          case "cv":
            const cvBlob = new Blob([data], { type: "application/pdf" });
            setDocuments({
              ...documents,
              cv: URL.createObjectURL(cvBlob),
            });
            break;
          case "wwc":
            const wwcBlob = new Blob([data], { type: "application/pdf" });
            setDocuments({
              ...documents,
              wwc: URL.createObjectURL(wwcBlob),
            });
            break;
          case "pc":
            const pcBlob = new Blob([data], { type: "application/pdf" });
            setDocuments({
              ...documents,
              pc: URL.createObjectURL(pcBlob),
            });
            break;
          case "cpr":
            const cprBlob = new Blob([data], { type: "application/pdf" });
            setDocuments({
              ...documents,
              cpr: URL.createObjectURL(cprBlob),
            });
            break;
          case "fa":
            const faBlob = new Blob([data], { type: "application/pdf" });
            setDocuments({
              ...documents,
              fa: URL.createObjectURL(faBlob),
            });
            break;
          case "c1":
            const certOneBlob = new Blob([data], { type: "application/pdf" });
            setDocuments({
              ...documents,
              c1: URL.createObjectURL(certOneBlob),
            });
            break;
          case "c2":
            const certTwoBlob = new Blob([data], { type: "application/pdf" });
            setDocuments({
              ...documents,
              c2: URL.createObjectURL(certTwoBlob),
            });
            break;
          case "c3":
            const certThreeBlob = new Blob([data], { type: "application/pdf" });
            setDocuments({
              ...documents,
              c3: URL.createObjectURL(certThreeBlob),
            });
            break;
          case "c4":
            const certFourBlob = new Blob([data], { type: "application/pdf" });
            setDocuments({
              ...documents,
              c4: URL.createObjectURL(certFourBlob),
            });
            break;
        }
      }
    });
  };

  return {
    carer,
    documents,
    getFile,
    expanded,
    handleAccordian,
    handleChange,
    carerUpdate,
    handleSave,
    uploadFile,
    loading,
    handleVisaState,
    handleAgeState,
  };
};

export default bl;


