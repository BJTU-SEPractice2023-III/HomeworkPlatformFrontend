import { Outlet, useNavigate } from '@solidjs/router';
import { Alert, AlertTitle, AppBar, Button, IconButton, Toolbar, Typography } from '@suid/material';
import HomeIcon from "@suid/icons-material/Home";
import { AlertsStore, LoginInfoStore } from '../../lib/store';
import { For } from 'solid-js';
import { capitalizeFirstLetter } from '../../lib/utils';
import { AlertColor } from '@suid/material/Alert';
import { Transition } from 'solid-transition-group';


export default function MainWrapper() {
  const navigate = useNavigate();

  const { loginInfo } = LoginInfoStore()

  return (
    <Transition appear={true} onEnter={(el, done) => {
      const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 200
      });
      a.finished.then(done);
    }}>
      <div class='h-full w-full flex flex-col items-center'>
        <AppBar position='sticky' sx={{ zIndex: 0 }}>
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
    </Transition>
  );
}
