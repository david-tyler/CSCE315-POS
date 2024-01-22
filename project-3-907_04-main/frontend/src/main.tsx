import { StrictMode, useEffect } from 'react';
import ReactDOM from 'react-dom/client'
import { Server } from './components/Server.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './Auth.tsx'
import Customer from './Customer.tsx'
import SignIn from './LoginPage.tsx'
import { LandingPage } from './LandingPage.tsx'
import { Manager } from './Manager.tsx';
import { Unauthorized } from './Unauthorized.tsx'
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import { Admin } from './Admin.tsx';


/**
 * Component that adds a Google Translate script to the page and renders a translation element.
 * @param props - The component props.
 * @returns The rendered component.
 */
export const AddTranslateScript = (props: any) => {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement({ pageLanguage: 'en', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE, }, 'google_translate_element')
  }

  useEffect(() => {
    var addScript = document.createElement('script');
    addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, [])

  return (<div>
    <div id="google_translate_element" style={{
      zIndex: '999',
      position: 'absolute',
      top: '20px',
      left: '20px',
    }}></div>
    {props.children}
  </div>);
}

/**
 * Defines the router configuration for the application.
 * Each route is associated with a specific path and element/component.
 * @returns {Array<RouteConfig>} The array of route configurations.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AddTranslateScript><LandingPage /> </AddTranslateScript>,
  },
  {
    path: '/customer',
    element: <Customer />,
  },
  {
    path: '/server',
    element: <ProtectedRoute element={<Server />} auths={['ROLE_admin', 'ROLE_manager', 'ROLE_server']} />,
  },
  {
    path: '/manager',
    element: <ProtectedRoute element={<Manager />} auths={['ROLE_admin', 'ROLE_manager']} />,
  },
  {
    path: '/admin',
    element: <ProtectedRoute element={<Admin />} auths={['ROLE_admin']} />,
  },
  {
    path: '/login',
    element: <SignIn />,
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="92522781514-n0k71ngp0e7efn0tptb2cp4p6ktgmbje.apps.googleusercontent.com">
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </GoogleOAuthProvider>
)
