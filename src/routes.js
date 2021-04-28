import React from "react";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
const routes = [
    {
        path: '/',
        exact: true,
        main: ()=> <Home/>
    },
    {
        path: '/product-list',
        exact: false,   
        main: ()=> <Login/>
    },
];

export default routes;