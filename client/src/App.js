import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Category from "./routes/category/category.component";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="/categories/:id" element={<Category />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
