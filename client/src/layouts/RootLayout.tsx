import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function RootLayout() {
  return (
    <>
      <header className="bg-white">
        <NavBar />
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
