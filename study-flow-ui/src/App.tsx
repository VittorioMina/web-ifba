import './App.css';
import Navbar from './components/navbar';
import Home from './pages/home';

function App() {
    return (
        <div className="App">
            <div className='page-layout'>
                <div className="page-content">
                    <Navbar />
                    <Home />
                </div>
                <footer>
                    <div className="copyright">&copy; 2024 - Developed By Vittorio Kevin</div>
                </footer>
            </div>
        </div>
    )
}

export default App;
