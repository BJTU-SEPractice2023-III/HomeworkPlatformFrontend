import { useParams, useRouteData } from '@solidjs/router';
import { Show, createEffect, createSignal, onMount } from 'solid-js';
import { Homework, isEnded, notStartYet, getHomeworkComments, StudentHomework, getSubmissionById as getHomeworkUserSubmission, getHomework, isCommentEnded } from '../../../lib/homework';
import { Button, Typography, Divider, Paper, Badge } from '@suid/material';
import { For } from 'solid-js';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@suid/material";
import { formatDateTime } from '../../../lib/utils';
import HomeworkSubmitModal from '../../../components/HomeworkSubmitModal';
import { useNavigate } from '@solidjs/router';
import { CommentTask } from '../../../lib/homework';
import { HomeworkData } from '../../..';
import { Switch, Match } from 'solid-js';
import * as echarts from 'echarts';
import axios from 'axios';
import { getMyComment } from '../../../lib/homework';
import LookComment from '../../../components/LookComments';
import { getMyGrade } from '../../../lib/homework';
import { AlertsStore, LoginInfoStore } from '../../../lib/store';
import { HomeWork } from '@suid/icons-material';


export default function HomeworkDetail() {
  const { user } = LoginInfoStore();
  const params = useParams();
  const { course, homework, mutateHomework, refetchHomework } = useRouteData<typeof HomeworkData>();

  const [tab, setTab] = createSignal('submit');

  const navigate = useNavigate();
  const [submission, setSubmission] = createSignal<Homework>();
  const [myComments, setMyComments] = createSignal<CommentTask[]>([]);
  const [commentTasks, setCommentTasks] = createSignal<CommentTask[]>([]);
  const [myGrade, setMyGrade] = createSignal(0);

  const [submitModalOpen, setSubmitModalOpen] = createSignal(false);
  const [lookCommentsModelOpen, setLookCommentsModelOpen] = createSignal(false);

  // const [theFirstFraction,setTheFirstFraction] = createSignal(0);
  // const [theSecondFraction,setTheSecondFraction] = createSignal(0);
  // const [theThirdFraction,setTheThirdFraction] = createSignal(0);
  // const [theFourthFraction,setTheFourthFraction] = createSignal(0);
  // const [thefifthFraction,setTheFifthFraction] = createSignal(0);

  let theFirstFraction = 0;
  let theSecondFraction = 0;
  let theThirdFraction = 0;
  let theFourthFraction = 0;
  let theFifthFraction = 0;

  onMount(() => {
    getHomeworkComments(parseInt(params.homeworkId)).then((res) => {
      console.log(`homework comments: `, res.comment_lists)
      setCommentTasks(res.comment_lists);
    })
    getHomeworkUserSubmission(parseInt(params.homeworkId)).then((res) => {
      console.log(`userSubmission: `, res)
      setSubmission(res);
    })
    getMyComment(parseInt(params.homeworkId)).then(res => {
      setMyComments(res);
      // console.log(res);
    });
    commentNumber();
    getMyGrade(parseInt(params.homeworkId)).then(
      res => {
        setMyGrade(res.Score);
      }
    );
  })

  const [commentNumbers, setCommentNumbers] = createSignal(0);
  let number = 0;
  function commentNumber() {
    for (let i = 0; i < commentTasks().length; i++) {
      if (commentTasks()[i].score == -1) {
        setCommentNumbers(number++);
      }
    }
  }
  function downloadFile(id: number, name: string) {
    axios.get(`http://127.0.0.1:8888/api/v2/file/${id}`, {
      responseType: 'blob',
      timeout: 3000,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
      }
    }).then((res) => {
      var link = document.createElement('a');
      console.log(res.data)
      link.href = window.URL.createObjectURL(new Blob([res.data]));
      // 设置链接的下载属性和文件名
      link.download = name;
      // 触发点击事件
      link.click();
      // 释放虚拟链接
      window.URL.revokeObjectURL(link.href);
    });
  }
  createEffect(() => {
    countTheScoreSegment();
    drawMyCharts(); // Move the drawing of the chart inside the effect
  });


  function countTheScoreSegment() {
    for (let i = 0; i < myComments().length; i++) {
      const score = myComments()[i].score;
      if (score <= 60) {
        theFirstFraction++;
      }
      else if (score > 60 && score <= 70) {
        theSecondFraction++;
      }
      else if (score > 70 && score <= 80) {
        theThirdFraction++;
      }
      else if (score > 80 && score <= 90) {
        theFourthFraction++;
      }
      else if (score > 90 && score <= 100) {
        theFifthFraction++;
      }
    }
  }

  function drawMyCharts() {
    var myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    myChart.setOption({
      title: {
        text: '学生成绩汇总'
      },
      tooltip: {},
      xAxis: {
        data: ['0-60', '61-70', '71-80', '81-90', '91-100']
      },
      yAxis: {},
      series: [
        {
          name: '人数',
          type: 'bar',
          data: [theFirstFraction, theSecondFraction, theThirdFraction, theFourthFraction, theFifthFraction]
        }
      ]
    });
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
                  <Show when={commentTask.score == -1}>
                    <Button
                      variant='contained'
                      size='small'
                      onClick={() => {
                        navigate(`submissions/${commentTask.homeworkSubmissionId}/comment`);
                        // addTodo(commentTask.commentId);
                      }}
                    >
                      {"批改"}
                    </Button>
                  </Show>

                  <Show when={commentTask.score != -1}>
                    <Button
                      variant='outlined'
                      size='small'
                      onClick={() => {
                        navigate(`submissions/${commentTask.homeworkSubmissionId}/comment`);
                        // addTodo(commentTask.commentId);
                      }}
                    >
                      {"已批改,可重新批改"}
                    </Button>
                  </Show>
                </TableCell>
              </TableRow>}
              </For>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Paper>;
  }
  function studentsScores() {
    return <Paper sx={{
      padding: 4,
    }}>
      <div class="flex" >
        <div id='main' class='flex-1' style="width: 400px;height:400px;"></div>

        <div class='flex flex-col'>
          <div class="font-bold text-xl mb-6">
            学生成绩列表
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>分数</TableCell>
                  <TableCell>查看</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <For each={myComments()}>{(studentList, i) => <TableRow>
                  <TableCell>{studentList.userId}</TableCell>
                  <TableCell>{studentList.score}</TableCell>
                  <TableCell>
                    <Button onClick={() => {

                    }
                    }>查看详情</Button>
                  </TableCell>
                </TableRow>
                }
                </For>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </Paper>
  }
  function submit() {
    return <div>
      <Paper sx={{ padding: 4 }}>
        <div class="mt-4">
          <div class="font-bold text-xl">
            提交的作业：
          </div>
          <Show when={submission()}>
            <div>
              {submission().content}
            </div>
            <For each={submission().files}>
              {(file, i) => <div>
                <Button
                  onClick={() => {
                    downloadFile(file.id, file.name);
                  }}>
                  {file.name}
                </Button>
              </div>}
            </For>
          </Show>

          <Show when={!homework}>
            <div>
              没交作业
            </div>
          </Show>
        </div>
      </Paper>

      <Divider />

      <Paper sx={{ padding: 4 }}>
        <div class="mt-4">
          <div class="font-bold text-xl">
            结果公示：
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>分数</TableCell>
                  <TableCell>评论</TableCell>
                  <TableCell>查看详情</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <For each={myComments()}>{(myComment, i) => <TableRow>
                  <TableCell>
                    <p class="text-ellipsis overflow-hidden">
                      {myComment.score}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p class="text-ellipsis overflow-hidden">
                      {myComment.comment}
                    </p>
                  </TableCell>
                  <TableCell>
                    <LookComment comment={() => myComment.comment} open={lookCommentsModelOpen} setOpen={setLookCommentsModelOpen} />
                    <Button
                      variant='contained'
                      size='small'
                      onClick={() => { setLookCommentsModelOpen(true); }}
                    >
                      查看详情
                    </Button>
                  </TableCell>
                </TableRow>}
                </For>
              </TableBody>

            </Table>
          </TableContainer>
          <Show when={myGrade() != -1}>
            <div>
              最终分数：{myGrade()}
            </div>
          </Show>
          <Show when={myGrade() == -1}>
            <div>
              最终分数：***
            </div>
          </Show>
        </div>
      </Paper >
    </div >;
  }

  return (
    <Show when={homework && homework()}>
      <HomeworkSubmitModal homeworkId={() => homework().ID} open={submitModalOpen} setOpen={setSubmitModalOpen} onSubmitted={() => {
        refetchHomework();
      }} />
      <div class='flex-1 flex flex-col gap-4 w-100% max-w-[80%]'>

        {/* 作业信息 */}
        <Paper sx={{
          padding: 4, "& .content": {
            textIndent: 32,
            // overflowWrap: "break-word",
            wordBreak: "break-all",
            width: 600
          }
        }}>
          <div class='flex flex-col gap-2'>
            <div class='flex justify-between'>
              <Typography variant='h4' component='div'>
                {homework().name}
              </Typography>
              <Switch>
                <Match when={!(course().teacherID == user().id)}>
                  <Button
                    disabled={isEnded(homework()) || notStartYet(homework())}
                    variant={homework().submitted ? 'outlined' : 'contained'} onClick={() => { setSubmitModalOpen(true); }}>
                    {(homework() as StudentHomework).submitted ? '已提交，重新提交' : "提交作业"}
                  </Button>
                </Match>
              </Switch>
            </div>
            <Typography variant='caption' sx={{ color: "#999999" }}>
              {"截止时间:" + formatDateTime(homework().endDate)}
            </Typography>

            <Divider />

            <Typography variant='h5' component='div'>
              作业内容：
            </Typography>
            <Typography component='div' sx={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}>
              {homework().description}
            </Typography>

            <For each={homework().files}>
              {(file, i) => <div>
                <Button
                  onClick={() => {
                    downloadFile(file.id, file.name);
                  }}>
                  {file.name}
                </Button>
              </div>}
            </For>
          </div>
        </Paper>

        <Switch>
          <Match when={course().teacherID == user().id}>
            {studentsScores()}
          </Match>
          <Match when={course().teacherID != user().id}>
            <div class='flex w-full gap-2 mb-2'>
              <Button sx={{ borderBottom: tab() == 'submit' ? 1 : 0 }} onClick={() => { setTab('submit'); }}>
                我的提交
              </Button>
              <Button sx={{ borderBottom: tab() == 'mutualAssessment' ? 1 : 0 }} onClick={() => { setTab('mutualAssessment'); }}>
                <Badge badgeContent={number} color="primary">
                  互评作业
                </Badge>
              </Button>
            </div>
          </Match>
        </Switch>

        <Show when={homework() && (course().teacherID != user().id)}>
          <Switch>
            <Match when={tab() == 'mutualAssessment'}>
              <Show when={new Date(homework().commentEndDate) > new Date()}>
                {mutualAssessment()}
              </Show>
              <Show when={new Date(homework().commentEndDate) < new Date()}>
                现在没有互评任务
              </Show>
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
