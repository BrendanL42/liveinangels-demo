export const apply = (user) => {
  return fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/apply`, {
    method: "PUT",
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

export const getJobPosts = () => {
  return fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/jobsboard`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getSingleJobPost = (post) => {

  return fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/jobsboard/${post}`, {
      method: "GET",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
      },
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};