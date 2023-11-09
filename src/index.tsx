import 'uno.css';
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import { Routes, Route, A } from '@solidjs/router';
import Main from './pages/main/Main';
import Courses from './pages/main/Courses';
import Course from './pages/main/course/Course';
import Login from './pages/Login';
import Register from './pages/Register';
import MainWrapper from './pages/main/MainWrapper';
import CourseWrapper from './pages/main/course/CourseWrapper';
import Create from './pages/main/Create';
import { LoginInfoStore, UserCoursesStore } from './lib/store';
import CreateHomework from './pages/main/course/CreateHomework';
import Homework from './pages/main/course/Homework';
import Homeworks from './pages/main/course/Homeworks';
import Students from './pages/main/course/Students';
import { getCourse } from './lib/course';
import { createResource } from 'solid-js';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

const { jwt } = LoginInfoStore()

// 检验登录，若 localStorage 中无 jwt 则跳转到 login
export function LoginData({ params, location, navigate, data }) {
  // console.log("[loginData]:", jwt())
  if (!jwt()) {
    navigate('/login')
  }
}

export function CourseData({ params, location, navigate, data }) {
  const {updateUserCourses} = UserCoursesStore()
  updateUserCourses()
  const [course] = createResource(() => params.id, async () => (await getCourse(parseInt(params.id))));
  return course
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

        {/* 课程页面 */}
        <Route path="/course/:id" component={CourseWrapper} data={CourseData}>
          <Route path="/" component={Course} />
          <Route path="/homeworks" component={Homeworks} />
          <Route path="/homeworks/new" component={CreateHomework} />
          <Route path="/students" component={Students} />
        </Route>

        {/* 课程列表页面 */}
        <Route path="/courses" component={Courses} />
        {/* 具体课程页面，根据传入的 id 获取课程数据渲染 */}
        {/* <Route path="/course/:id" component={Course} /> */}
        {/* 具体作业页面，根据传入的 id 获取课程数据渲染 */}
        <Route path="/homework/:id" component={Homework} />
        {/* 创建课程页面*/}
        <Route path="/course/create" component={Create} />
        {/* 创建课程作业页面*/}
        <Route path="/homework/createHomework/:id" component={CreateHomework} />
      </Route>
    </Routes>
  </Router>
), root!);
