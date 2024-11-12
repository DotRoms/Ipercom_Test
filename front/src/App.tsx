import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Footer } from "./components/render/Footer/Footer";
import { Header } from "./components/render/Header/Index";
import { AuthModalProvider } from "./context/ModalContext";
import { AuthProvider } from "./context/userIsConnected";
import { HomePage } from "./pages/HomePage";
function App() {
    return (
        <AuthProvider>
            <AuthModalProvider>
                <Router>
                    <Header />

                    <Routes>
                        <Route path="/" element={<HomePage />} />
                    </Routes>
                    <Footer />
                </Router>
            </AuthModalProvider>
        </AuthProvider>
    );
}

export default App;
