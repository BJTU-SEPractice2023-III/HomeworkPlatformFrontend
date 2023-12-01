import { Outlet, useNavigate } from '@solidjs/router';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@suid/material';
import HomeIcon from "@suid/icons-material/Home";
import { LoginInfoStore } from '../../lib/store';
import { Transition } from 'solid-transition-group';
import { createSignal } from 'solid-js';
import AskSpark from '../../components/AskSpark';


export default function MainWrapper() {
  const navigate = useNavigate();
  const { loginInfo } = LoginInfoStore()
  const [submitModalOpen, setSubmitModalOpen] = createSignal(false);

  return (
    <Transition appear={true} onEnter={(el, done) => {
      const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 200
      });
      a.finished.then(done);
    }}>
      <AskSpark  open={submitModalOpen} setOpen={setSubmitModalOpen}/>
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

            <Button color='inherit'  onClick={() => { setSubmitModalOpen(true); }}>
              询问
            </Button>

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
