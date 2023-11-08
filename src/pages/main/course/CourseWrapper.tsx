import { Outlet, useNavigate, useParams, useRouteData } from '@solidjs/router';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@suid/material';
import HomeIcon from "@suid/icons-material/Home";
import { LoginInfoStore } from '../../../lib/store';
import DraftsIcon from "@suid/icons-material/Drafts";
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
import { onMount } from 'solid-js';
import { CourseData } from '../../../index';

export default function CourseWrapper() {
  const navigate = useNavigate()
  const params = useParams()
  const theme = useTheme()

  const { loginInfo } = LoginInfoStore()

  return (
    <div class='w-full h-full flex'>
      <Box
        sx={{
          width: "100%",
          maxWidth: 260,
          bgcolor: theme.palette.background.paper,
        }}
      >
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton onclick={() => {navigate(`/course/${params.id}`)}}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="课程主页" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onclick={() => {navigate(`/course/${params.id}/homeworks`)}}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="作业列表" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onclick={() => {navigate(`/course/${params.id}/students`)}}>
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                <ListItemText primary="学生列表" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        {/* <Divider />
        <nav aria-label="secondary mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Trash" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton<"a">
                component="a"
                href="#simple-list"
                target="none"
                onClick={(event) => event.preventDefault()}
              >
                <ListItemText primary="Spam" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav> */}
      </Box>
      <Outlet />
    </div>
  );
}
