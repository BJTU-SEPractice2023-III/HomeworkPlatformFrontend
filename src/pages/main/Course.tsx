import { useParams, A } from '@solidjs/router';
import { BottomNavigation, BottomNavigationAction, Button, Card, CardContent, Typography } from '@suid/material';
import { For, Match, Show, Switch, createSignal, onMount } from 'solid-js';
import { StudentList, getCourse } from '../../lib/course';
import type { Course, Student } from '../../lib/course';
import { formatDateTime } from '../../lib/utils';
import { Favorite, LocationOn, Restore } from '@suid/icons-material';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@suid/material';

export default function Course() {
  const params = useParams();

  const [course, setCourse] = createSignal<Course | null>();
  const [tab, setTab] = createSignal('index');
  const [studentList, setStudentList] = createSignal<Student[]>([])

  onMount(async () => {
    getCourse(parseInt(params.id)).then((res) => {
      // console.log(res);
      setCourse(res);
    })
    StudentList(parseInt(params.id)).then((res) => {
      setStudentList(res);
      console.log(res);
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
    return <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }}>
      <TableHead>
        <TableRow>
          <TableCell>作业名</TableCell>
          <TableCell>发布人</TableCell>
          <TableCell>起始时间</TableCell>
          <TableCell>结束时间</TableCell>
          <TableCell size='medium'>提交作业</TableCell>
          <TableCell size='medium'>批阅任务</TableCell>
          <TableCell>我的成绩</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        
      </TableBody>
    </Table>
  </TableContainer>
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
              <TableCell>{studentList.ID}</TableCell>
              <TableCell>{studentList.name}</TableCell>
            </TableRow>
          }
          </For>
        </TableBody>
      </Table>
    </TableContainer>
  }

  return (
    <div class='flex-1 p-4 gap-2'>
      <div class='flex w-full gap-2 mb-2'>
        <Button sx={{ borderBottom: tab() == 'index' ? 1 : 0 }} onClick={() => { setTab('index') }}>
          简介
        </Button>
        <Button sx={{ borderBottom: tab() == 'homework' ? 1 : 0 }} onClick={() => { setTab('homework') }}>
          作业
        </Button>
        <Button sx={{ borderBottom: tab() == 'students' ? 1 : 0 }} onClick={() => { setTab('students') }}>
          学生列表
        </Button>
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