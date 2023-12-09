import { Outlet, useMatch, useNavigate, useParams, useRouteData } from '@solidjs/router';
import { Breadcrumbs, Link, Typography } from '@suid/material';
import HomeIcon from "@suid/icons-material/Home";
import AssignmentIcon from "@suid/icons-material/Assignment";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@suid/material";
import useTheme from "@suid/material/styles/useTheme";
import { People } from '@suid/icons-material';
import { Match, Show, Switch, onMount } from 'solid-js';
import { HomeworkData } from '../../../index';

export default function CourseWrapper() {
  const navigate = useNavigate()
  const params = useParams()
  const theme = useTheme()

  const { homework, mutateHomework, refetchHomework } = useRouteData<typeof HomeworkData>()

  const isHome = useMatch(() => "/course/:id")
  const isHomeworks = useMatch(() => "/course/:id/homeworks/*")
  const isHomework = useMatch(() => "/course/:courseId/homeworks/:homeworkId")
  const isComment = useMatch(() => "/course/:courseId/homeworks/:homeworkId/submissions/:submissionId/comment")
  const isStudents = useMatch(() => "/course/:id/students/*")
  const isCreateHomework = useMatch(() => "/course/:id/homeworks/new")

  return (
      <div class='w-full h-full flex overflow-x-hidden'>
        <Box
          sx={{
            flexShrink: 0,
            width: 300,
            maxWidth: 260,
            bgcolor: theme.palette.background.paper,
          }}
        >
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding sx={{ backgroundColor: isHome() ? "#00000010" : "" }}>
                <ListItemButton onclick={() => { navigate(`/course/${params.courseId}`) }}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="课程主页" />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding sx={{ backgroundColor: isHomeworks() ? "#00000010" : "" }}>
                <ListItemButton onclick={() => { navigate(`/course/${params.courseId}/homeworks`) }}>
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText primary="作业列表" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ backgroundColor: isStudents() ? "#00000010" : "" }}>
                <ListItemButton onclick={() => { navigate(`/course/${params.courseId}/students`) }}>
                  <ListItemIcon>
                    <People />
                  </ListItemIcon>
                  <ListItemText primary="学生列表" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>

        <div class="flex flex-col flex-1 items-start p-4 gap-4">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              HomeworkPlatform
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href={`/course/${params.courseId}`}
            >
              Course
            </Link>
            <Switch>
              <Match when={isCreateHomework()}>
                <Link
                  underline="hover"
                  color="inherit"
                  href={`/course/${params.courseId}/homeworks`}
                >
                  Homeworks
                </Link>
                <Typography color="text.primary">New</Typography>
              </Match>
              <Match when={isHomework()}>
                <Link
                  underline="hover"
                  color="inherit"
                  href={`/course/${params.courseId}/homeworks`}
                >
                  Homeworks
                </Link>
                <Show when={homework && homework()}>
                  <Typography color="text.primary">{homework().name}</Typography>
                </Show>
              </Match>
              <Match when={isComment()}>
                <Link
                  underline="hover"
                  color="inherit"
                  href={`/course/${params.courseId}/homeworks`}
                >
                  Homeworks
                </Link>
                <Show when={homework && homework()}>
                  <Link
                    underline="hover"
                    color="inherit"
                    href={`/course/${params.courseId}/homeworks/${params.homeworkId}`}
                  >
                    {homework().name}
                  </Link>
                </Show>
                <Typography color="text.primary">Comment</Typography>
              </Match>
              <Match when={isHomeworks()}>
                <Typography color="text.primary">Homeworks</Typography>
              </Match>
              <Match when={isStudents()}>
                <Typography color="text.primary">Students</Typography>
              </Match>
            </Switch>
          </Breadcrumbs>

          <Outlet />
        </div>
      </div>
  );
}
