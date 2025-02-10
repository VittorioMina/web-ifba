// AppRoutes.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import ProductsManagement from './pages/products-management';

function AppRoutes() {
    return (
        <Router>
            {/* Navbar fica visível em todas as páginas */}
            <div className="app">
                <div className='page-layout'>
                    <div className='page-content'>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/register" element={<ProductsManagement />} />
                        </Routes>
                    </div>
                    <footer>
                        <div className="copyright">&copy; 2024 - Developed By Vittorio Kevin</div>
                    </footer>
                </div>
            </div>
        </Router>
    )
}

export default AppRoutes;
