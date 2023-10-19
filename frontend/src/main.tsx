import React from 'react'
import ReactDOM from 'react-dom/client'

import {Provider} from 'react-redux'
import store, { persistor } from './store'
import {AuthMiddleware} from './context/AuthMiddleware.tsx'
import {ThemeProvider} from './context/ThemeProvider.tsx'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import App from './App.tsx'
import Home from './pages/Home/index.tsx'
import Login from './pages/Login/index.tsx'
import Page404 from './pages/Page404'
import Profile from './pages/Profile/index.tsx'
import Logon from './pages/Logon/index.tsx'
import Students from './pages/Students/index.tsx'
import {Toaster} from 'react-hot-toast'

import { PersistGate } from 'redux-persist/integration/react'

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {path: "/", element: <Home />},
      {path: "/login", element: (<AuthMiddleware> <Login /> </AuthMiddleware>)},
      {path: "/logon", element: <Logon />},
      {path: "/students", element: <Students />},
      {path: "*", element: <Page404 />},
      {path: "/profile", element: (<AuthMiddleware> <Profile /> </AuthMiddleware>)}
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster position='top-center' />
      </ThemeProvider>
    </PersistGate>
    </Provider>
  </React.StrictMode>,
)
