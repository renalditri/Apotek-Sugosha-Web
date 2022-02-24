import React, { useEffect, useRef } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import {
  Categories,
  Profile,
  Resep,
  Category,
  ProductDetail,
  Cart,
  Home,
  Product,
  Checkout,
  StatusTransaksi,
  DetailTransaksi,
  Login,
  Daftar,
  Logout
} from "./pages";
import { Header, Footer, PrivateRoute } from './components';
import NestingExample from "./example";

function App() {
  const myRef = useRef(1);
  const scrollTop = () => myRef.current.scrollIntoView();
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/logout" component={Logout} />
        <PrivateRoute path="/checkout" component={withoutNavbar} />
        <Route component={withNavbar} />
      </Switch>
    </Router>
  );

  function withNavbar() {
    return (
      <>
        <Header />
        <div ref={myRef} className="bodyContainer">
          <ScrollToTop />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/daftar" component={Daftar} />
          <Route
            exact
            path={`/kategori/:kategoriID/:productID`}
            component={ProductDetail}
          />
          <Route exact path={`/produk/:productID`} component={ProductDetail} />
          <Route exact path={`/kategori/:kategoriID`} component={Category} />
          <Route exact path="/kategori" component={Categories} />
          <Route exact path="/produk" component={Product} />
          <PrivateRoute exact path="/profil" component={Profile} />
          <PrivateRoute exact path="/resep" component={Resep} />
          <Route exact path="/example" component={NestingExample} />
          <PrivateRoute exact path="/cart" component={Cart} />
          <PrivateRoute exact path="/status" component={StatusTransaksi} />
          <PrivateRoute exact path={`/status/:statusID`} component={DetailTransaksi} />
          <Footer />
        </div>
      </>
    );
  }

  function withoutNavbar() {
    return (
      <>
        <div ref={myRef} className="checkoutContainer">
          <ScrollToTop />
          <Route exact path="/checkout" component={Checkout} />
          <Route path="/checkout/:nomorTR" component={Checkout} />
          <Footer />
        </div>
      </>
    );
  }

  function ScrollToTop() {
    const history = useHistory();
    useEffect(() => {
      const unlisten = history.listen(() => {
        window.scrollTo(0, 0);
      });
      return () => {
        unlisten();
      };
    }, []);
    return null;
  }
}
export default App;
