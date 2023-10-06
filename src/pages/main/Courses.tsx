import { useParams } from '@solidjs/router';
import { For, createSignal, onMount } from 'solid-js';
import { getCourses } from '../../lib/course';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@suid/material';
export default function Courses() {

  const [courses, setCourses] = createSignal([])

  onMount(async () => {
    getCourses().then((res) => {
      console.log(res.data)
      setCourses(res.data)
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
              </TableRow>
            }
            </For>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}