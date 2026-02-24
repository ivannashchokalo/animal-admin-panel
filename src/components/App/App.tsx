import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "../Layout";
import Home from "../../pages/Home/Home";
import Animals from "../../pages/Animals/Animals";
import AnimalDetailes from "../../pages/AnimalDetailes/AnimalDetailes";
import Request from "../../pages/Requests/Request";
import Settings from "../../pages/Settings/Settings";
import CreateNewAnimal from "../../pages/CreateNewAnimal/CreateNewAnimal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="animals" element={<Animals />} />
          <Route path="animals/:id" element={<AnimalDetailes />} />
          <Route path="animals/new" element={<CreateNewAnimal />} />
          <Route path="requests" element={<Request />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
