import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router";

import { router } from "./Router";
import {
  CssBaseline,
  CssVarsProvider,
  ThemeProvider,
  extendTheme,
} from "@mui/joy";

const theme = extendTheme({
  // colorSchemes: {
  //   light: {
  //     palette: {
  //       primary: {
  //         "50": "#fff3e0",
  //         "100": "#ffe0b2",
  //         "200": "#ffcc80",
  //         "300": "#ffb74d",
  //         "400": "#ffa726",
  //         "500": "#ff9800",
  //         "600": "#fb8c00",
  //         "700": "#f57c00",
  //         "800": "#ef6c00",
  //         "900": "#e65100",
  //       },
  //     },
  //   },
  // },
});
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RecoilRoot>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </CssVarsProvider>
  </RecoilRoot>
);
