import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import CustomerDashboard from './pages/customer/Dashboard';
import DelivererDashboard from './pages/deliverer/Dashboard';
import ManagerDashboard from './pages/manager/Dashboard';
import RoleSelection from './components/RoleSelection';
import PaymentHistory from './pages/customer/PaymentHistory';
import Subscriptions from './pages/customer/Subscriptions';
import Bills from './pages/customer/Bills';
import Settings from './pages/customer/Settings';
import Profile from './pages/customer/Profile';
import DelivererRoutes from './pages/deliverer/Routes';
import Schedule from './pages/deliverer/Schedules';
import Earnings from './pages/deliverer/Earnings';
import DelivererSettings from './pages/deliverer/DelivererSettings';
import Customers from './pages/manager/Customers';
import Deliverers from './pages/manager/Deliverers';
import { ManagerBills } from './pages/manager/Bills';
import { Reports } from './pages/manager/Reports';
import { Publications } from './pages/manager/Publications';
import { ManagerSettings } from './pages/manager/ManagerSettings';





const queryClient = new QueryClient();



function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<RoleSelection />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path='/profile' element={<Profile />} />

            {/* Protected Routes */}
            <Route
              path="/customer/*"
              element={
                <ProtectedRoute allowedRoles={['Customer']}>
                  <Routes>
                    <Route path="/" element={<CustomerDashboard />} />
                    <Route path="payments" element={<PaymentHistory />} />
                    <Route path="subscriptions" element={<Subscriptions/>} />
                    <Route path="bills" element={<Bills/>} />
                    <Route path="settings" element={<Settings/>}/>
                  </Routes>
                </ProtectedRoute>
              }
            />
            <Route
              path="/deliverer/*"
              element={
                <ProtectedRoute allowedRoles={['Deliverer']}>
                   <Routes>
                  <Route path="/" element={<DelivererDashboard />} />
                  <Route path="route" element={<DelivererRoutes />} />
                  <Route path="schedule" element={<Schedule />} />
                  <Route path="earnings" element={<Earnings/>} />
                  <Route path="settings" element={<DelivererSettings/>}/>
                  </Routes>
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager/*"
              element={
                <ProtectedRoute allowedRoles={['Manager']}>
                   <Routes>
                   <Route path="/" element={<ManagerDashboard />} />
                    <Route path="settings" element={<ManagerSettings />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="deliverers" element={<Deliverers />} />
                    <Route path="Bills" element={<ManagerBills/>} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="publications" element={<Publications />} />
                  </Routes>
                </ProtectedRoute>
              }
            />

            {/* Default Route */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
          <Toaster position="top-right" />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;