// carer update
export const update = (userId, carer, token) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/update/${userId}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: carer,
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// carer read
export const read = (userId, token) => {
  return fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/read/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// client create
export const newClient = (client) => {
  return fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/new/client/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// client update
export const updateClient = (clientId, client, token) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/client/update/${clientId}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: client,
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateNotes = (clientId, note, name, token, action) => {
  return fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/client/notes`, {
    method: "PUT",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ clientId, note, name, action }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};




// client read
export const readClient = (userId, token) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/client/${userId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const updateRoster = (roster, token, type) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/roster?type=${type}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(roster),
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const deleteRoster = (roster, token) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/roster`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(roster),
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};




export const emailRoster = (roster, token) => {

  return fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/roster/email`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roster),
    }
  )
    .then((response) => {
      return response.blob();
      
    })
    .catch((err) => console.log(err));
};





export const updateAdminNotes = (notes, token, type) => {
 
  return fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/admin/notes?type=${type}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(notes),
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};



export const submitRosters = (userId, data) => {
  console.log(userId, data);
  return fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/roster/km/${userId}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};