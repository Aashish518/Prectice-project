import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./App.css";
import App from './reactpre1/App';
// import Prectice from './localCRUD/Prectice';
// import Appcode from './sqlCRUD/Appcode';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
    {/* <Prectice/> */}
    {/* <Appcode/> */}
  </StrictMode>,
)

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import App from "./apireduxtan/App";
// import store from "./apireduxtan/store";

// const queryClient = new QueryClient();
// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <Provider store={store}>
//     <QueryClientProvider client={queryClient}>
//       <App />
//     </QueryClientProvider>
//   </Provider>
// );

// main.jsx
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { Provider } from 'react-redux'
// import store from './redux prectice/store/store'
// import App from './redux prectice/App'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// )



// import React from "react";
// import ReactDOM from "react-dom/client";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import App from "./tanstack prectice/App";

// const queryClient = new QueryClient();

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <App />
//     </QueryClientProvider>
//   </React.StrictMode>
// );

