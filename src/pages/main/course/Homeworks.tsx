import { Breadcrumbs, Button, ButtonGroup, Divider, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@suid/material";
import { For, Match, Show, Switch, createSignal, onMount } from "solid-js";
import { Course } from "../../../lib/course";
import { UserCoursesStore } from "../../../lib/store";
import { useNavigate, useParams, useRouteData } from "@solidjs/router";
import { homeworklists, Homework, getCourseHomeworks, delHomework } from '../../../lib/homework'
import { CourseData } from "../../../index";
import { formatDateTime } from "../../../lib/utils";
import { Delete, Edit, ManageSearch } from "@suid/icons-material";

export default function Homeworks() {
  const params = useParams();
  const navigate = useNavigate()
  const { isTeaching, updateUserCourses, isLearning } = UserCoursesStore()

  const course = useRouteData<typeof CourseData>()
  const [homeworkList, setHomeworkList] = createSignal<Homework[]>([])
  onMount(async () => {
    getCourseHomeworks(parseInt(params.id)).then((res) => {
      setHomeworkList(res)
    });
  });

  return <div class="flex flex-col flex-1 items-start p-4 gap-4">
    <Show when={course()}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/" target="none">
          HomeworkPlatform
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href={`/course/${params.id}`}
          target="none"
        >
          Course
        </Link>
        <Typography color="text.primary">Homeworks</Typography>
      </Breadcrumbs>
      <Button variant="contained">创建作业</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>作业名</TableCell>
              <TableCell>起始时间</TableCell>
              <TableCell>结束时间</TableCell>
              <Switch>
                <Match when={isLearning(course())}>
                  <TableCell size='medium'>提交作业</TableCell>
                  <TableCell size='medium'>批阅任务</TableCell>
                </Match>
                <Match when={isTeaching(course())}>
                  <TableCell size='medium'>操作</TableCell>
                </Match>
              </Switch>
            </TableRow>
          </TableHead>
          <TableBody>
            <For each={homeworkList()}>{(homework, i) => <TableRow>
              <TableCell>{homework.name}</TableCell>
              <TableCell>{formatDateTime(homework.beginDate)}</TableCell>
              <TableCell>{formatDateTime(homework.endDate)}</TableCell>
              <Switch>
                <Match when={isLearning(course())}>
                  <TableCell size='medium'>
                    <Button onClick={() => { navigate(`/homework/${homework.ID}`); }}>提交作业</Button>
                  </TableCell>
                  <TableCell size='medium'>
                    <Button onClick={() => { navigate(``); }}>批阅作业</Button>
                  </TableCell>
                </Match>
                <Match when={isTeaching(course())}>
                  <TableCell>
                    <ButtonGroup aria-label="outlined primary button group" sx={{ width: 300 }}>
                      <Button><ManageSearch /></Button>
                      <Button onClick={() => { }}><Edit /></Button>
                      <Button onClick={() => {
                        delHomework(parseInt(params.id), homework.ID).then((res) => {
                          const updatedHomeworkList = homeworkList().filter(item => item.ID !== homework.ID);
                          setHomeworkList(updatedHomeworkList);
                          console.log(res);
                        });
                      }}><Delete /></Button>
                    </ButtonGroup>
                  </TableCell>
                </Match>
              </Switch>
            </TableRow>}
            </For>
          </TableBody>
        </Table>
      </TableContainer>
    </Show>
  </div>;
}
