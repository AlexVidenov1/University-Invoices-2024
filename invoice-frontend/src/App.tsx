import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import OverallCustomer from "./pages/Customer/OverallCustomer";
import OverallInvoice from "./pages/Invoice/OverallInvoice";
import RootLayout from "./layout/RootLayout";
import NotFound from "./NotFound";
import SingleCustomer from "./pages/Customer/SingleCustomer";
import SingleInvoice from "./pages/Invoice/SingleInvoice";
import Error from "./Error";
import Home from "./Home";
import OverdueInvoice from "./pages/Invoice/OverdueInvoice";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index path="/" element={<Home />} />
        <Route path="customers" element={<OverallCustomer />} />
        <Route
          path="customers/:id"
          element={<SingleCustomer />}
          errorElement={<Error />}
        />
        <Route path="invoices" element={<OverallInvoice />} />
        <Route
          path="invoices/:id"
          element={<SingleInvoice />}
          errorElement={<Error />}
        />
        <Route path="overdueInvoices" element={<OverdueInvoice />} />
        <Route path="*" element={<NotFound />} />
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
