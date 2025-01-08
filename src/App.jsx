import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AppRoute from "./AppRoute";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";
import "./layout.css";

function App() {
  return (
    <MantineProvider>
      <AppRoute />
    </MantineProvider>
  );
}

export default App;
