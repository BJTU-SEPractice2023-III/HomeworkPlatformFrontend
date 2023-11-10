import { Route, Outlet, useNavigate, A } from '@solidjs/router'
import Courses from "./Courses"
import { Button, Card, CardContent, Divider, TextField, Typography } from '@suid/material'
import { For, Show, createSignal, onMount } from 'solid-js'

import { LoginInfoStore, UserCoursesStore } from '../../lib/store';

export default function Main() {
  const {loginInfo} = LoginInfoStore()

  const {updateUserCourses, learningCourses, teachingCourses, userCourses } = UserCoursesStore()
  const navigate = useNavigate();

  onMount(async () => {
    await updateUserCourses()
  });

  return (
    <div class='flex-1 flex w-full'>
      <aside class='min-w-[250px] border-0 border-r border-solid border-slate-200 p-6 flex flex-col gap-4'>
        <div class='flex flex-col gap-2'>
          <div class='flex items-center justify-between'>
            <span>教的课程</span>
            <Button variant='contained' size='small' onClick={() => navigate('/course/create')}>创建课程</Button>
          </div>
          <TextField label="search" size='small' />
          <Show when={teachingCourses().length == 0}>
            <span class='text-gray'>没有课程</span>
          </Show>
          <For each={teachingCourses()}>
            {(lesson, i) => <div>
              <A href={`/course/${lesson.ID}`} class='text-black no-underline hover:underline'>
                {lesson.name}
              </A>
            </div>}
          </For>
        </div>

        <Divider />

        <div class='flex flex-col gap-2'>
          <div class='flex items-center justify-between'>
            <span>学的课程</span>
          </div>
          <TextField label="search" size='small' />
          <Show when={learningCourses().length == 0}>
            <span class='text-gray'>没有课程</span>
          </Show>
          <For each={learningCourses()}>
            {(lesson, i) => <div>
              <A href={`/course/${lesson.ID}`} class='text-black no-underline hover:underline'>
                {lesson.name}
              </A>
            </div>}
          </For>
        </div>
      </aside>
      <div class='flex-1 flex flex-col p-6 gap-4'>
        <div class='flex'>
          <Typography>Home</Typography>
        </div>
        <Card>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Course Name
            </Typography>
            <Typography variant="h5" component="div">
              Message Title
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              message type(homework/notice)
            </Typography>
            <Typography variant="body2">
              content content content
              <br />
              content content
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Course Name
            </Typography>
            <Typography variant="h5" component="div">
              Message Title
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              message type(homework/notice)
            </Typography>
            <Typography variant="body2">
              content content content
              <br />
              content content
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}