import { Route, Outlet, useNavigate, A } from '@solidjs/router'
import Courses from "./Courses"
import { Button, Card, CardContent, Divider, TextField, Typography } from '@suid/material'
import { Switch, Match, For, Show, createSignal, onMount } from 'solid-js'
import { Homework } from '../../lib/homework'
import { LoginInfoStore, UserCoursesStore } from '../../lib/store';
import { getNotifications } from '../../lib/user';
export default function Main() {
  const { loginInfo } = LoginInfoStore()

  const { updateUserCourses, learningCourses, teachingCourses, userCourses } = UserCoursesStore()
  const navigate = useNavigate();
  const { user } = LoginInfoStore()

  const [homeworkProgress, setHomeworkProgress] = createSignal<Homework[]>([]);
  const [commentCompleted, setCommentCompleted] = createSignal<Homework[]>([]);
  const [homeworkCompleted, setHomeworkCompleted] = createSignal<Homework[]>([]);
  const [commentProgress, setCommentProgress] = createSignal<Homework[]>([]);

  onMount(async () => {
    await updateUserCourses()
    const res = await getNotifications(user().id)
    console.log(res)
    setHomeworkProgress(res.homeworkInProgress)
    setHomeworkCompleted(res.homeworksToBeCompleted)
    setCommentProgress(res.commentInProgress)
    setCommentCompleted(res.commentToBeCompleted)
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
          <Typography>通知</Typography>
        </div>
            <For each={homeworkProgress()}>{(homeworkProgresses, i) => <Card>
              <CardContent>
                <Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    进行中的作业
                  </Typography>
                  <Typography variant="h5" component="div">
                    {homeworkProgresses.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {homeworkProgresses.description}
                  </Typography>
                  <Typography variant="body2">
                    开始日期：{homeworkProgresses.beginDate}
                    <br />
                    结束日期：{homeworkProgresses.endDate}
                  </Typography>
                </Typography>
              </CardContent>
            </Card>
            }
            </For>
            <For each={homeworkCompleted()}>{(homeworkCompleteds, i) => <Card>
              <CardContent>
                <Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    结束的作业
                  </Typography>
                  <Typography variant="h5" component="div">
                    {homeworkCompleteds.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {homeworkCompleteds.description}
                  </Typography>
                  <Typography variant="body2">
                    开始日期：{homeworkCompleteds.beginDate}
                    <br />
                    结束日期：{homeworkCompleteds.endDate}
                  </Typography>
                </Typography>
              </CardContent>
            </Card>
            }
            </For>

            <For each={commentProgress()}>{(commentProgresses, i) => <Card>
              <CardContent>
                <Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    进行中的互评
                  </Typography>
                  <Typography variant="h5" component="div">
                    {commentProgresses.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {commentProgresses.description}
                  </Typography>
                  <Typography variant="body2">
                    互评开始日期：{commentProgresses.endDate}
                    <br />
                    互评结束日期：{commentProgresses.commentEndDate}
                  </Typography>
                </Typography>
              </CardContent>
            </Card>
            }
            </For>


            <For each={commentCompleted()}>{(commentCompleteds, i) => <Card>
              <CardContent>
                <Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    结束的互评
                  </Typography>
                  <Typography variant="h5" component="div">
                    {commentCompleteds.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {commentCompleteds.description}
                  </Typography>
                  <Typography variant="body2">
                    互评开始日期：{commentCompleteds.endDate}
                    <br />
                    互评结束日期：{commentCompleteds.commentEndDate}
                  </Typography>
                </Typography>
              </CardContent>
            </Card>
            }
            </For>
      </div>
    </div >
  )
}