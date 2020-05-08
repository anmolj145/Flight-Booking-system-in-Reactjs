import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './Component/Header/Header';

import Login from './Component/Login/Login';
import { Booking } from './Component/Booking/Booking';
import ShowBooking from './Component/ShowBooking/ShowBooking';
import { Registration } from './Component/Registration/Registration';
import ShowTicket from './Component/ShowTicket/ShowTicket';

import Footer from './Component/Footer/Footer';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/registration" exact component={Registration} />
        <Route path="/showbooking" exact component={ShowBooking} />
        <Route path="/" exact component={Booking} />
        <Route path="/booking" exact component={Booking} />
        <Route path="/showticket" exact component={ShowTicket} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;