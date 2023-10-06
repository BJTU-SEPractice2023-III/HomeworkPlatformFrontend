import { Outlet, useNavigate } from '@solidjs/router';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@suid/material';
import MenuIcon from "@suid/icons-material/Menu";


export default function MainWrapper() {
  const navigate = useNavigate();

  return (
    <div class='h-full w-full'>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Main Wrapper
          </Typography>
          <Button color='inherit' onClick={() => navigate('/courses')}>
            课程
          </Button>
          {/* TODO: change it according to the login state */}
          <Button color="inherit" onClick={() => {
            localStorage.removeItem('homework-platform-jwt')
            navigate('/login')
          }}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
}
