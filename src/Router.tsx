import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Shows } from "./Shows";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/:brand_id",
        element: <Shows />,
      },
    ],
  },
]);
