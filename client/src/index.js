import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"
import { FilterProvider } from './contexts/filter/filter.context';
import { LocationProvider } from './contexts/location/location.context';
import { UserProvider } from './contexts/user/user.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <FilterProvider>
        <LocationProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LocationProvider>
      </FilterProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
