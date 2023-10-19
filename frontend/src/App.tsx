import './App.css';
import { useContext} from 'react';
import GlobalStyles from './styles/GlobalStyles';
import {Outlet} from 'react-router-dom';
import {ThemeContext} from './context/ThemeProvider';
import Header from './components/Header';
import {Toaster} from 'react-hot-toast'



function App() {
  const {colorScheme} = useContext(ThemeContext)
  return (
    <>
      <Header />
      <Toaster position='top-center'/>
      <Outlet />
      <GlobalStyles colors={colorScheme} />
    </>
  );
}

export default App;

