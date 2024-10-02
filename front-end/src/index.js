import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Globalstyle from './globalstyle';
import 'react-toastify/dist/ReactToastify.css';
import store from './redux/strore';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <Globalstyle>
            <Router>
                <App />
            </Router>
        </Globalstyle>
    </Provider>,
    // </React.StrictMode>,
);

reportWebVitals();
