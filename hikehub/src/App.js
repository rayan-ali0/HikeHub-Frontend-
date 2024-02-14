import './App.css';
import Router from './Routes/Route';
import { ToastContainer } from 'react-toastify';
import './App.css'
import axios from 'axios';

function App() {
  axios.defaults.withCredentials = true;
  return (
    <>
    <ToastContainer     
      position="top-center"
      autoClose={3000}
      limit={2}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme="light"/>
      <Router />
    </>
  );
}

export default App;
