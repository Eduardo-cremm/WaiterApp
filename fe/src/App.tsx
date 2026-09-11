import { GlobalStyles } from './styles/GlobalStyles';
import {Header} from './components/Header/index';
import {Orders} from './components/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';


export function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Orders />
      <ToastContainer
        position='bottom-center'
      />

    </>
  );
}
