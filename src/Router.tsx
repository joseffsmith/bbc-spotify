import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Shows } from "./Shows";
import { supabaseClient } from "./SupabaseClient";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/:brand_id",
        element: <Shows />,
        loader: async ({ params }) => {
          const { data, error } = await supabaseClient
            .from("shows")
            .select("*")
            .eq("brand_id", params.brand_id)
            .order("release_timestamp", { ascending: false });
          if (data) {
            return Array.from(data.values());
          }
          return [];
        },
      },
    ],
  },
]);
