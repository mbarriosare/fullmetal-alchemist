
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "./AuthProviderJWT";
import { ProtectedRoute } from "./ProtectedRouteJWT";
import Login from "./LogInJWT";
import Logout from "./LogOutJWT";
import HomePage from "./HomePageJWT";
import UserHomePage from "./UserHomePageJWT";
import UserProfile from "./UserProfile";

const Routes = () => {
  const { token } = useAuth();

  const routesPublic = [
    { path: "/service", element: <div>Pagina De Servicio.</div> },
    { path: "/about-us", element: <div>Acerca De Nosotros.</div> },
  ];

  const routesNotAuth = [
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <Login /> },
  ];

  const routesAuthOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        { path: "/", element: <UserHomePage /> },
        { path: "/profile", element: <UserProfile /> },
        { path: "/logout", element: <Logout /> },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...routesPublic,
    ...(token ? routesAuthOnly : routesNotAuth),
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
