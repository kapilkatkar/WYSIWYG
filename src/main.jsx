import ReactDOM from "react-dom/client";
import "./index.css";
import EditOptionBarComponent from "./Features/1.EditOptions";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <EditOptionBarComponent />,
  },
  {
    path: `/collabrative/:uuid`,
    element: <EditOptionBarComponent />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <RouterProvider router={router} />
  </div>
);
