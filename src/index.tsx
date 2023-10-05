import 'uno.css';
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import { Routes, Route, A } from '@solidjs/router';
import Courses from './pages/Courses';
import Login from './pages/Login';
import Register from './pages/Register';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

function LoginData({params, location, navigate, data}) {
    const jwt = localStorage.getItem("homework-platform-jwt");
    if (!jwt) {
        navigate('/login')
    }
}

// TODO: add alert stack gor global usage
render(() => (
  <Router>
    <Routes>
      <Route path="/courses/:id" component={Courses} data={LoginData}/>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Routes>
  </Router>
), root!);
