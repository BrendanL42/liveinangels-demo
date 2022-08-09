import { React, useEffect } from "react";
import {
  getCarers,
  getClient,
  singleCarer,
  singleClients,
  isAuthenticated,
} from "../../pages/api/adminApi";
import {
  updateRoster,
  deleteRoster,
  emailRoster,
} from "../../pages/api/formApi";

import useState from "react-usestateref";
import { useRouter } from "next/router";

import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

const bl = () => {
  const router = useRouter();
  const userId = router.query.carerid;
  const userId2 = router.query.clientid;
  const [placeholder, setPlaceholder] = useState("h");
  const [completed, setCompleted] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [pdf, setPdf, refPdf] = useState("");
  const [clientName, setClientName] = useState([]);
  const [carerName, setCarerName] = useState([]);
  const [token, setToken] = useState(isAuthenticated().token);
  const [carers, setCarers] = useState([]);
  const [clients, setClients] = useState([]);
  const [day, setDay, refDay] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [start, setStart] = useState("");
  const [note, setNote] = useState("");
  const [finish, setFinish] = useState("");
  const [allCarers, setAllCarers, refAllCarers] = useState();
  const [singleCarers, setSingleCarers, refSingleCarers] = useState();
  const [singleClient, setSingleClient, refSingleClient] = useState();
  const [allClients, setAllClients] = useState();
  const [key, setKey] = useState("");
  const [page, setPage] = useState(1);
  const [roster, setRoster, rosterRef] = useState({
    monday: {
      start: "",
      finish: "",
      notes: "",
    },
    tuesday: {
      start: "",
      finish: "",
      notes: "",
    },
    wednesday: {
      start: "",
      finish: "",
      notes: "",
    },
    thursday: {
      start: "",
      finish: "",
      notes: "",
    },
    friday: {
      start: "",
      finish: "",
      notes: "",
    },
    saturday: {
      start: "",
      finish: "",
      notes: "",
    },
    sunday: {
      start: "",
      finish: "",
      notes: "",
    },
  });

  useEffect(() => {
    getClient(token).then((client) => {
      if (client.error) {
        console.log(client.error);
      } else {
        setAllClients(client);
        client.map((c) =>
          setClients((state) => [...state, `${c.clientfName} ${c.clientlName}`])
        );
      }
    });
  }, []);

  useEffect(() => {
    getCarers(token).then((carer) => {
      if (carer.error) {
        console.log(carer.error);
      } else {
        setAllCarers(carer);
        carer.map((c) =>
          setCarers((state) => [...state, `${c.fName} ${c.lName}`])
        );
      }
    });
  }, []);

  useEffect(() => {
    if (userId) {
      singleCarer(userId).then((carer) => {
        if (carer.error) {
          console.log(carer.error);
        } else {
          setSingleCarers(carer);
        }
      });
    } else if (userId2) {
      singleClients(userId2).then((client) => {
        if (client.error) {
          console.log(client.error);
        } else {
          setSingleClient(client);
        }
      });
    }
  }, []);

  const cal = (time1, time2) => {
    var hour1 = time1.split(":")[0];
    var hour2 = time2.split(":")[0];
    var min1 = time1.split(":")[1];
    var min2 = time2.split(":")[1];

    var diff_hour = hour2 - hour1;
    var diff_min = min2 - min1;
    if (diff_hour < 0) {
      diff_hour += 24;
    }
    if (diff_min < 0) {
      diff_min += 60;
      diff_hour--;
    } else if (diff_min >= 60) {
      diff_min -= 60;
      diff_hour++;
    }

    if (diff_hour === 0 && isNaN(diff_min)) {
      return;
    } else {
      return [diff_hour, "hrs", " ", diff_min, "mins"];
    }
  };

  const calDates = (startDate, stopDate, key) => {
    const start = new Date(startDate),
      end = new Date(stopDate);

    const range = Moment.range(moment(start), moment(end));

    switch (key) {
      case 0:
        const obj = [
          Array.from(range.by("day")).map((date) =>
            moment(date._d).format("ddd")
          )[0],
          " : ",

          Array.from(range.by("day")).map((date) =>
            moment(date._d).format("DD/MM")
          )[0],
        ];

        return obj;
        break;

      case 1:
        const obj1 = [
          Array.from(range.by("day")).map((date) =>
            moment(date._d).format("ddd")
          )[1],
          " : ",

          Array.from(range.by("day")).map((date) =>
            moment(date._d).format("DD/MM")
          )[1],
        ];

        return obj1;
        break;

      case 2:
        const obj2 = [
          Array.from(range.by("day")).map((date) =>
            moment(date._d).format("ddd")
          )[2],
          " : ",

          Array.from(range.by("day")).map((date) =>
            moment(date._d).format("DD/MM")
          )[2],
        ];

        return obj2;
        break;

      case 3:
        const obj3 = [
          Array.from(range.by("day")).map((date) =>
            moment(date._d).format("ddd")
          )[3],
          " : ",

          Array.from(range.by("day")).map((date) =>
            moment(date._d).format("DD/MM")
          )[3],
        ];

        return obj3;
        break;

      case 4:
        const obj4 = [
          Array.from(range.by("day")).map((date) =>
            moment(date._d).format("ddd")
          )[4],
          " : ",

          Array.from(range.by("day")).map((date) =>
            moment(date._d).format("DD/MM")
          )[4],
        ];

        return obj4;
        break;

      case 5:
        const obj5 = [
          Array.from(range.by("day")).map((date) =>
            moment(date._d).format("ddd")
          )[5],
          " : ",

          Array.from(range.by("day")).map((date) =>
            moment(date._d).format("DD/MM")
          )[5],
        ];

        return obj5;
        break;

      case 6:
        const obj6 = [
          Array.from(range.by("day")).map((date) =>
            moment(date._d).format("ddd")
          )[6],
          " : ",

          Array.from(range.by("day")).map((date) =>
            moment(date._d).format("DD/MM")
          )[6],
        ];

        return obj6;
        break;
    }
  };

  const handleChange = (event, number) => {
    const {
      target: { value },
    } = event;

    if (number) {
      setClientName(
        // On autofill we get a the stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    } else {
      setCarerName(
        // On autofill we get a the stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    }
  };

  const handleDays = (carerName, clientName, start, finish, day) => {
    const days = day;
    setRoster((prevState) => ({
      ...prevState,
      [days]: { start: start, finish: finish, notes: note },
    }));
    setCompleted(true);
    setFinish("");
    setStart("");
    setDay("");
    setNote("");
    setTimeout(() => {
      setSuccess("");
    }, 2000);
  };

  const handleSave = (carerName, clientName) => {

    if ((carerName.length, clientName.length)) {
      const carerId = allCarers.find(
        (element) => element.fName === carerName[0].split(" ")[0]
      );
      const clientId = allClients.find(
        (element) => element.clientfName === clientName[0].split(" ")[0]
      );
   
      let roster = {
        client: clientName[0],
        idClient: clientId._id,
        phone: clientId.clientPhone,
        address: `${clientId.clientaddress},${" "}${clientId.clientSuburb},${" "}${clientId.clientCity},${" "}${clientId.clientState},${" "}${clientId.clientPostcode}`,
        schedule: rosterRef.current,
        to: to,
        from: from,
        carer: carerName[0],
        idCarer: carerId._id,
      };



      updateRoster(roster, token, "create").then((data) => {
        if (data.error) {
          setError("Opps something went wrong");
        } else {
          console.log("success", data);
        }
      });
    }
  };

  const handleEdit = async (e, index, day) => {
    const { value, name } = e.target;
    const dayOfRoster = day;
    const indexOfRoster = index;

    const dyIdCarer = singleCarers
      ? singleCarers._id
      : singleClient.rosters[indexOfRoster].carer.id;

    const dyIdClient = singleClient
      ? singleClient._id
      : singleCarers.rosters[indexOfRoster].client.id;

    const rosterToQueryClient = singleClient
      ? singleClient.rosters[indexOfRoster]._id
      : await singleClients(dyIdClient).then((client) => {
          if (client.error) {
            console.log(client.error);
          } else {
            const queryThis = client.rosters.find(
              (o) => o.match === singleCarers.rosters[indexOfRoster].match
            );
            return queryThis._id;
          }
        });

    const rosterToQueryCarer = singleCarers
      ? singleCarers.rosters[indexOfRoster]._id
      : await singleCarer(dyIdCarer).then((carer) => {
          if (carer.error) {
            console.log(carer.error);
          } else {
            const queryThis = carer.rosters.find(
              (o) => o.match === singleClient.rosters[indexOfRoster].match
            );
            return queryThis._id;
          }
        });

    const roster = {
      day: dayOfRoster,
      index: indexOfRoster,
      idCarer: dyIdCarer,
      idClient: dyIdClient,
      rosterIdCarer: rosterToQueryCarer,
      rosterIdClient: rosterToQueryClient,
      valueOfEntry: value,
      time: name,
    };

    await updateRoster(roster, token, "update").then((data) => {
      if (data.error) {
        setError("Opps something went wrong");
      } else {
        singleClients(userId2).then((client) => {
          if (client.error) {
            console.log(client.error);
          } else {
            setSingleClient(client);
          }
        });

        singleCarer(userId).then((carer) => {
          if (carer.error) {
            console.log(carer.error);
          } else {
            setSingleCarers(carer);
          }
        });
      }
    });
  };

  const handleDelete = (match, idClient, idCarer) => {
    const roster = {
      idClient: idClient,
      idCarer: idCarer,
      _match: match,
    };

    deleteRoster(roster, token).then((data) => {
      if (data.error) {
        setError("Opps something went wrong");
      } else {
        setSuccess("Successfully Deleted");
        alert("Successfully Deleted");
      }
    });
  };

  const handleEmail = (rosterId, client, carer, who, email, send) => {
    const clientEmail = allClients.find((i) => i._id === client);

    const roster = {
      rosterId: rosterId,
      _clientId: client,
      _carerId: carer,
      who: who === "carer" ? "carer" : "client",
      email: who === "client" ? clientEmail.clientEmail : email,
      send: send,
    };

    emailRoster(roster, token).then((data) => {
      if (data.size === 21) {
        alert("Email sent");
      } else {
        const cvBlob = new Blob([data], { type: "application/pdf" });
        setPdf(URL.createObjectURL(cvBlob));
      }
    });
  };

  return {
    pdf,
    refPdf,
    handleEmail,
    calDates,
    handleDelete,
    refSingleClient,
    placeholder,
    setPlaceholder,
    clientName,
    setClientName,
    handleChange,
    clients,
    carers,
    carerName,
    setCarerName,
    day,
    setDay,
    setStart,
    start,
    setFinish,
    finish,
    handleDays,
    handleSave,
    refDay,
    allCarers,
    refAllCarers,
    singleCarers,
    setSingleCarers,
    refSingleCarers,
    singleClient,
    note,
    setNote,
    cal,
    success,
    error,
    from,
    setFrom,
    to,
    setTo,
    roster,
    completed,
    handleEdit,
  };
};

export default bl;
