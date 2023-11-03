import { useNavigate } from '@solidjs/router';
import { For, Match, Switch, createSignal, onMount } from 'solid-js';
import { Course, getCourses, selectCourse } from '../../lib/course';
import { Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@suid/material';
import { isLearing, isTeaching, updateCourses } from '../../lib/store';

export default function Courses() {
  const navigate = useNavigate()

  const [courses, setCourses] = createSignal<Course[]>([])

  onMount(() => {
    updateCourses()
    getCourses().then((res) => {
      console.log(res)
      setCourses(res)
    })
  })

  // TODO: list | card

  return (
    <>
      {/* TODO: add link to course detail page */}
      {/* TODO: add join button */}
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
                {/* TODO: parse the date */}
                <TableCell>{course.beginDate}</TableCell>
                <TableCell>{course.endDate}</TableCell>
                <TableCell size='medium'>
                  <ButtonGroup aria-label="outlined primary button group" sx={{width: 200}}>
                    <Button onClick={() => { navigate(`/course/${course.ID}`) }}>详情</Button>
                    <Switch fallback={
                      <Button onClick={() => {
                        // TODO: 选课
                        selectCourse(course.ID).then((res) => {
                          updateCourses()
                          console.log(res)
                        })
                      }}>选课</Button>
                    }>
                      <Match when={isLearing(course)}>
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