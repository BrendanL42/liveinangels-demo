import React from "react";
import Form from "../components/formCarer/index";

export const getServerSideProps = async function ({ req, res }) {

  let token = req.cookies.carerFormToken
  let id = req.cookies.id

  if (!token && !id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {id, token},
  }
}



const form = ({id, token}) => {

  return (
    <form noValidate>
    <Form userID={id} token={token}/>
    </form>
  );
};

export default form;
