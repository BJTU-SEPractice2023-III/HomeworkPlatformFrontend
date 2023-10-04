
import { A, useNavigate, useParams } from 'the-solid-router';
import { Box, Button, TextField } from '@suid/material';

export default function Login() {
  const navigate = useNavigate();

  function onLogin() {
    console.log("Login")
    // TODO: Login logic
    localStorage.setItem('homework-platform-jwt', 'fake-jwt')
    navigate('/')
  }

  return (
    <>
      <div
        class="
  w-screen
  h-screen
  flex flex-col
  justify-center
  items-center
  bg-white
  bg-opacity-20
"
      >
        <div
          class="flex flex-col gap-3 p-8 items-center
        min-w-[400px]
    w-max
    h-fit
    top-1/2
    rounded-xl
    bg-white bg-opacity-90
    z-3
    shadow-xl
  "
        >
          <span class="mb-3 text-2xl">
            登录
          </span>
          <Box
            component="form"
            sx={{
              maxWidth: 764,
              [`& ${TextField}`]: { m: 1, width: "25ch" },
              [`& ${A}`]: {fontSize: '0.25rem'},
              textAlign: "center",
            }}
            noValidate
            autocomplete="off"
          >
            <div class='flex flex-col'>
              <TextField
                label="用户名"
              />
              <TextField
                label="密码"
                type="password"
              />
            </div>
            <div class='flex gap-2 items-center justify-center'>
              <Button size='large' variant='contained' onClick={onLogin}>登录</Button>
              <Button size='large' onClick={() => navigate('/register')}>没有账号？</Button>
            </div>
          </Box>
        </div>
      </div>
    </>
  )
}