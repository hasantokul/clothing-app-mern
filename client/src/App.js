import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/cart/cart.component";
import Auth from "./routes/auth/auth.component";
import Category from "./routes/category/category.component";
import Checkout from "./routes/checkout/checkout.component";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Product from "./routes/product/product.component";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="/" element={<Cart />}>
            <Route index element={<Home />} />
            <Route path="auth" element={<Auth/>}/>
            <Route path="/categories/:id" element={<Category />} />
            <Route path="/products/:pid" element={<Product/>}/>
            <Route path="checkout" element={<Checkout/>}/>
          </Route>
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
