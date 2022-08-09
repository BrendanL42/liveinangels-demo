import { useState, useEffect } from "react";
import {
  isAuthenticated,
  singleCarer,
  singleClients,
  deleteNotes,
} from "../../pages/api/adminApi";
import { updateAdminNotes } from "../../pages/api/formApi";
import { useRouter } from "next/router";

const bl = (props) => {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [completed, setCompleted] = useState("");
  const [priority, setPriority] = useState("");
  const [singleClient, setSingleClient] = useState("");
  const [singleCarers, setSingleCarers] = useState("");
  const [run, setRun] = useState();
  const [token, setToken] = useState(isAuthenticated().token);

  useEffect(() => {
    if (router.pathname === "/carer/[carerid]") {
      singleCarer(router.query.carerid).then((carer) => {
        if (carer.error) {
          console.log(carer.error);
        } else {
          setSingleCarers(carer);
        }
      });
    } else if (router.pathname === "/client/[clientid]") {
      singleClients(router.query.clientid).then((client) => {
        if (client.error) {
          console.log(client.error);
        } else {
          setSingleClient(client);
        }
      });
    }
  }, [run]);

  const handleSubmit = (router) => {
  
    if (router.pathname === "/carer/[carerid]") {
   
      const carerId = router.query.carerid;

      const notes = {
        note: note,
        priority: priority,
        id: carerId,
      };

      updateAdminNotes(notes, token, "carer")
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            setNote("");
            setRun(run ? false : true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (router.pathname === "/client/[clientid]") {
     
      const clientId = router.query.clientid;
    
      const notes = {
        note: note,
        priority: priority,
        id: clientId,
      };
   

      updateAdminNotes(notes, token, "client")
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
           
            setNote("");
            setRun(run ? false : true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleCheck = (e, note) => {
    setCompleted(completed ? false : true);
    const notes = {
      noteId: note,
      completed: e.target.checked,
      id: router.query.clientid ? router.query.clientid : router.query.carerid,
      who: router.query.clientid ? "client" : "carer",
    };

    updateAdminNotes(notes, token, "complete")
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setNote("");
          setRun(run ? false : true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (notes) => {
    const note = {
      noteId: notes,
      id: router.query.clientid ? router.query.clientid : router.query.carerid,
    };
    deleteNotes(note, token, router.query.clientid ? "client" : "carer")
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setRun(run ? false : true);
  };

  return {
    note,
    setNote,
    priority,
    setPriority,
    handleSubmit,
    singleClient,
    singleCarers,
    handleCheck,
    completed,
    handleDelete,
  };
};

export default bl;
