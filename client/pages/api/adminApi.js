export const signin = (user) => {
  return fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (jwt, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("LIA", JSON.stringify(jwt));
    next();
  }
};

export const signout = () => {
  document.cookie = "LIA= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "ID= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  if (typeof window !== "undefined") {
    if (localStorage.getItem("LIA")) {
      localStorage.removeItem("LIA");
    }
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (document.cookie.indexOf("LIA") > -1) {
    return JSON.parse(localStorage.getItem("LIA"));
  } else {
    return false;
  }
};

export const newBlog = (adminId, token, post) => {
  return fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/blog/${adminId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const newJob = (adminId, token, post) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/jobPost/${adminId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: post,
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//  get carer
export const getCarers = (token) => {
  return fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/carers`, {
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

//  get clients
export const getClient = (token) => {
  return fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/clients`, {
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

//  get new client
export const getNewClient = (token) => {
  return fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/new-clients`, {
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

//  get new client
export const getNewCarer = (token) => {
  return fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/new-carer`, {
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

//  get carer
export const singleCarer = (carerid) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/carer/${carerid}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//  get client
export const singleClients = (clientid) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/client/${clientid}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getCarerDocuments = (userId, token) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/user/documents/cv/${userId}?role=jobSeeker`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      return response.blob();
    })
    .catch((err) => console.log(err));
};

export const getAllDocs = (type, carerid) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/documents/${carerid}?type=${type}`,
    {
      method: "GET",
      headers: {},
    }
  )
    .then((response) => {
      return response.blob();
    })
    .catch((err) => console.log(err));
};

export const deleteNotes = (note, token, type) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/admin/notes?type=${type}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(note),
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updatePrice = (userID, token, data) => {
  return fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/price`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userID, data }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("this error", err));
};

export const getAdmin = (token) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/read/admin?Id=${process.env.NEXT_PUBLIC_REACT_APP_ID}`,
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

