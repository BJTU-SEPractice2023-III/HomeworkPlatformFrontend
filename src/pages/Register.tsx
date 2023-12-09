
import { A, useNavigate, useParams } from '@solidjs/router';
import { Box, Button, TextField } from '@suid/material';
import { register } from '../lib/user';
import { createSignal } from 'solid-js';
import { AlertsStore } from '../lib/store';

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [repeatPassword, setRepeatPassword] = createSignal('')
  const { newSuccessAlert, newWarningAlert, newErrorAlert } = AlertsStore()

  function onRegister() {
    console.log("[Register]: onRegister")
    register(username(), password()).then((res) => {
      console.log("[Register]: register success")
      newSuccessAlert('注册成功')
      navigate('/login')
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
          注册
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
            <TextField
              label="确认密码"
              type="password"
              value={repeatPassword()}
              onChange={(_event, value) => {
                setRepeatPassword(value)
              }}
              error={repeatPassword() != password()}
              helperText={repeatPassword() != password() ? '两次输入的密码不一致': ''}
            />
          </div>
          <div class='flex gap-2 items-center justify-center'>
            <Button size='large' variant='contained' onClick={onRegister}>注册</Button>
            <Button size='large' onClick={() => navigate('/login')}>已有账号？</Button>
          </div>
        </Box>
      </div>
    </div>
  )
}