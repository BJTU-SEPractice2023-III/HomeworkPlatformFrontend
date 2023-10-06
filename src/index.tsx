import 'uno.css';
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import { Routes, Route, A } from '@solidjs/router';
import Main from './pages/main/Main';
import Courses from './pages/main/Courses';
import Course from './pages/main/Course';
import Login from './pages/Login';
import Register from './pages/Register';
import MainWrapper from './pages/main/MainWrapper';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

// 检验登录，若 localStorage 中无 jwt 则跳转到 login
export function LoginData({ params, location, navigate, data }) {
  const jwt = localStorage.getItem("homework-platform-jwt");
  if (!jwt) {
    navigate('/login')
  }
}

// TODO: add alert stack gor global usage
render(() => (
  <Router>
    <Routes>
      {/* /login 和 /register 不要求登录 */}
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      {/* 其他路径需要登录，通过 LoginData 检验 localStorage 是否存在 jwt */}
      <Route path="/" component={MainWrapper} data={LoginData}>
        {/* 主页 */}
        <Route path="/" component={Main} />
        {/* 课程列表页面 */}
        <Route path="/courses" component={Courses} />
        {/* 具体课程页面，根据传入的 id 获取课程数据渲染 */}
        <Route path="/courses/:id" component={Course} />
      </Route>
    </Routes>
  </Router>
), root!);
