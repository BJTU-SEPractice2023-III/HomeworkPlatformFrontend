import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@suid/material";
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
        <For each={studentList()}>{(studentList, i) => <TableRow>
          <TableCell>{studentList.id}</TableCell>
          <TableCell>{studentList.username}</TableCell>
        </TableRow>}
        </For>
      </TableBody>
    </Table>
  </TableContainer>;
}
