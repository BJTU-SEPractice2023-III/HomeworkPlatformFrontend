import { useNavigate } from '@solidjs/router';
import { For, Match, Switch, createSignal, onMount } from 'solid-js';
import { Course, getCourses, selectCourse } from '../../lib/course';
import { Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@suid/material';
import { formatDateTime } from '../../lib/utils';
import { AlertsStore, UserCoursesStore } from '../../lib/store';

export default function Courses() {
  const navigate = useNavigate()

  const { updateUserCourses, isLearning, isTeaching } = UserCoursesStore()
  const [courses, setCourses] = createSignal<Course[]>([])
  const { newSuccessAlert, newWarningAlert, newErrorAlert } = AlertsStore()

  onMount(async () => {
    await updateUserCourses()
    getCourses().then((res) => {
      setCourses(res)
    })
  })

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>课程名</TableCell>
              <TableCell>简介</TableCell>
              <TableCell>起始时间</TableCell>
              <TableCell>结束时间</TableCell>
              <TableCell size='medium'>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <For each={courses()}>{(course, i) =>
              <TableRow>
                <TableCell>{course.ID}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>{formatDateTime(course.beginDate)}</TableCell>
                <TableCell>{formatDateTime(course.endDate)}</TableCell>
                <TableCell size='medium'>
                  <ButtonGroup aria-label="outlined primary button group" sx={{ width: 200 }}>
                    <Button onClick={() => { navigate(`/course/${course.ID}`) }}>详情</Button>
                    <Switch fallback={
                      <Button onClick={() => {
                        selectCourse(course.ID).then((res) => {
                          console.log(`选课成功`)
                          newSuccessAlert('选课成功')
                          updateUserCourses()
                          // TODO: 直接更改全局状态，添加入 leaningCourses
                        })
                      }}>选课</Button>
                    }>
                      <Match when={isLearning(course)}>
                        <Button sx={{ color: 'red' }} onClick={() => { }} disabled>学习中</Button>
                      </Match>
                      <Match when={isTeaching(course)}>
                        <Button sx={{ color: 'red' }} onClick={() => { }} disabled>教授中</Button>
                      </Match>
                    </Switch>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            }
            </For>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}