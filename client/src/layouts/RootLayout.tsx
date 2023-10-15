import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export function RootLayout() {
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
