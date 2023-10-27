import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/home",
    element: <div>welcome Home!</div>,
  },
]);

const Navigationcomponent = () => {
  <RouterProvider router={router} />;
};
export default Navigationcomponent;
