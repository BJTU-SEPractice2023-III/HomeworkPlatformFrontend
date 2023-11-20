import { useParams, useRouteData } from '@solidjs/router';
import { Show, createEffect, createSignal, onMount } from 'solid-js';
import { getHomework, Homework, isEnded, notStartYet, StudentHomework, homeworksComment } from '../../../lib/homework'
import { Button, Typography, Divider, Paper, } from '@suid/material';
import { For } from 'solid-js';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@suid/material";
import { formatDateTime } from '../../../lib/utils';
import HomeworkSubmitModal from '../../../components/HomeworkSubmitModal';
import { useNavigate } from '@solidjs/router';
import { CommentTask } from '../../../lib/homework';
import { CourseData, HomeworkData } from '../../..';
import { Switch, Match } from 'solid-js';
import { A } from '@solidjs/router';
// import { getFiles } from '../../../lib/homework';
import { getHomeworkById } from '../../../lib/homework';
import axios from 'axios';

export default function HomeworkDetail() {
  const params = useParams();
  const homework = useRouteData<typeof HomeworkData>()
  // const  = useRouteData<typeof CourseData>HomeworkData()
  const [tab, setTab] = createSignal('mutualAssessment');

  const navigate = useNavigate()
  const [submitHomework, setSubmitHomework] = createSignal<Homework>();
  const [fileList, setfileList] = createSignal<string[]>([]);

  const [fileName, setFileName] = createSignal('');
  const [commentTasks, setCommentTasks] = createSignal<CommentTask[]>([]);

  const [submitModalOpen, setSubmitModalOpen] = createSignal(false)

  const getFilename = (path: string) => {
    const parts = path.split('\\')
    return parts[parts.length - 1]
  }

  createEffect(() => {
    if (homework()) {
      homeworksComment(parseInt(params.homeworkId)).then((res) => {
        console.log(res)
        // setHomeworkSubmission(res.homework_submission)
        setCommentTasks(res.comment_lists)
        setfileList(homework().file_paths)
      }).catch((err) => {
        console.error('get commend failed: ', err)
      });
    }
  })

  onMount(() => {
    getHomeworkById(parseInt(params.homeworkId)).then(res => {
      setSubmitHomework(res)
      console.log(res)
    })
  })

  async function getFilesList(path: string) {
    axios.get(`http://127.0.0.1:8888/api/v1/file/${path}`, {
      responseType: 'blob',
      timeout: 3000,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      // console.log(res.data)
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(new Blob([res.data]));
      //设置链接的下载属性和文件名
      const result = path.split("\\");
      link.download = result[result.length - 1]
      //触发点击事件
      link.click();
      //释放虚拟链接
      window.URL.revokeObjectURL(link.href);
    })
  }

  function mutualAssessment() {
    return <Paper sx={{ padding: 4 }}>
      <div class="mt-4">
        <div class="font-bold text-xl">
          互评作业：
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>编号</TableCell>
                <TableCell>评论</TableCell>
                <TableCell>成绩</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <For each={commentTasks()}>{(commentTask, i) => <TableRow>
                <TableCell>{i() + 1}</TableCell>
                <TableCell>
                  <p class="text-ellipsis overflow-hidden">
                    {commentTask.comment}
                  </p>
                </TableCell>
                <TableCell>
                  {commentTask.score}
                </TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    size='small'
                    onClick={() => { navigate(`submissions/${commentTask.homeworkSubmissionId}/comment`) }}
                  // disabled={commentTask.done}
                  >
                    {commentTask.done ? "已批改" : "批改"}
                  </Button>
                </TableCell>
              </TableRow>}
              </For>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Paper>
  }
  function submit() {
    return <Paper sx={{ padding: 4 }}>
      <div class="mt-4">
        <div class="font-bold text-xl">
          提交的作业：
        </div>
        <Show when={submitHomework()}>
          <div>
            {submitHomework().content}
          </div>
          <For each={submitHomework().file_paths}>
            {(file, i) => <div>
              <Button
                onClick={() => {
                  getFilesList(file)
                }}>
                {getFilename(file)}
              </Button>
            </div>}
          </For>
        </Show>

        <Show when={!submitHomework()}>
          <div>
            没交作业
          </div>
        </Show>
      </div>
    </Paper>
  }

  return (
    <Show when={homework()}>
      <HomeworkSubmitModal homeworkId={() => homework().ID} open={submitModalOpen} setOpen={setSubmitModalOpen} />
      <div class='flex-1 flex flex-col gap-4 w-100% max-w-[80%]'>

        {/* 作业信息 */}
        <Paper sx={{
          padding: 4, "& .content": {
            textIndent: 32,
            // overflowWrap: "break-word",
            wordBreak: "break-all",
          }
        }}>
          <div class='flex flex-col gap-2'>
            <div class='flex justify-between'>
              <span style="font-size: 32px; font-weight: bold;">{homework().name}</span>
              <Button disabled={isEnded(homework()) || notStartYet(homework())} variant='contained' onClick={() => { setSubmitModalOpen(true) }}>提交作业</Button>
            </div>
            <Typography variant='caption' sx={{ color: "#999999" }}>
              {"截止时间:" + formatDateTime(homework().endDate)}
            </Typography>

            <Divider />

            <div class="font-bold text-xl">
              作业内容：
            </div>
            <div class="content">
              {homework().description}
            </div>
            <For each={fileList()}>
              {(file, i) => <div>
                <Button
                  onClick={() => {
                    getFilesList(file)
                  }}>
                  {getFilename(file)}
                </Button>
              </div>}
            </For>
          </div>
        </Paper>

        <div class='flex w-full gap-2 mb-2'>
          <Button sx={{ borderBottom: tab() == 'mutualAssessment' ? 1 : 0 }} onClick={() => { setTab('mutualAssessment') }}>
            互评作业
          </Button>
          <Button sx={{ borderBottom: tab() == 'submit' ? 1 : 0 }} onClick={() => { setTab('submit') }}>
            提交作业
          </Button>
        </div>

        <Show when={homework()}>
          <Switch fallback={<></>}>
            <Match when={tab() == 'mutualAssessment'}>
              {mutualAssessment()}
            </Match>
            <Match when={tab() == 'submit'}>
              {submit()}
            </Match>
          </Switch>
        </Show>
      </div>
    </Show>
  );
}
