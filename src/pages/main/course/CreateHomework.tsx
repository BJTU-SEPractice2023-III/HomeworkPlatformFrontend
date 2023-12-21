import { Button, Divider, TextField } from '@suid/material'
import { createSignal } from 'solid-js'
import { useNavigate } from '@solidjs/router';
import { useParams } from '@solidjs/router';
import { createStore } from 'solid-js/store';
import { createCourseHomework } from '../../../lib/course';
import FileUploader from '../../../components/FileUploader';
import { AlertsStore } from '../../../lib/store';
import DateTimePicker from '../../../components/DateTimePicker';

export default function CreateHomework() {
  const params = useParams();
  const [beginTime, setBeginTime] = createSignal(new Date())
  const [endTime, setEndTime] = createSignal(new Date())
  const [commentEndTime, setCommentEndTime] = createSignal(new Date())

  const [name, setHomeworkName] = createSignal('name')
  const [description, setDescription] = createSignal('desc')
  const [files, setFiles] = createStore<File[]>([])
  const { newSuccessAlert, newWarningAlert, newErrorAlert } = AlertsStore()

  const navigate = useNavigate()

  function createHomework() {
    // TODO: Make a toast
    if (!name() || !description() || !beginTime() || !endTime()|| !commentEndTime()) {
      newWarningAlert('请填写作业全部信息')
      return
    }

    let beginDate = beginTime()
    let endDate = endTime()
    let commentEndDate = commentEndTime()

    createCourseHomework(parseInt(params.courseId), name(), description(), beginDate, endDate, commentEndDate, files).then((res) => {
      newSuccessAlert('作业创建成功')
      navigate('../')
    }).catch((err) => {
      newErrorAlert('作业创建失败')
      console.error('Create homework failed: ', err)
    })
  }

  return (
    <div class='flex flex-col gap-4 w-full max-w-[80%]'>
      <span style="font-size: 24px; font-weight: bold;">布置作业</span>
      <Divider />

      <div class="flex gap-4">
        <div class='flex flex-1 flex-col gap-2 w-full'>
          <span>标题</span>
          <TextField
            size='small'
            value={name()}
            onChange={(_event, value) => {
              setHomeworkName(value)
            }} />

          <span>内容</span>
          <TextField
            size='small'
            minRows={4}
            multiline
            value={description()}
            onChange={(_event, value) => {
              setDescription(value)
            }}
          />

          <span>附件</span>
          <FileUploader files={files} setFiles={setFiles} />
          <span class='text-sm'>作业起止日期</span>

          <div class='flex items-center gap-2'>
            <span>开始时间</span>
            <DateTimePicker onDateTimeChanged={(date: Date) => { setBeginTime(date) }} error={() => beginTime() >= endTime()} errorInfo='开始时间不能晚于截止时间' />
          </div>
          <div class='flex items-center gap-2'>
            <span>截止时间</span>
            <DateTimePicker onDateTimeChanged={(date: Date) => { setEndTime(date) }} error={() => beginTime() >= endTime()} errorInfo='截止时间不能早于开始时间'  />
          </div>
          <div class='flex items-center gap-2'>
            <span>评论截止时间</span>
            <DateTimePicker onDateTimeChanged={(date: Date) => { setCommentEndTime(date) }} error={() => endTime() >= commentEndTime()} errorInfo='评论截止时间时间不能早于截止时间'  />
          </div>
        </div>
      </div>
      <Divider />


      <div class='flex flex-col gap-1 items-start'>
        <Button
          variant='contained'
          size='small'
          onClick={createHomework}>
          布置作业
        </Button>
      </div>
    </div>
  );
}