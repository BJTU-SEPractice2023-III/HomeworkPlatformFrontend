import { Breadcrumbs, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@suid/material";
import { For, createSignal, onMount } from "solid-js";
import { Student, getCourseStudents } from "../../../lib/course";
import { useParams } from "@solidjs/router";


export default function Students() {
  const params = useParams();
  const [studentList, setStudentList] = createSignal<Student[]>([])

  onMount(() => {
    getCourseStudents(parseInt(params.id)).then((res) => {
      setStudentList(res);
      // console.log('studentList: ', res);
    });
  });

  return <div class="flex flex-col flex-1 items-start p-4 gap-4">
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
      <Typography color="text.primary">Students</Typography>
    </Breadcrumbs>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>姓名</TableCell>
            <TableCell>成绩</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <For each={studentList()}>{(studentList, i) => <TableRow>
            <TableCell>{studentList.id}</TableCell>
            <TableCell>{studentList.username}</TableCell>
          </TableRow>}
          </For>
        </TableBody>
      </Table>
    </TableContainer>
  </div>
}
