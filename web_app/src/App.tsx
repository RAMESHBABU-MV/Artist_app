import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/Users';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthService } from './services/AuthService';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from './components/common/Toast';

const queryClient = new QueryClient();


const PrivateRoute = ({ children }: { children: React.ReactNode }) => {

  const user = AuthService.getCurrentUser();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="artists" element={<div className="text-gradient"><h1>Artist Directory</h1><p>Find and connect with fellow creators.</p></div>} />
              <Route path="services" element={<div className="text-gradient"><h1>Your Services</h1><p>Manage your professional offerings.</p></div>} />
              <Route path="bookings" element={<div className="text-gradient"><h1>Manage Bookings</h1><p>Track your upcoming appointments.</p></div>} />
              <Route path="reviews" element={<div className="text-gradient"><h1>Reviews & Ratings</h1><p>See what clients are saying about you.</p></div>} />
              <Route path="settings" element={<div className="text-gradient"><h1>Account Settings</h1><p>Update your profile and preferences.</p></div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  );
}


export default App;
