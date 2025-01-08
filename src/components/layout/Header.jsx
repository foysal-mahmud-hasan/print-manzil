import React from "react";
import { useNavigate } from "react-router";
import classes from "./Header.module.css";
import { Box } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

export default function Header() {
  const navigate = useNavigate();
  const { height, width } = useViewportSize();
  const headerHeight = height - height * 0.95;
  return (
    <Box h={headerHeight}>
      <header style={{ width: "100%" }}>
        <ul>
          <li>
            <a className="active" onClick={() => navigate("table/")}>
              Table
            </a>
          </li>
          <li>
            <a onClick={() => navigate("image-picker/")}>Image Picker</a>
          </li>
        </ul>
      </header>
    </Box>
  );
}
