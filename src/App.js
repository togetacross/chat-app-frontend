import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/error/not-found.page';
import UnauthorizedPage from './pages/error/unauthorized.page';
import RegistrationPage from './pages/authorization/registration';
import LoginPage from './pages/authorization/login';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './models/role';
import Layout from './layout/Layout';
import WebSocketProvider from './context/WebSocket';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Admin from './pages/admin/Admin';

function App() {
  return (
    <ProSidebarProvider>

      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registration' element={<RegistrationPage />} />

        <Route path='/' element={
          <AuthGuard roles={[Role.ADMIN, Role.USER]}>
            <WebSocketProvider>
              <Layout />
            </WebSocketProvider>
          </AuthGuard>
        }
        />

        <Route path='/admin' element={
          <AuthGuard roles={[Role.ADMIN]}>
              <Admin/>
          </AuthGuard>
        }
        />

        <Route path='/404' element={<NotFoundPage />} />
        <Route path='/401' element={<UnauthorizedPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes >
    </ProSidebarProvider>
  );
}

export default App;
