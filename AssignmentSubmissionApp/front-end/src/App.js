import { useEffect } from "react";
import "./App.css";
import { useLocalStrorage } from "./util/useLocalStorage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Homepage from "./Components/Homepage";
import Login from "./Components/Login";
import PrivateRoute from "./Components/PrivateRoute";
import AssignmentView from "./Components/AssignmentView";

function App() {
  // console.log("hi");
  // const [jwt, setJwt] = useState("");   //replaced by useLocalStrorage
  const [jwt, setJwt] = useLocalStrorage("", "jwt");

  useEffect(() => {
    console.log("JWT is " + jwt);
  }, [jwt]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard jwt={jwt} />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="assignments/:id"
          element={
            <PrivateRoute>
              <AssignmentView />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
