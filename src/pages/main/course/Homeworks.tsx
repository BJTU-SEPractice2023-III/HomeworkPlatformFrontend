import { Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@suid/material";
import { For, Show, createSignal, onMount } from "solid-js";
import { Course } from "../../../lib/course";
import { UserCoursesStore } from "../../../lib/store";
import { useNavigate, useParams, useRouteData } from "@solidjs/router";
import { homeworklists, Homework, getCourseHomeworks, delHomework } from '../../../lib/homework'
import { CourseData } from "../../../index";

export default function Homeworks() {
  const params = useParams();
  const navigate = useNavigate()
  const { isTeaching, updateUserCourses, isLearning } = UserCoursesStore()

  const course = useRouteData<typeof CourseData>()
  const [homeworkList, setHomeworkList] = createSignal<Homework[]>([])
  onMount(async () => {
    console.log("??")
    getCourseHomeworks(parseInt(params.id)).then((res) => {
      setHomeworkList(res)
      // console.log('homeworks: ', res)
    });
  });

  return <>
    <Show when={course()}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>作业名</TableCell>
              <TableCell>起始时间</TableCell>
              <TableCell>结束时间</TableCell>
              <TableCell size='medium'>提交作业</TableCell>
              <TableCell size='medium'>批阅任务</TableCell>
              <TableCell size='medium'>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <For each={homeworkList()}>{(homework, i) => <TableRow>
              <TableCell>{homework.name}</TableCell>
              <TableCell>{homework.beginDate}</TableCell>
              <TableCell>{homework.endDate}</TableCell>
              <TableCell size='medium'>
                <Button onClick={() => { navigate(`/homework/${homework.ID}`); }}>提交作业</Button>
              </TableCell>
              <TableCell size='medium'>
                <Button onClick={() => { navigate(``); }}>批阅作业</Button>
              </TableCell>
              <TableCell>
                <Show when={isTeaching(course())}>
                  <ButtonGroup aria-label="outlined primary button group" sx={{ width: 200 }}>
                    <Button onClick={() => {
                      delHomework(parseInt(params.id), homework.ID).then((res) => {
                        const updatedHomeworkList = homeworkList().filter(item => item.ID !== homework.ID);
                        setHomeworkList(updatedHomeworkList);
                        console.log(res);
                      });
                    }}>删除作业</Button>
                    <Button onClick={() => { }}>修改作业</Button>
                  </ButtonGroup>
                </Show>
                <Show when={isLearning(course())}>
                  <div>
                    /
                  </div>
                </Show>
              </TableCell>
            </TableRow>}
            </For>
          </TableBody>
        </Table>
      </TableContainer>
    </Show>
  </>;
}
