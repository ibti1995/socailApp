import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './styles.scss';
import App from './app/app';
import { BrowserRouter as Router } from 'react-router-dom';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Router>  <App /></Router>
  
  </StrictMode>
);
