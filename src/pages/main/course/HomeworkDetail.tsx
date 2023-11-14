import { useParams } from '@solidjs/router';
import { Show, createSignal, onMount } from 'solid-js';
import { getHomework, isEnded, notStartYet, StudentHomework } from '../../../lib/homework'
import { Button, Typography, Divider, Paper, } from '@suid/material';
import { formatDateTime } from '../../../lib/utils';
import HomeworkSubmitModal from '../../../components/HomeworkSubmitModal';

export default function HomeworkDetail() {
  const params = useParams();
  const [homework, setHomework] = createSignal<StudentHomework>();

  const [submitModalOpen, setSubmitModalOpen] = createSignal(false)

  onMount(() => {
    getHomework(parseInt(params.homeworkId)).then((res) => {
      setHomework(res);
      console.log(homework())
    });
  })

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
          </div>
        </Paper>

        {/* 提交作业 */}
        <Paper sx={{ padding: 4 }}>
          <div class="mt-4">
            <div class="font-bold text-xl">
              互评作业：
            </div>

          </div>
        </Paper>
      </div>
    </Show>
  );
}
