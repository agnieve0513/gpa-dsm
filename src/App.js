import { BrowserRouter as Router, Route } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen'
import ApplicationScreen from './screens/ApplicationScreen'
import TrackApplicationScreen from './screens/TrackApplicationScreen'
import AdminLoginScreen from './screens/AdminLoginScreen'
import AdminDashboardScreen from './screens/AdminDashboardScreen'
import AdminForgotPasswordScreen from './screens/AdminForgotPasswordScreen'
import AdminChangePasswordScreen from './screens/AdminChangePasswordScreen'


import UserForm from './components/admin_forms/UserForm'

function App() {
  return (
    <Router>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/application' component={ApplicationScreen} exact />
          <Route path='/track' component={TrackApplicationScreen} exact />

          <Route path='/admin' component={AdminLoginScreen} exact />
          <Route path='/forgot' component={AdminForgotPasswordScreen} exact />
          <Route path='/change' component={AdminChangePasswordScreen} exact />
          <Route path='/dashboard' component={AdminDashboardScreen} exact />
          
          <Route path='/register' component={UserForm} />
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
