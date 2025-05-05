import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ComposePage from './pages/ComposePage';
import FollowUpPage from './pages/FollowUpPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
        <Route path="/compose" element={<DashboardLayout><ComposePage /></DashboardLayout>} />
        <Route path="/follow-ups" element={<DashboardLayout><FollowUpPage /></DashboardLayout>} />
        <Route path="/analytics" element={<DashboardLayout><AnalyticsPage /></DashboardLayout>} />
        <Route path="/settings" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
