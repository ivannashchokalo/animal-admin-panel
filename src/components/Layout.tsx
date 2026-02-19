import { Outlet } from "react-router";
import Header from "./Header/Header";
import { fetchAnimals } from "../services/animalsService";

export default function Layout() {
  fetchAnimals();
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
