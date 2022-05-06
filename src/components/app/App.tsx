import React from 'react';
// if it will be deployed on the server, change the hashroute on the browser route
import { HashRouter as Router } from 'react-router-dom';
import ThemeProvider from '../../store/theme';
import { StoreProvider } from '../../store';
import LayoutDefault from '../../layouts/LayoutDefault';
import Toastr from '../styled/Toastr';
import { Routers } from '../../router/Routers';

function App() {
    return (
        <Router>
            <StoreProvider>
                <ThemeProvider>
                    <LayoutDefault>
                        <Routers />
                    </LayoutDefault>
                    <Toastr
                        position="top-right"
                        autoClose={4000}
                        hideProgressBar={true}
                        closeOnClick
                        pauseOnHover={false}
                        draggable={false}
                    />
                </ThemeProvider>
            </StoreProvider>
        </Router>
    );
}

export default App;
