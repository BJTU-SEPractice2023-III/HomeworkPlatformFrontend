
import { A, useNavigate, useParams } from '@solidjs/router';
import { Box, Button, TextField } from '@suid/material';
import { login } from '../lib/user';
import { createSignal } from 'solid-js';

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = createSignal('')
  const [password, setPassword] = createSignal('')

  function onLogin() {
    console.log("[Login]: onLogin")
    login(username(), password()).then((res) => {
      console.log("[Login]: login success")
      const data = res.data

      // TODO: put these state in the store
      localStorage.setItem('homework-platform-jwt', data.token)
      localStorage.setItem('homework-platform-username', data.user.username)
      console.log(`isAdmin: ${data.user.is_admin}`)
      navigate('/')
    }).catch((err) => {
      console.error(err)
    })
  }

  return (
    <div class='h-full w-full flex items-center justify-center'>
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
            [`& ${A}`]: { fontSize: '0.25rem' },
            textAlign: "center",
          }}
          noValidate
          autocomplete="off"
        >
          <div class='flex flex-col'>
            <TextField
              label="用户名"
              value={username()}
              onChange={(_event, value) => {
                setUsername(value)
              }}
            />
            <TextField
              label="密码"
              type="password"
              value={password()}
              onChange={(_event, value) => {
                setPassword(value)
              }}
            />
          </div>
          <div class='flex gap-2 items-center justify-center'>
            <Button size='large' variant='contained' onClick={onLogin}>登录</Button>
            <Button size='large' onClick={() => navigate('/register')}>没有账号？</Button>
          </div>
        </Box>
      </div>
    </div>
  )
}