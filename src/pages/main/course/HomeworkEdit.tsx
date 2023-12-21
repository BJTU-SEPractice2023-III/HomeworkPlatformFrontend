import { Button, Divider, TextField } from '@suid/material'
import { createSignal, onMount } from 'solid-js'
import { useNavigate } from '@solidjs/router';
import { useParams } from '@solidjs/router';
import { getHomework } from '../../../lib/homework'
import { createStore } from 'solid-js/store';
import FileUploader from '../../../components/FileUploader';
import { putHomework } from '../../../lib/homework';
import { AlertsStore } from '../../../lib/store';
import DateTimePicker from '../../../components/DateTimePicker';

export default function HomeworkEdit() {
  const params = useParams();
  const { newSuccessAlert, newWarningAlert, newErrorAlert } = AlertsStore()

  const [name, setHomeworkName] = createSignal('')
  const [description, setDescription] = createSignal('')
  const [files, setFiles] = createStore<File[]>([])
  const [beginTime, setBeginTime] = createSignal(new Date())
  const [endTime, setEndTime] = createSignal(new Date())
  const [commentEndTime, setCommentEndTime] = createSignal(new Date())

  onMount(() => {
    getHomework(parseInt(params.homeworkId)).then((res) => {
      console.log(res)
      setHomeworkName(res.name)
      setDescription(res.description)
      // setBeginTime(new Date(res.beginDate))
      // setEndTime(new Date(res.endDate))
      // setCommentEndTime(new Date(res.commentEndDate))
    });
  })


  const navigate = useNavigate()
  function modifyHomework() {
    // TODO: Make a toast
    if (!name() || !description() || !beginTime() || !endTime() || !commentEndTime()) {
      return
    }

    putHomework(parseInt(params.homeworkId), name(), description(), beginTime(), endTime(), commentEndTime(), files).then((res) => {
      console.log(beginTime(), endTime(), commentEndTime())
      newSuccessAlert('修改成功')
      navigate('../')
    }).catch((err) => {
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
            <DateTimePicker onDateTimeChanged={(date: Date) => { setBeginTime(date), console.log(beginTime()) }} error={() => beginTime() >= endTime()} errorInfo='开始时间不能晚于截止时间' />
          </div>
          <div class='flex items-center gap-2'>
            <span>截止时间</span>
            <DateTimePicker onDateTimeChanged={(date: Date) => { setEndTime(date), console.log(endTime()) }} error={() => beginTime() >= endTime()} errorInfo='截止时间不能早于开始时间' />
          </div>
          <div class='flex items-center gap-2'>
            <span>评论截止时间</span>
            <DateTimePicker onDateTimeChanged={(date: Date) => { setCommentEndTime(date), console.log(commentEndTime()) }} error={() => endTime() >= commentEndTime()} errorInfo='评论截止时间时间不能早于截止时间' />
          </div>
          <div class='flex flex-col gap-1 items-start'>
            <Button
              variant='contained'
              size='small'
              onClick={modifyHomework}>
              修改作业
            </Button>
          </div>
        </div>
        <Divider />
      </div>
    </div>
  );
}