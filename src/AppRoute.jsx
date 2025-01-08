import { Route, Routes } from "react-router";
import Layout from "./components/layout/Layout";
import TableIndex from "./components/modules/table/TableIndex";
import ImagePickerIndex from "./components/modules/image-picker/ImagePickerIndex";

export default function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/table/">
          <Route path="" element={<TableIndex />} />
        </Route>
        <Route path="/image-picker/">
          <Route path="" element={<ImagePickerIndex />} />
        </Route>
      </Route>
    </Routes>
  );
}
