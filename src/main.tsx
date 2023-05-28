import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router";

import { router } from "./Router";
import { CssBaseline, ThemeProvider } from "@mui/joy";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RecoilRoot>
    <ThemeProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </RecoilRoot>
);
