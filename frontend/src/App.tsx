import { Outlet } from "react-router-dom";
import { HomeScreen } from "./screens";
import { Container, Navbar } from "./components";

export const App = () => {
  return (
    <>
      {/* header and footer */}
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};
