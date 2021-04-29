import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import { Categories, Profile, Resep, Category, ProductDetail, Cart, Home, Product, Checkout, StatusTransaksi } from './pages';
import Header from './components/Header';
import Footer from './components/Footer';
import NestingExample from './example';

function App() {
  const myRef = useRef(1);
  const scrollTop = () => myRef.current.scrollIntoView();
  return (
    <Router>
      <Switch>
        <Route exact path="/checkout" component={withoutNavbar} />
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
          <Route exact path='/' component={Home} />
          <Route exact path={`/kategori/:kategoriID/:productID`} component={ProductDetail} />
          <Route exact path={`/produk/:productID`} component={ProductDetail} />
          <Route exact path={`/kategori/:kategoriID`} component={Category} />
          <Route exact path='/kategori' component={Categories} />
          <Route exact path='/produk' component={Product} />
          <Route exact path='/profil' component={Profile} />
          <Route exact path='/resep' component={Resep} />
          <Route exact path='/example' component={NestingExample} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/status' component={StatusTransaksi} />
          <Footer />
        </div>
      </>
    )
  }

  function withoutNavbar() {
    return (
      <>
        <div ref={myRef} className="checkoutContainer">
          <Route path='/checkout' component={Checkout} />
          <Footer />
        </div>
      </>
    )
  }

  function ScrollToTop() {
    const history = useHistory();
    useEffect(() => {
      const unlisten = history.listen(() => {
        scrollTop();
      });
      return () => {
        unlisten();
      }
    }, [])
    return null;
  }
}
export default App;
