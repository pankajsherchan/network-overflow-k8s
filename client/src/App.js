import { ThemeProvider } from '@material-ui/core';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/ui/footer/Footer';
import Header from './components/ui/header/Header';
import theme from './components/ui/Theme';
import Events from './views/events/Events';
import ForgotPassword from './views/forgot-password/ForgotPassword';
import Home from './views/home/Home';
import Jobs from './views/jobs/Jobs';
import Roommates from './views/roommates/Roommates';
import SignIn from './views/signin/SignIn';
import SignUp from './views/signup/SignUp';

const App = () => {
  const [selectedServiceRouteIndex, setSelectedServiceRouteIndex] = useState(0);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header
          selectedRouteIndex={selectedRouteIndex}
          setSelectedRouteIndex={setSelectedRouteIndex}
          selectedServiceRouteIndex={selectedServiceRouteIndex}
          setSelectedServiceRouteIndex={setSelectedServiceRouteIndex}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/services"
            component={() => <div> services </div>}
          />
          <Route exact path="/jobs" component={Jobs} />
          <Route exact path="/events" component={Events} />
          <Route exact path="/roommates" component={Roommates} />
          <Route exact path="/about" component={() => <div> about </div>} />
          <Route exact path="/contact" component={() => <div> contact </div>} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/roommates" component={Roommates} />
          <Route exact path="/jobs" component={Jobs} />
          <Route exact path="/events" component={Events} />
        </Switch>
        <Footer
          selectedRouteIndex={selectedRouteIndex}
          setSelectedRouteIndex={setSelectedRouteIndex}
          selectedServiceRouteIndex={selectedServiceRouteIndex}
          setSelectedServiceRouteIndex={setSelectedServiceRouteIndex}
        />
      </Router>
    </ThemeProvider>
  );
};

export default App;
