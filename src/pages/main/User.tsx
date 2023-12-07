import { useParams } from "@solidjs/router";
import { useNavigate, A } from '@solidjs/router'
import { Avatar, Button, Divider, Stack, TextField } from '@suid/material'
import { For, Show, createSignal, onMount } from 'solid-js'
import { LoginInfoStore, UserCoursesStore } from '../../lib/store';
import { deepOrange } from "@suid/material/colors";
import PersonalizedSignatureModel from "../../components/PersonalizedSignatureModel";
import { getUserById } from "../../lib/user";

export default function User() {
  const params = useParams();

  const { updateUserCourses, learningCourses, teachingCourses } = UserCoursesStore()
  const [userModalOpen, setUserModalOpen] = createSignal(false);
  const navigate = useNavigate();
  const { user } = LoginInfoStore()
  const [searchTeaching, setSearchTeaching] = createSignal('');
  const [searchLeaching, setSearchLeaching] = createSignal('');
  const [username, setUsername] = createSignal('');
  onMount(async () => {
    await updateUserCourses()
    await getUserById(parseInt(params.userId)).then((res)=>{
      setUsername(res.username)
    })
  });
  return (
    <div class='flex-1 flex w-full'>
      {/* <personalizedSignatureModel open={userModalOpen} setOpen={setUserModalOpen} /> */}
      <PersonalizedSignatureModel  open={userModalOpen} setOpen={setUserModalOpen}/>
      <aside class='min-w-[250px] border-0 border-r border-solid border-slate-200 p-6 flex flex-col gap-4'>
        <div class='flex flex-col gap-2'>
          <Stack direction="row" spacing={2}>
            <Avatar
              sx={{
                bgcolor: deepOrange[500],
                width: 224,
                height: 224,
              }}
            >
            </Avatar>
          </Stack>
          {username()}
          <Show when={user().id == parseInt(params.userId)}>
            <Button variant="outlined" onClick={() => { setUserModalOpen(true) }}>
              修改个性签名
            </Button>
          </Show>
        </div>


        <div class='flex flex-col gap-1'>
          <div class='flex items-center justify-between'>
            <span>教的课程</span>
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
            {(lesson) => <div>
              <Show when={lesson.name.includes(searchTeaching()) || searchTeaching() == ''}>
                <A href={`/course/${lesson.ID}`} class='text-black no-underline hover:underline'>
                  {lesson.name}
                </A>
              </Show>
            </div>}
          </For>
        </div>

        <Divider />

        <div class='flex flex-col gap-1'>
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
            {(lesson) => <div>
              <Show when={lesson.name.includes(searchLeaching()) || searchLeaching() == ''}>
                <A href={`/course/${lesson.ID}`} class='text-black no-underline hover:underline'>
                  {lesson.name}
                </A>
              </Show>
            </div>}
          </For>
        </div>
      </aside >

    </div>
  )
}