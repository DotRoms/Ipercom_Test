import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Footer } from './components/render/Footer/Footer';
import { Header } from "./components/render/Header/Index";
import { AuthModalProvider } from './context/ModalContext';
import { HomePage } from './pages/HomePage';
function App() {

    return (
      <AuthModalProvider>

      <Router>
      <Header />
      
      <Routes>
        
        <Route path="/" element={<HomePage />} />
  
      </Routes>
      <Footer />
    </Router>
      </AuthModalProvider>
    );
}

export default App;
