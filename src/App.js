import React, { Fragment } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListTable from './Components/ListTable';
const App = () => {


  return (
   <Fragment>   
   <ToastContainer />
     <ListTable />
   </Fragment>
  );
}

export default App;
