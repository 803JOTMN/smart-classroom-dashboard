import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import TeacherDashboard from './pages/TeacherDashboard';
import Analytics from './pages/Analytics';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/TeacherDashboard" element={
          <Layout currentPageName="TeacherDashboard">
            <TeacherDashboard />
          </Layout>
        } />
        <Route path="/Analytics" element={
          <Layout currentPageName="Analytics">
            <Analytics />
          </Layout>
        } />
        <Route path="/" element={<Navigate to="/TeacherDashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;