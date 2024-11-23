import { useState } from "react";
import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import OverallCustomer from "./pages/Customer/OverallCustomer";
import OverallInvoice from "./pages/Invoice/OverallInvoice";
import RootLayout from "./layout/RootLayout";

function App() {
  const [count, setCount] = useState(0);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="customers" element={<OverallCustomer />} />
        <Route path="invoices" element={<OverallInvoice />} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
