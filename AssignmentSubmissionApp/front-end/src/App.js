import { useEffect } from "react";
import "./App.css";
import { useLocalStrorage } from "./util/useLocalStorage";

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
    <div className="App">
      <h1>Hello World</h1>
      <h2>The value of JWT is {jwt} </h2>
    </div>
  );
}

export default App;
