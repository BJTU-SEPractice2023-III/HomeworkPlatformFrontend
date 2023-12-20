import { Button, Divider, TextField } from '@suid/material'
import { createSignal } from 'solid-js'
import DatePicker, { PickerValue } from "@rnwonder/solid-date-picker";
import { useNavigate } from '@solidjs/router';
import { useParams } from '@solidjs/router';
import { createStore } from 'solid-js/store';
import { createCourseHomework } from '../../../lib/course';
import FileUploader from '../../../components/FileUploader';
import { AlertsStore } from '../../../lib/store';

export default function CreateHomework() {
  const params = useParams();
  const [dateRange, setDateRange] = createSignal<PickerValue>({
    value: {
      start: (new Date()).toString(),
      end: (new Date()).toString()
    },
    label: "",
  });

  const [commentDateEnd, setcommentdateend] = createSignal<PickerValue>({
    value: {
      selected: (new Date()).toString()
    },
    label: "",
  });
  const commentHourOptions = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'
  ];

  const commentMinuteOptions = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60'
  ];

  const commentSecondOptions = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60'
  ];

  const [beginDateHour, setBeginDateHour] = createSignal(0)
  const [beginDateMinute, setBeginDateMinute] = createSignal(0)
  const [beginDateSecond, setBeginDateSecond] = createSignal(0)

  const [endDateHour, setEndDateHour] = createSignal(0)
  const [endDateMinute, setEndDateMinute] = createSignal(0)
  const [endDateSecond, setEndDateSecond] = createSignal(0)

  const [commentEndDateHour, setCommentEndDateHour] = createSignal(0)
  const [commentEndDateMinute, setCommentEndDateMinute] = createSignal(0)
  const [commentEndDateSecond, setCommentEndDateSecond] = createSignal(0)


  const [name, setHomeworkName] = createSignal('name')
  const [description, setDescription] = createSignal('desc')
  const [files, setFiles] = createStore<File[]>([])
  const { newSuccessAlert, newWarningAlert, newErrorAlert } = AlertsStore()

  const navigate = useNavigate()

  function createHomework() {
    // TODO: Make a toast
    if (!name() || !description() || !dateRange().value.start || !dateRange().value.end || !commentDateEnd().value.selected) {
      newWarningAlert('请填写作业全部信息')
      return
    }

    let beginDate = new Date(dateRange().value.start)
    beginDate.setHours(beginDateHour(), beginDateMinute(), beginDateSecond())
    console.log('beginDate: ', beginDate)
    let endDate = new Date(dateRange().value.end)
    endDate.setHours(endDateHour(), endDateMinute(), endDateSecond())
    let commentEndDate = new Date(commentDateEnd().value.selected)
    commentEndDate.setHours(commentEndDateHour(), commentEndDateMinute(), commentEndDateSecond())

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
        </div>
        <div class='flex-col gap-10'>
          <span class='text-sm'>作业起止日期</span>
          <DatePicker
            inputClass='rounded border-[#00000045] border-1 h-5.5 p-2 text-[#777777] mt-2'
            value={dateRange}
            setValue={setDateRange}
            type='range'
            onChange={(data) => {
              if (data.type === "range") {
                console.log(data.startDate, data.endDate);
              }
            }} />
          <div>

            <span class='text-sm'>开始 时</span>
            <select
              class='rounded border-[#00000045]'
              value={beginDateHour()}
              onChange={(event) => setBeginDateHour(parseInt(event.target.value))}
            >
              {commentMinuteOptions.map((time) => (
                <option value={parseInt(time)}>{time}</option>
              ))}
            </select>

            <span class='text-sm'>分</span>
            <select
              class='rounded border-[#00000045]'
              value={beginDateMinute()}
              onChange={(event) => setBeginDateMinute(parseInt(event.target.value))}
            >
              {commentMinuteOptions.map((time) => (
                <option value={parseInt(time)}>{time}</option>
              ))}
            </select>

            <span class='text-sm'>秒</span>
            <select
              class='rounded border-[#00000045]'
              value={beginDateSecond()}
              onChange={(event) => setBeginDateSecond(parseInt(event.target.value))}>
              {commentMinuteOptions.map((time) => (
                <option value={parseInt(time)}>{time}</option>
              ))}
            </select>
          </div>

          <div>
            <span class='text-sm'>结束 时</span>
            <select
              class='rounded border-[#00000045]'
              value={endDateHour()}
              onChange={(event) => setEndDateHour(parseInt(event.target.value))}>
              {commentMinuteOptions.map((time) => (
                <option value={parseInt(time)}>{time}</option>
              ))}
            </select>
            <span class='text-sm'>分</span>
            <select
              class='rounded border-[#00000045]'
              value={endDateMinute()}
              onChange={(event) => setEndDateMinute(parseInt(event.target.value))}>
              {commentMinuteOptions.map((time) => (
                <option value={parseInt(time)}>{time}</option>
              ))}
            </select>
            <span class='text-sm'>秒</span>
            <select
              class='rounded border-[#00000045]'
              value={endDateSecond()}
              onChange={(event) => setEndDateSecond(parseInt(event.target.value))}>
              {commentMinuteOptions.map((time) => (
                <option value={parseInt(time)}>{time}</option>
              ))}
            </select>
          </div>

          <span class='text-sm'>评论截止日期</span>
          <DatePicker
            inputClass='rounded border-[#00000045] border-1 h-5.5 p-2 text-[#777777] mt-2'
            value={commentDateEnd}
            setValue={setcommentdateend}
            type='single'
            onChange={(data) => {
              if (data.type === "single") {
                console.log(data);
              }
            }} />

          <span class='text-sm'>时</span>
          <select
            class='rounded border-[#00000045]'
            value={commentEndDateHour()}
            onChange={(event) => setCommentEndDateHour(parseInt(event.target.value))}>
            {commentMinuteOptions.map((time) => (
              <option value={parseInt(time)}>{time}</option>
            ))}
          </select>
          <span class='text-sm'>分</span>
          <select
            class='rounded border-[#00000045]'
            value={commentEndDateMinute()}
            onChange={(event) => setCommentEndDateMinute(parseInt(event.target.value))}>
            {commentMinuteOptions.map((time) => (
              <option value={parseInt(time)}>{time}</option>
            ))}
          </select>
          <span class='text-sm'>秒</span>
          <select
            class='rounded border-[#00000045]'
            value={commentEndDateSecond()}
            onChange={(event) => setCommentEndDateSecond(parseInt(event.target.value))}>
            {commentMinuteOptions.map((time) => (
              <option value={parseInt(time)}>{time}</option>
            ))}
          </select>

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