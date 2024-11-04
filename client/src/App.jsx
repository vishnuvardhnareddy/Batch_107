import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import Home from './components/Home';
import About from './components/About';
import SignIn from './components/SignIn';
import Login from './components/Login';
import Navbar from './components/Navbar';
import AddDisease from './components/AddDisease';
import GetDiseaseData from './components/GetDiseaseData'; // Import the new component
import Footer from './components/Footer'; // Import the Footer
import DisplayDiseaseData from './components/DisplayDiseaseData';

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  return user ? children : <Navigate to="/login" replace />;
};

const AppWrapper = () => {
  const navigate = useNavigate();

  return (
    <UserProvider navigate={navigate}>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/postdata" element={<ProtectedRoute><AddDisease /></ProtectedRoute>} />
        <Route path="/getdata" element={<ProtectedRoute><GetDiseaseData /></ProtectedRoute>} /> {/* New route for GetDiseaseData */}
        <Route path="/displayDisease" element={<ProtectedRoute><DisplayDiseaseData /></ProtectedRoute>} />

        <Route path="*" element={<RedirectBasedOnUser />} />
      </Routes>
      <Footer /> {/* Include the Footer here */}
    </UserProvider>
  );
};

const RedirectBasedOnUser = () => {
  const { user } = useUser();
  return <Navigate to={user ? "/home" : "/login"} replace />;
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
