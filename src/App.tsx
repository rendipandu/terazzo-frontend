import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routeLists, componentMaps } from './routes'; // Adjust the path as necessary
import Sidebar from './components/molecules/Sidebar/Sidebar';
import { useAuth } from './data/auth/store';
import { Toast } from './components/atoms/toast/Toast';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  const { isLogin } = useAuth();
  return (
    <BrowserRouter basename='/'>
      <div className='terazzo'>
        <div className='terazzo_container'>
          {isLogin && <Sidebar />}
          <div className='terazzo_body'>
            <Routes>
              {routeLists
                .filter((list) => list.component) // Ensure the route has a valid component
                .map((list, index) => {
                  const Component = componentMaps[list.component!]; // Map string to actual component
                  return (
                    <Route
                      key={`${list.id}-${index}`}
                      path={list.path}
                      element={<Component />}
                    />
                  );
                })}
            </Routes>
          </div>
        </div>
      </div>
      <Toast />
    </BrowserRouter>
  );
};

export default App;