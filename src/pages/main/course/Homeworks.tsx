import { Box, Breadcrumbs, Button, ButtonGroup, Divider, Link, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@suid/material";
import { For, Match, Show, Switch, createSignal, onMount } from "solid-js";
import { Course } from "../../../lib/course";
import { UserCoursesStore } from "../../../lib/store";
import { useNavigate, useParams, useRouteData } from "@solidjs/router";
import { homeworklists, Homework, getCourseHomeworks, delHomework } from '../../../lib/homework'
import { CourseData } from "../../../index";
import { formatDateTime } from "../../../lib/utils";
import { Delete, Edit, ManageSearch } from "@suid/icons-material";
import HomeworksTable from "../../../components/HomeworksTable";
import CreateHomeworkModal from "../../../components/CreateHomeworkModal";

export default function Homeworks() {
  const params = useParams();
  const navigate = useNavigate()
  const { isTeaching, isLearning } = UserCoursesStore()

  const course = useRouteData<typeof CourseData>()
  // const [homeworkList, setHomeworkList] = createSignal<Homework[]>([])
  const _homeworks = createSignal<Homework[]>([])
  const [homeworks, setHomeworks] = _homeworks
  onMount(async () => {
    getCourseHomeworks(parseInt(params.id)).then((res) => {
      setHomeworks(res)
    });
  });

  const theme = useTheme()

  return (
    <Show when={course()}>
      <Show when={isTeaching(course())}>
        <Button variant="contained" onClick={() => { navigate('new') }}>创建作业</Button>
      </Show>

      {/* <CreateHomeworkModal open={_open}/> */}

      <HomeworksTable homeworks={_homeworks} isTeaching={isTeaching(course())} />
    </Show>
  );
}
