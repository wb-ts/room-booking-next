import Head from "next/head";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Layout.module.scss";
import { MetaData } from "@components/componentsIndex";
const Layout = ({ children, title }) => {
  return (
    <div>
      <MetaData title={title} />
      <Header />
      <ToastContainer position="top-center" draggable />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
