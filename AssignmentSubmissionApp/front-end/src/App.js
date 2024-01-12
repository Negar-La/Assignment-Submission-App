import "./App.css";

function App() {
  console.log("hi");

  const reqbody = {
    username: "ab",
    password: "abc",
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
      const authValue = headers.get("authorization");
      console.log(authValue);
      console.log(body);
    });

  // .then((responce) => responce.json())
  // .then((data) => console.log(data));

  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
