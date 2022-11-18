import * as React from 'react';

import Home from './pages/Home';
import Locations from './pages/Locations';
import Header from './components/Header';
import Footer from './components/Footer';

import {
    HashRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Product from './pages/Product';
import {useDispatch} from "react-redux";
import AuthActions from "./actions/AuthActions";

export default function App(): JSX.Element{

    const dispatch = useDispatch();
    React.useEffect(()=>{
        const authActions = new AuthActions();
        const auth = localStorage.getItem('auth');
        if(auth !== null)
            dispatch(authActions.set(JSON.parse(auth)));
    }, [])

    return (
        <>
        <Router>
            <Header/>
            <main className="main">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/locations" element={<Locations/>}/>
                    <Route path="/product/:id" element={<Product/>}/>
                </Routes>

            </main>
            <Footer/>
        </Router>
        </>
    )
}