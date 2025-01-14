import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import Loading from './components/user/Loading/Loading';
const App = lazy(() => import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={Loading}>
      <App />
    </Suspense>
  </React.StrictMode>
);