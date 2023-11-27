import 'uno.css';
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import { Routes, Route } from '@solidjs/router';
import { LoginInfoStore, UserCoursesStore } from './lib/store';
import { getCourse } from './lib/course';
import { createResource } from 'solid-js';
import { getHomework } from './lib/homework';
import AlertList from './components/AlertList';

// Pages
import CreateHomework from './pages/main/course/CreateHomework';
import HomeworkDetail from './pages/main/course/HomeworkDetail';
import Homeworks from "./pages/main/course/Homeworks";
import Students from './pages/main/course/Students';
import CommentHomework from './pages/main/course/CommentHomework';
import HomeworkEdit from './pages/main/course/HomeworkEdit';
import Main from './pages/main/Main';
import Courses from './pages/main/Courses';
import Course from './pages/main/course/Course';
import Login from './pages/Login';
import Register from './pages/Register';
import MainWrapper from './pages/main/MainWrapper';
import CourseWrapper from './pages/main/course/CourseWrapper';
import Create from './pages/main/Create';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

const { jwt } = LoginInfoStore()

// 检验登录，若 localStorage 中无 jwt 则跳转到 login
export function LoginData({ params, location, navigate, data }) {
  if (!jwt()) {
    navigate('/login')
  }
}

export function CourseData({ params, location, navigate, data }) {
  const { updateUserCourses } = UserCoursesStore()
  updateUserCourses()

  const [course, { mutate, refetch }] = createResource(() => params.courseId, async () => await getCourse(parseInt(params.courseId)));
  return { course, mutateCourse: mutate, refetchCourse: refetch, ...data }
}

export function HomeworkData({ params, location, navigate, data }) {
  const [homework, { mutate, refetch }] = createResource(() => params.homeworkId, async () => await getHomework(parseInt(params.homeworkId)))
  return { homework, mutateHomework: mutate, refetchHomework: refetch, ...data }
}


render(() => (
  <>
    <AlertList />
    <Router>
      <Routes>
        {/* /login 和 /register 不要求登录 */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        {/* 其他路径需要登录，通过 LoginData 检验 localStorage 是否存在 jwt */}
        <Route path="/" component={MainWrapper} data={LoginData}>
          {/* 主页 */}
          <Route path="/" component={Main} />

          {/* 创建课程页面*/}
          <Route path="/course/create" component={Create} />
          {/* 课程列表页面 */}
          <Route path="/courses" component={Courses} />

          {/* 课程页面 */}
          <Route path="/course/:courseId" component={CourseWrapper} data={CourseData}>
            <Route path="/" component={Course} />
            {/* 作业列表 */}
            <Route path="/homeworks" component={Homeworks} />
            {/* 学生列表 */}
            <Route path="/students" component={Students} />

            {/* 创建作业 */}
            <Route path="/homeworks/new" component={CreateHomework} />
            <Route path="/homeworks/:homeworkId" data={HomeworkData}>
              <Route path="/" component={HomeworkDetail} />
              <Route path="/edit" component={HomeworkEdit} />
              <Route path="/submissions/:submissionId/comment" component={CommentHomework} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  </>
), root!);
