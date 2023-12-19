import { useParams } from "@solidjs/router";
import { useNavigate, A } from '@solidjs/router'
import { Avatar, Button, Card, CardContent, Divider, Fab, Stack, TextField, Typography } from '@suid/material'
import { For, Show, createSignal, onMount } from 'solid-js'
import { LoginInfoStore, UserCoursesStore } from '../../lib/store';
import { deepOrange } from "@suid/material/colors";
import PersonalizedSignatureModel from "../../components/PersonalizedSignatureModel";
import { getUserById } from "../../lib/user";
import { Course } from "../../lib/course";
import EditIcon from "@suid/icons-material/Edit";
import { Transition } from "solid-transition-group";
import { formatDateTime } from "../../lib/utils";
import { getUserAvatarById } from "../../lib/user";
import PictureUp from "../../components/PictureUp";
export default function User() {
  const params = useParams();

  const { updateUserCourses, learningCourses, teachingCourses } = UserCoursesStore()
  const [userModalOpen, setUserModalOpen] = createSignal(false);
  const [pictureModalOpen, setPictureModalOpen] = createSignal(false);
  const navigate = useNavigate();
  const { user } = LoginInfoStore()
  const [teaching, setTeaching] = createSignal<Course[]>([]);
  const [learning, setLearning] = createSignal<Course[]>([]);
  const [username, setUsername] = createSignal('');
  const [signature, setSignature] = createSignal('');
  const [pictureBase64, setPictureBase64] = createSignal('');
  onMount(() => {
    updateUserCourses()
    getUserById(parseInt(params.userId)).then((res) => {
      // console.log(res)
      setUsername(res.username)
      setSignature(res.signature)
      setTeaching(res.teachingCourses)
      setLearning(res.learningCourses)
    })
    getUserAvatarById(parseInt(params.userId)).then((res) => {
      // console.log("base64:" + res)
      setPictureBase64(res)
    })
  });

  return (
    <div class='flex-1 flex w-full'>
      {/* <personalizedSignatureModel open={userModalOpen} setOpen={setUserModalOpen} /> */}
      <PersonalizedSignatureModel open={userModalOpen} setOpen={setUserModalOpen} />
      <PictureUp open={pictureModalOpen} setOpen={setPictureModalOpen} />
      <aside class='min-w-[250px] border-0 border-r border-solid border-slate-200 p-6 flex flex-col gap-4'>
        <div class='flex flex-col gap-2'>
          <Stack direction="row" spacing={2}>
            <Avatar
              src={`data:image/jpg;base64,${pictureBase64()}`}
              sx={{
                bgcolor: deepOrange[500],
                width: 224,
                height: 224,
              }}
            >
            </Avatar>
            <Show when={user().id == parseInt(params.userId)}>
              <Fab color="secondary" aria-label="edit" onClick={() => { setPictureModalOpen(true) }}>
                <EditIcon />
              </Fab>
            </Show>
          </Stack>
          {username()}
          <div>
            {"[" + signature() + "]"}
          </div>
          <Show when={user().id == parseInt(params.userId)}>
            <Button variant="outlined" onClick={() => { setUserModalOpen(true) }}>
              修改个性签名
            </Button>
          </Show>
        </div>


        <div class='flex flex-col gap-1'>
          教的课程有{teaching().length}门
        </div>

        <div class='flex flex-col gap-1'>
          学的课程有{learning().length}门
        </div>
      </aside >
      <div class='flex-1 flex flex-col p-6 gap-4'>
        <div>教的课程</div>
        <For each={teaching()}>{(teachingCourse, i) => <Card>
          <Transition appear={true} onEnter={(el, done) => {
            const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
              duration: 200 + i() * 400
            });
            a.finished.then(done);
          }}>
            <CardContent>
              <Typography>
                <Typography variant="h5" component="div">
                  <A href={`/course/${teachingCourse.id}`} class='text-black no-underline hover:underline'>
                    {teachingCourse.name}
                  </A>
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {teachingCourse.description}
                </Typography>
                <Typography variant="body2">
                  开始日期：{formatDateTime(teachingCourse.beginDate)}
                  <br />
                  结束日期：{formatDateTime(teachingCourse.endDate)}
                </Typography>
              </Typography>
            </CardContent>
          </Transition>
        </Card>
        }
        </For>
        <div>学的课程</div>
        <For each={learning()}>{(learningCourse, i) => <Card>
          <Transition appear={true} onEnter={(el, done) => {
            const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
              duration: 200 + i() * 400
            });
            a.finished.then(done);
          }}>
            <Show when={learningCourse}>
              <CardContent>
                <Typography>
                  <Typography variant="h5" component="div">
                    <A href={`/course/${learningCourse.id}`} class='text-black no-underline hover:underline'>
                      {learningCourse.name}
                    </A>
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {learningCourse.description}
                  </Typography>
                  <Typography variant="body2">
                    开始日期：{formatDateTime(learningCourse.beginDate)}
                    <br />
                    结束日期：{formatDateTime(learningCourse.endDate)}
                  </Typography>
                </Typography>
              </CardContent>
            </Show>
          </Transition>
        </Card>
        }
        </For>
      </div>
    </div>
  )
}