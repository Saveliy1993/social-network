import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/reduxStore'
import { Provider } from 'react-redux'


ReactDOM.render(
    <MainApp />
    , document.getElementById('root')
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();





