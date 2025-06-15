import { Outlet } from "react-router-dom";
import Header from "../components/app/header/Header";
import Footer from "../components/app/footer/Footer";

const Root = () => {
  return (
    <div className="container">
      <Header />

      <main className="content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Root;
