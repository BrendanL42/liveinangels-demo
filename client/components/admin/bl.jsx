import { useEffect } from "react";
import { useRouter } from "next/router";
import useState from "react-usestateref";
const bl = (props) => {
  const [selected, setSelected] = useState("dash");

  const handleNewJob = () => {
    setSelected("jobPost");
  };

  const handleCarers = () => {
    setSelected("carers");
  };

  const handleClients = () => {
    setSelected("clients");
  };

  const handleDash = () => {
    setSelected("dash");
  };

  const handleBlog = () => {
    setSelected("blog");
  };

  return {
    handleNewJob,
    selected,
    handleCarers,
    handleClients,
    handleDash,
    handleBlog,
  };
};

export default bl;
