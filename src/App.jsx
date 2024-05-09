import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { About, CallToAction, Home, ScrollToTop, SuggestionBox } from './pages'
import ECommerce from './pages/Dashboard/Ecommerce'
import Invoice from './components/App'
import AuthContext from './context/auth'
import { Header, Footer, Error } from './pages'
import ThankYou from './pages/ThankYou'
import Cancelled from './pages/Cancelled'
import SignIn from './pages/Authentication/SignIn'
import SignUp from './pages/Authentication/SignUp'
import { store } from './store'
import { Provider } from 'react-redux'
import StateContext, { State } from './context/stateContext'
import Tables from './pages/Tables'
import ProtectedRoutes from './components/ProtectedRoute/ProtectedRoute'
import Plans from './pages/Plans'
import UserDashboard from './pages/Dashboard/UserDashboard'
import UserHistory from './pages/UserHistory'
import Settings from './pages/Settings'
import Profile from './pages/Profile'

export default function App () {
  const user = true

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <State.Provider value={State}>
          <Routes>
            <Route
              path='/'
              element={
                <React.Fragment>
                  {/* <Invoice /> */}
                  {user ? (
                    <>
                      <UserDashboard />
                      {/* <Header />
                      <Invoice /> */}
                    </>
                  ) : (
                    <React.Fragment>
                      <UserDashboard />
                      {/* <Header />
                      <Home />
                      <CallToAction />
                      <Footer /> */}
                    </React.Fragment>
                  )}
                </React.Fragment>
              }
            ></Route>
            <Route path='/about' element={<About />}></Route>
            {/* <Route path="/suggestion-box" element={<SuggestionBox />}></Route> */}
            {/* <Route path="/thank-you" element={<ThankYou />}></Route> */}
            {/* <Route path="/cancelled" element={<Cancelled />}></Route> */}
            <Route path='/' element={<Invoice />}></Route>
            <Route element={<ProtectedRoutes />}>
              <Route path='/admin' element={<ECommerce />} />
              <Route path='/admin/users/tables' element={<Tables />} />
              <Route path='/admin/plans' element={<Plans />} />
              <Route path='/users/dashboard' element={<UserDashboard />} />
              <Route
                path='/users/dashboard/history'
                element={<UserHistory />}
              />
              <Route path='/users/dashboard/profile' element={<Profile />} />
              <Route path='/users/dashboard/settings' element={<Settings />} />
            </Route>
            <Route
              path='/auth/signin'
              element={
                <>
                  <SignIn />
                </>
              }
            />
            <Route
              path='/auth/signup'
              element={
                <>
                  <SignUp />
                </>
              }
            />
          </Routes>
        </State.Provider>
      </BrowserRouter>
    </Provider>
  )
}
