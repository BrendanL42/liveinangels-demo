import { React, useEffect } from "react";
import Form from "../../components/client/index";

export const getServerSideProps = async function ({ req, res }) {
  const token = req.cookies.clientToken;
  const id = req.cookies.id;

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { id, token },
  };
};

const form = ({ id, token }) => {
  return (
    <form noValidate>
      <Form userId={id} token={token} />
    </form>
  );
};

export default form;
