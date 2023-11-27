import { Avatar, Button, Divider, TextField } from '@suid/material'
import { createSignal, onMount } from 'solid-js'
import { create } from '../../lib/course'
import DatePicker, { PickerValue } from "@rnwonder/solid-date-picker";
import { useNavigate } from '@solidjs/router';
import { AlertsStore } from '../../lib/store';


export default function Create() {
  const [dateRange, setDateRange] = createSignal<PickerValue>({
    value: {},
    label: "",
  });

  const [courseName, setCourseName] = createSignal('')
  const [description, setDescription] = createSignal('')
  const [username, setUsername] = createSignal('')

  onMount(() => {
    setUsername(localStorage.getItem('homework-platform-username'))
  })

  const navigate = useNavigate()
  const { newSuccessAlert, newWarningAlert, newErrorAlert } = AlertsStore()

  function createCourse() {
    let beginDate = new Date(dateRange().value.start)
    let endDate = new Date(dateRange().value.end)
    console.log("createCourse", beginDate, endDate)

    create(courseName(), description(), beginDate, endDate).then((res) => {
      newSuccessAlert('成功创建课程');
      const id = res.data
      navigate(`/course/${id}`)
    }).catch((err) => {
      newWarningAlert('课程创建失败')
      console.error(err)
    })
  }

  return (
    <div class='flex-1 justify-center mt-10 mb-10 m-10 pl-6 pr-6'>
      <div class='flex flex-col gap-4'>

        <div class='flex flex-col gap-1'>
          <div class='flex items-center justify-between'>
            <span style="font-size: 24px; font-weight: bold;">创建课程</span>
          </div>
        </div>

        <Divider />

        <div class='flex flex-col gap-2'>
          <div class='flex items-center gap-2 h-17'>
            <div class='flex flex-col gap-2 h-full'>
              <span>创建者</span>
              <div class='flex flex-1 items-center gap-2'>
                <Avatar sx={{ width: 30, height: 30 }}>{username()?.at(0)}</Avatar>
                <span>
                  {username()}
                </span>
              </div>
            </div>

            <div class='h-full text-3xl mt-16'>
              /
            </div>

            <div class='flex flex-col gap-2 h-full'>
              <span>课程名字</span>
              <div class='flex'>
                <TextField
                  size='small'
                  value={courseName()}
                  onChange={(_event, value) => {
                    setCourseName(value)
                  }} />
              </div>
            </div>
          </div>

          <span class='text-sm'>课程简介</span>
          <TextField
            size='small'
            value={description()}
            onChange={(_event, value) => {
              setDescription(value)
            }}
          />

          <div class='pr-2'>
            <span class='text-sm'>课程起止日期</span>
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

          </div>
        </div>
        <div>
        </div>
        <Divider />


        <div class='flex flex-col gap-1' style="align-self: flex-end;">
          <Button
            variant='contained'
            size='small'
            onClick={() => {
              if (courseName() && description() && dateRange().value.start && dateRange().value.end) {
                createCourse()
              }else{
                newErrorAlert('请填写全部课程信息')
              }
            }}>
            创建课程
          </Button>
        </div>
      </div>
    </div >
  );
}