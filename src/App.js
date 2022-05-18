import React from "react";
import HomeScreen from "./screens/HomeScreen";
import ApplicationScreen from "./screens/ApplicationScreen";
import TrackApplicationScreen from "./screens/TrackApplicationScreen";
import AdminLoginScreen from "./screens/AdminLoginScreen";
import AdminDashboardScreen from "./screens/AdminDashboardScreen";
import AdminForgotPasswordScreen from "./screens/AdminForgotPasswordScreen";
import AdminChangePasswordScreen from "./screens/AdminChangePasswordScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
import ModelListingScreen from "./screens/ModelListingScreen";
import FaqScreen from "./screens/FaqScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import PrintApplicationSummary from "./screens/PrintApplicationSummary";

import { BrowserRouter as Router, Route } from "react-router-dom";

import UserForm from "./components/admin_forms/UserForm";
import AdminScreen from "./screens/AdminScreen";
  
function App() {
  return (
    <Router>
      <Route path="/" component={HomeScreen} exact />
      <Route path="/application" component={ApplicationScreen} exact />
      <Route path="/track" component={TrackApplicationScreen} exact />
      <Route path="/track/:ctrl_no" component={TrackApplicationScreen} exact />
      <Route path="/admin" component={AdminLoginScreen} exact />
      <Route path="/forgot" component={AdminForgotPasswordScreen} exact />
      <Route path="/change" component={AdminChangePasswordScreen} exact />
      <Route path="/email-change/:creds" component={ChangePasswordScreen} />
      <Route path="/changepass" component={ResetPasswordScreen} />
      <Route path="/dashboard" component={AdminScreen} exact />
      <Route
        path="/printapplication"
        component={PrintApplicationSummary}
        exact
      />
      <Route path="/model-listing" component={ModelListingScreen} exact />
      <Route path="/faq" component={FaqScreen} exact />
      <Route path="/register" component={UserForm} />
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
