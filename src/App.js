import React from 'react';
import{ BrowserRouter as Router, Routes, Route, } from "react-router-dom"
import { MDBFooter } from 'mdb-react-ui-kit';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationBar from "./components/Navbar"
import PurchasePage from "./views/purchase/PurchasePage"
import RentPage from "./views/rent/RentPage"
import SalePage from "./views/sale/SalePage"
import AboutPage from "./views/about/AboutPage"
import AccountPage from "./views/account/AccountPage"
import AdsPage from "./views/ads/AdsPage"
import AdvtPage from "./views/advt/advtPage"

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <NavigationBar />
        </div>
        <div>
          <Routes>
              <Route path="/purchase" element={<PurchasePage />} />
              <Route path="/rent" element={<RentPage />} />
              <Route path="/sale" element={<SalePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/ads" element={<AdsPage />} />
              <Route path="/advt" element={<AdvtPage />} />
              <Route path="/" element={<PurchasePage />} />
          </Routes>
        </div>
      </Router>
      <div className="footer">
        <MDBFooter bgColor='dark' className='text-center text-lg-left'>
          <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            <div className='text-light'>
              Lyutak Ivan &copy;{new Date().getFullYear()} {' '}
            </div>
          </div>
        </MDBFooter>
      </div>
    </div>
  );
}

export default App;
