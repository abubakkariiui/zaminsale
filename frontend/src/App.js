import "./App.css";
import React, { useEffect } from "react";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Services from "./components/services/Services";
import Contact from "./components/contact/Contact";
import Footer from "./components/common/footer/Footer";
// import Pricing from "./components/pricing/Pricing";
import AddProperty from "./components/AddProperty";
import ShowProperty from "./components/ShowProperty";
import Detaill from "./components/Detaill";
import UpdateProperty from "./components/UpdateProperty";
import Search from "./Search";
import MyProperty from "./components/MyProperty";
import AdminRegister from "./components/Admin/AdminRegister";
// import AdminPrivate from "./components/AdminPrivate";
import AdminLogin from "./components/Admin/AdminLogin";
import Dasboard from "./components/Admin/Dasboard";
import AdminViewProperty from "./components/Admin/AdminViewProperty";
import AddPropertyAdmin from "./components/Admin/AddPropertyAdmin";
import AdminUpdate from "./components/Admin/AdminUpdate";
import ForgetPassword from "./components/Login/ForgetPassword";
import NewPassword from "./components/Login/NewPassword";
import StripeContainer from "./components/Stripe/StripeContainer";

function App() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });

  // console.log(JSON.parse(localStorage.getItem("user")).role);
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<About />} />
            <Route path="/properties" element={<Services />} />
            {/* <Route exact path="/pricing" component={<Pricing />} /> */}
            <Route path="/contactus" element={<Contact />} />
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/properties/:type" element={<ShowProperty />} />
            <Route path="/logout" element={<h1>Logout</h1>} />
            <Route path="/show-property/:title" element={<Detaill />} />
            <Route path="/search" element={<Search />} />
            <Route path="/update-property" element={<UpdateProperty />} />
            <Route path="/my-properties" element={<MyProperty />} />
            <Route path="/pay-now" element={<StripeContainer />} />
          </Route>
          {localStorage.getItem("user") &&
            JSON.parse(localStorage.getItem("user"))?.role === "admin" && (
              <>
                <Route path="/dashboard" element={<Dasboard />} />
                <Route
                  path="/add-propert-admin"
                  element={<AddPropertyAdmin />}
                />
                <Route
                  path="/view-property-admin/:title"
                  element={<AdminViewProperty />}
                />
                <Route path="/my-properties" element={<MyProperty />} />
                <Route
                  path="/update-property-admin"
                  element={<AdminUpdate />}
                />
              </>
            )}

          <Route path="/admin-register" element={<AdminRegister />} />
          {/* <Route path="/admin-login" element={<AdminLogin />} /> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<NewPassword />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
