import { useParams } from '@solidjs/router';
import { Show, createSignal, onMount } from 'solid-js';
import { getHomework, Homework } from '../../../lib/homework'
import { Button, Typography, Divider, Paper, } from '@suid/material';
import { createStore } from 'solid-js/store';
import { formatDateTime } from '../../../lib/utils';
import HomeworkSubmitModal from '../../../components/HomeworkSubmitModal';

export default function HomeworkDetail() {
  const params = useParams();
  const [homework, setHomework] = createSignal<Homework>();

  const [submitModalOpen, setSubmitModalOpen] = createSignal(false)

  onMount(() => {
    getHomework(parseInt(params.courseId)).then((res) => {
      setHomework(res);
      console.log(homework())
    });
  })

  return (
    <Show when={homework()}>

      <HomeworkSubmitModal homeworkId={homework().ID} open={submitModalOpen} setOpen={setSubmitModalOpen} />

      <div class='flex-1 flex flex-col gap-4 max-w-[80%]'>

        {/* 作业信息 */}
        <Paper sx={{
          padding: 4, "& .content": {
            textIndent: 32,
            // overflowWrap: "break-word",
            wordBreak: "break-all"
          }
        }}>
          <div class='flex flex-col gap-2'>
            <div class='flex justify-between'>
              <span style="font-size: 32px; font-weight: bold;">{homework().name}</span>
              <Button variant='contained' onClick={() => { setSubmitModalOpen(true) }}>提交作业</Button>
            </div>
            <Typography variant='caption' sx={{ color: "#999999" }}>
              {"截止时间:" + formatDateTime(homework().endDate)}
            </Typography>

            <Divider />

            <div class="font-bold text-xl">
              作业内容：
            </div>
            <div class="content">
              {homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + homework().description + ".................................................................................asfjkashfakslhfkhjsklahfjaklsdhflkatext-gray-500 ml-24text-gray-500 ml-24text-gray-500 ml-24text-gray-500 ml-24text-gray-500 ml-24text-gray-500 ml-24text-gray-500 ml-24text-gray-500 ml-24text-gray-500 ml-24text-gray-500 ml-24text-gray-500 ml-24"}
            </div>
          </div>
        </Paper>

        {/* 提交作业 */}
        <Paper sx={{ padding: 4 }}>
          <div class="mt-4">
            <div class="font-bold text-xl">
              作业提交：
            </div>

            {/* <form class="mt-4">
              <label class="block text-sm">选择附件：</label>
              <input
                type="file"
                name="attachment"
                onChange={handleFileChange}
                class="border border-gray-300 p-2 mt-1 rounded"
                multiple
                required
              />
            </form>
            <TextField
              id="textAnswer"
              value={answer()}
              onChange={(_event, value) => {
                setAnswer(value)
              }}
              class="w-full px-3 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
            /> */}
          </div>
          {/* <Divider />
          <Button
            onClick={() => {
              submitHomework()
            }}
            style={{ width: '8%' }}
            variant='contained'
            size='small'>
            提交作业
          </Button>
          <Button style={{ width: '8%' }}>
            互评作业
          </Button> */}
        </Paper>
      </div>
    </Show>
  );
}
