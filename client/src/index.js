import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from './Redux/store/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor} >
                    <App />
            </PersistGate>
        </Provider>
    </BrowserRouter>
);