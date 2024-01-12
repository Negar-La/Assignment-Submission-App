import { useEffect } from "react";
import "./App.css";
import { useLocalStrorage } from "./util/useLocalStorage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Homepage from "./Components/Homepage";

function App() {
  // console.log("hi");
  // const [jwt, setJwt] = useState("");   //replaced by useLocalStrorage
  const [jwt, setJwt] = useLocalStrorage("", "jwt");

  useEffect(() => {
    if (!jwt) {
      const reqbody = {
        username: "arash",
        password: "arash",
      };
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqbody),
      };

      fetch("api/auth/login", requestOptions)
        .then((responce) => Promise.all([responce.json(), responce.headers]))
        .then(([body, headers]) => {
          setJwt(headers.get("authorization"));

          // const jwt = headers.get("authorization"); was replaced by setJwt
          // console.log(jwt);
          // console.log(body);
        });
    }
  }, []);

  useEffect(() => {
    console.log("JWT is " + jwt);
  }, [jwt]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard jwt={jwt} />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
