import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./routes/auth/auth.component";
import Category from "./routes/category/category.component";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Product from "./routes/product/product.component";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<Auth/>}/>
          <Route path="/categories/:id" element={<Category />} />
          <Route path="/products/:id" element={<Product/>}/>
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
