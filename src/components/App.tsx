import { Route, Routes } from "react-router-dom";
import { SharedLayout } from "./SharedLayout";
import HomePage from "../pages/HomePage";
import CatalogPage from "../pages/CatalogPage";
import TransactionsPage from "../pages/TransactionsPage";
import NotFoundPage from "../pages/NotFoundPage";
import BrandsPage from "../pages/BrandsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="brands" element={<BrandsPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
