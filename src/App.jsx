import { useNavigate } from "react-router";
import "./App.css";
import { useEffect } from "react";

function App() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // });

  return (
    <>
      <h1>{import.meta.env.VITE_REACT_APP_NAME}</h1>
    </>
  );
}

export default App;
