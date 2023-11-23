import { Route, Outlet, useNavigate, A } from '@solidjs/router'
import Courses from "./Courses"
import { Button, Card, CardContent, Divider, TextField, Typography } from '@suid/material'
import { Switch, Match, For, Show, createSignal, onMount } from 'solid-js'
import { Homework } from '../../lib/homework'
import { LoginInfoStore, UserCoursesStore } from '../../lib/store';
import { getNotifications } from '../../lib/user';
import { formatDateTime } from '../../lib/utils'
import { Transition } from 'solid-transition-group'

export default function Main() {
  const { loginInfo } = LoginInfoStore()

  const { updateUserCourses, learningCourses, teachingCourses, userCourses } = UserCoursesStore()
  const navigate = useNavigate();
  const { user } = LoginInfoStore()

  const [homeworkProgresses, setHomeworkProgresses] = createSignal<Homework[]>([]);
  const [commentCompleted, setCommentCompleted] = createSignal<Homework[]>([]);
  const [homeworkCompleted, setHomeworkCompleted] = createSignal<Homework[]>([]);
  const [commentProgress, setCommentProgress] = createSignal<Homework[]>([]);
  const [searchTeaching, setSearchTeaching] = createSignal('');
  const [searchLeaching, setSearchLeaching] = createSignal('');

  onMount(async () => {
    await updateUserCourses()
    const res = await getNotifications(user().id)
    console.log(res)
    setHomeworkProgresses(res.homeworkInProgress)
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
          <TextField
            label="search"
            size='small'
            value={searchTeaching()}
            onChange={(_event, value) => {
              setSearchTeaching(value)
            }}
          />
          <Show when={teachingCourses().length == 0}>
            <span class='text-gray'>没有课程</span>
          </Show>
          <For each={teachingCourses()}>
            {(lesson, i) => <div>
              <Show when={lesson.name.includes(searchTeaching()) || searchTeaching() == ''}>
                <A href={`/course/${lesson.ID}`} class='text-black no-underline hover:underline'>
                  {lesson.name}
                </A>
              </Show>
            </div>}
          </For>
        </div>

        <Divider />

        <div class='flex flex-col gap-2'>
          <div class='flex items-center justify-between'>
            <span>学的课程</span>
          </div>
          <TextField
            label="search"
            size='small'
            value={searchLeaching()}
            onChange={(_event, value) => {
              setSearchLeaching(value)
            }}
          />
          <Show when={learningCourses().length == 0}>
            <span class='text-gray'>没有课程</span>
          </Show>
          <For each={learningCourses()}>
            {(lesson, i) => <div>
              <Show when={lesson.name.includes(searchLeaching()) || searchLeaching() == ''}>
                <A href={`/course/${lesson.ID}`} class='text-black no-underline hover:underline'>
                  {lesson.name}
                </A>
              </Show>
            </div>}
          </For>
        </div>
      </aside >
      <div class='flex-1 flex flex-col p-6 gap-4'>
        <div class='flex'>
          <Typography>通知</Typography>
        </div>
        <For each={homeworkProgresses()}>{(homeworkProgress, i) => <Card>
          <Transition appear={true} onEnter={(el, done) => {
            const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
              duration: 200 + i() * 400
            });
            a.finished.then(done);
          }}>
            <Show when={homeworkProgress}>
              <CardContent>
                <Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    进行中的作业
                  </Typography>
                  <Typography variant="h5" component="div">
                    <A href={`/course/${homeworkProgress.courseId}/homeworks/${homeworkProgress.ID}`} class='text-black no-underline hover:underline'>
                      {homeworkProgress.name}
                    </A>
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {homeworkProgress.description}
                  </Typography>
                  <Typography variant="body2">
                    开始日期：{formatDateTime(homeworkProgress.beginDate)}
                    <br />
                    结束日期：{formatDateTime(homeworkProgress.endDate)}
                  </Typography>
                </Typography>
              </CardContent>
            </Show>
          </Transition>
        </Card>
        }
        </For>
        <For each={homeworkCompleted()}>{(homeworkCompleteds, i) =>
          <Transition appear={true} onEnter={(el, done) => {
            const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
              duration: 400
            });

            a.finished.then(done);
          }}>
            <Card>
              <CardContent>
                <Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    结束的作业
                  </Typography>
                  <Typography variant="h5" component="div">
                    <A href={`/course/${homeworkCompleteds.courseId}/homeworks/${homeworkCompleteds.ID}`} class='text-black no-underline hover:underline'>
                      {homeworkCompleteds.name}
                    </A>
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {homeworkCompleteds.description}
                  </Typography>
                  <Typography variant="body2">
                    开始日期：{formatDateTime(homeworkCompleteds.beginDate)}
                    <br />
                    结束日期：{formatDateTime(homeworkCompleteds.endDate)}
                  </Typography>
                </Typography>
              </CardContent>
            </Card>
          </Transition>
        }
        </For>

        <For each={commentProgress()}>{(commentProgresses, i) => <Card>
          <CardContent>
            <Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                进行中的互评
              </Typography>
              <Typography variant="h5" component="div">
                <A href={`/course/${commentProgresses.courseId}/homeworks/${commentProgresses.ID}`} class='text-black no-underline hover:underline'>
                  {commentProgresses.name}
                </A>
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {commentProgresses.description}
              </Typography>
              <Typography variant="body2">
                互评开始日期：{formatDateTime(commentProgresses.endDate)}
                <br />
                互评结束日期：{formatDateTime(commentProgresses.commentEndDate)}
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
                <A href={`/course/${commentCompleteds.courseId}/homeworks/${commentCompleteds.ID}`} class='text-black no-underline hover:underline'>
                  {commentCompleteds.name}
                </A>
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