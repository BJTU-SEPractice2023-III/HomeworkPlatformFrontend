import { Route, Outlet, useNavigate } from '@solidjs/router'
import Courses from "./Courses"
import { Button, Card, CardContent, Divider, TextField, Typography } from '@suid/material'
import { For, Show, createSignal, onMount } from 'solid-js'
import { getTeachingCourse, getLearningCourse } from '../../lib/course';

export default function Main() {
  const [teachingLessons, setTeachingLessons] = createSignal([])
  const [learningLessons, setLearningLessons] = createSignal([])
  const navigate = useNavigate();


  async function getteachingcourse() {
    const res = await getTeachingCourse()
    setTeachingLessons(res)
  }


  async function getlearningcourse() {
    getLearningCourse().then(
      (res) => {
        console.log(res)
        setLearningLessons(res)
      }
    )
  }

  onMount(async () => {
    await getteachingcourse();
    getlearningcourse();
  });

  return (
    <div class='flex-1 flex'>
      <aside class='min-w-[250px] border-0 border-r border-solid border-slate-200 p-6 flex flex-col gap-4'>
        <div class='flex flex-col gap-2'>
          <div class='flex items-center justify-between'>
            <span>教的课程</span>
            <Button variant='contained' size='small' onClick={() => navigate('/create')}>创建课程</Button>
          </div>
          <TextField label="search" size='small' />
          <Show when={teachingLessons().length == 0}>
            <span class='text-gray'>没有课程</span>
          </Show>
          {/* <For each={teachingLessons()}>{(lesson, i) => <span>
            {lesson.name}
          </span>}
          </For> */}
          <For each={teachingLessons()}>
            {(lesson, i) => <span> (
              <a href={`/course/${lesson.id}`}>
                {lesson.name}
              </a>
              )</span>}
          </For>
          <a href={"/course/1"}>
            {"原神"}
          </a>
        </div>

        <Divider />

        <div class='flex flex-col gap-2'>
          <div class='flex items-center justify-between'>
            <span>学的课程</span>
          </div>
          <TextField label="search" size='small' />
          <Show when={learningLessons().length == 0}>
            <span class='text-gray'>没有课程</span>
          </Show>
          <For each={learningLessons()}>{(lesson, i) => <span>
            {lesson}
          </span>}
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