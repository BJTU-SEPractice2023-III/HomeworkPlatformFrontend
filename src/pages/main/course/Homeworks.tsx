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

export default function Homeworks() {
  const params = useParams();
  const navigate = useNavigate()
  const { isTeaching, isLearning } = UserCoursesStore()

  const course = useRouteData<typeof CourseData>()
  // const [homeworkList, setHomeworkList] = createSignal<Homework[]>([])
  const homeworks = createSignal<Homework[]>([])
  onMount(async () => {
    getCourseHomeworks(parseInt(params.id)).then((res) => {
      homeworks[1](res)
    });
  });

  const theme = useTheme()
  const [open, setOpen] = createSignal(true)

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

      <Modal
        open={open()}
        onClose={() => { setOpen(false) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            maxWidth: "1000px",
            bgcolor: theme.palette.background.paper,
            boxShadow: "24px",
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            创建作业
          </Typography>

        </Box>
      </Modal>

      <HomeworksTable homeworks={homeworks} isTeaching={isTeaching(course())} />
    </Show>
  </div>;
}
