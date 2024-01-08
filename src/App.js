import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationRoutes from './routes/NavigationRoutes';

function App() {
  return (
    <Router>
      <NavigationRoutes />
    </Router>
  );
}

export default App;
