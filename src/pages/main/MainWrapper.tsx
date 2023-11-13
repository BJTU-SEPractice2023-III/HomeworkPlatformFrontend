import { Outlet, useNavigate } from '@solidjs/router';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@suid/material';
import HomeIcon from "@suid/icons-material/Home";
import { LoginInfoStore } from '../../lib/store';


export default function MainWrapper() {
  const navigate = useNavigate();

  const {loginInfo} = LoginInfoStore()

  return (
    <div class='h-full w-full flex flex-col items-center'>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate('/')}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            HomeworkPlatform
          </Typography>
          {/* <Button color='inherit' onClick={() => navigate('/')}>
            主页
          </Button> */}
          <Button color='inherit' onClick={() => navigate('/courses')}>
            课程
          </Button>
          {/* TODO: change it according to the login state */}
          <Button color="inherit" onClick={() => {
            localStorage.removeItem('jwt')
            localStorage.removeItem('user')
            navigate('/login')
          }}>{loginInfo.user.username} Logout</Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
}
