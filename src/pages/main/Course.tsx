import { useParams, A } from '@solidjs/router';
import { BottomNavigation, BottomNavigationAction, Button, Card, CardContent, Typography } from '@suid/material';
import { For, Match, Show, Switch, createSignal, onMount } from 'solid-js';
import { getCourse, getCourseStudents } from '../../lib/course';
import type { Course, Student } from '../../lib/course';
import { formatDateTime } from '../../lib/utils';
import { ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@suid/material';
import { Favorite, LocationOn, Restore } from '@suid/icons-material';
import { homeworklists, Homework, getCourseHomeworks } from '../../lib/homework'
import { useNavigate } from '@solidjs/router';
import { UserCoursesStore } from '../../lib/store';

export default function Course() {
  const params = useParams();
  const navigate = useNavigate()
  const { isTeaching, updateUserCourses } = UserCoursesStore()

  const [course, setCourse] = createSignal<Course | null>();
  const [tab, setTab] = createSignal('index');
  const [studentList, setStudentList] = createSignal<Student[]>([])
  const [homeworkList, setHomeworkList] = createSignal<Homework[]>([])
  onMount(async () => {
    await updateUserCourses();
    getCourse(parseInt(params.id)).then((res) => {
      setCourse(res);
      console.log('course: ', res)
      console.log(isTeaching(course()))
    });
    getCourseHomeworks(parseInt(params.id)).then((res) => {
      setHomeworkList(res)
      // console.log('homeworks: ', res)
    });
    getCourseStudents(parseInt(params.id)).then((res) => {
      setStudentList(res);
      console.log('studentList: ', res);
    });
  });

  function index() {
    return <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography> */}
        <Typography variant="h3" component="div">
          {course().name}
        </Typography>
        {/* TODO: Add teacher name, and a link to teacher's profile */}
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <A href='' class='text-blue'>teacher</A>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {formatDateTime(course().beginDate)}～{formatDateTime(course().endDate)}
        </Typography>
        <Typography variant="body2">
          {course().description}
        </Typography>
      </CardContent>
    </Card>
  }

  function homework() {
    return <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>作业名</TableCell>
              <TableCell>起始时间</TableCell>
              <TableCell>结束时间</TableCell>
              <TableCell size='medium'>提交作业</TableCell>
              <TableCell size='medium'>批阅任务</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <For each={homeworkList()}>{(homework, i) =>
              <TableRow>
                <TableCell>{homework.name}</TableCell>
                <TableCell>{homework.beginDate}</TableCell>
                <TableCell>{homework.endDate}</TableCell>
                <TableCell size='medium'>
                  <Button onClick={() => { navigate(`/homework/${homework.ID}`) }}>提交作业</Button>
                </TableCell>
                <TableCell size='medium'>
                  <Button onClick={() => { navigate(``) }}>批阅作业</Button>
                </TableCell>
              </TableRow>
            }
            </For>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  }

  function students() {
    return <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>姓名</TableCell>
            <TableCell>成绩</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <For each={studentList()}>{(studentList, i) =>
            <TableRow>
              <TableCell>{studentList.id}</TableCell>
              <TableCell>{studentList.username}</TableCell>
            </TableRow>
          }
          </For>
        </TableBody>
      </Table>
    </TableContainer>
  }

  return (
    <div class='flex-1 p-4 gap-2 flex-col max-w-[80%] w-full'>
      <div class='flex gap-2 mb-2 bg-[#00005002] border-rounded'>
        <Button sx={{ borderBottom: tab() == 'index' ? 1 : 0 }} onClick={() => { setTab('index') }}>
          简介
        </Button>
        <Button sx={{ borderBottom: tab() == 'homework' ? 1 : 0 }} onClick={() => { setTab('homework') }}>
          作业
        </Button>
        <Button sx={{ borderBottom: tab() == 'students' ? 1 : 0 }} onClick={() => { setTab('students') }}>
          学生列表
        </Button>
        <Show when={course() && isTeaching(course())}>
          <Button size='small' onClick={() => navigate(`/homework/createHomework/${course().ID}`)}>
            布置作业
          </Button>
        </Show>
      </div>

      <Show when={course() != null}>
        <Switch fallback={<>在写了在写了</>}>
          <Match when={tab() == 'index'}>
            {index()}
          </Match>
          <Match when={tab() == 'homework'}>
            {homework()}
          </Match>
          <Match when={tab() == 'students'}>
            {students()}
          </Match>
        </Switch>
      </Show>
    </div>
  );
}