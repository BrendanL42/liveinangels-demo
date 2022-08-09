export const s3File = (token, user) => {

    return fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/uploadDeleteFile`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: user,
      }
    )
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  export const s3BatchDelete = (token, batchDelete) => {

    return fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/batchDelete`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: batchDelete,
      }
    )
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };
  

  export const postMail = (emailData) => {
    return fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/contactform`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      }
    )
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };
  