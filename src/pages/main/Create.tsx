import { Route, Outlet } from '@solidjs/router'
import { Button, Card, CardContent, Divider, TextField, Typography } from '@suid/material'
import { For, Show, createSignal, onMount } from 'solid-js'
import { create } from '../../lib/course'


export default function Create() {

  const [courseName, setCourseName] = createSignal('')
  const [description, setDescription] = createSignal('')

  const [beginYear, setBeginYear] = createSignal('')
  const [beginMonth, setBeginMonth] = createSignal('')
  const [beginDay, setBeginDay] = createSignal('')

  const [endYear,  setEndYear] = createSignal('')
  const [endMonth, setEndMonth] = createSignal('')
  const [endDay,   setEndDay] = createSignal('')

  function createCourse() {
    let beginDate = new Date();
    beginDate.setFullYear(parseInt(beginYear()), parseInt(beginMonth()), parseInt(beginDay()))

    let endDate = new Date();
    endDate.setFullYear(parseInt(endYear()), parseInt(endMonth()), parseInt(endDay()))

    create(courseName(), description(), beginDate, endDate).then((res) => {
      console.log(res)
      const data = res.data

    }).catch((err) => {
      console.error(err)
    })
  }

  return (
    <div class='flex-1 flex justify-center'>
      <div class='flex flex-col gap-4'>
        <div class='flex flex-col gap-1'>
          <div class='flex items-center justify-between'>
            <span style="font-size: 24px; font-weight: bold;">创建课程</span>
          </div>
          <span style="color : gray">创建课程需要输入课程名字,开始日期,结束日期,课程简介</span>
        </div>

        <Divider />

        <div class='flex flex-col gap-2'>
          <div style="font-style: italic; color: gray;">以下空行为必填内容</div>
          <span>课程名字</span>
          <TextField
            label="课程名字"
            size='small'
            value={courseName()}
            onChange={(_event, value) => {
              setCourseName(value)
            }} />
          <div class='flex gap-2 items-center'>
            <span>开始日期</span>
            <TextField sx={{ width: 100 }} size='small' label='年' type='number' value={beginYear()} onChange={(_event, value) => { if (parseInt(value) > 0) setBeginYear(value) }} />
            <TextField sx={{ width: 70 }} size='small' label='月' type='number' value={beginMonth()} onChange={(_event, value) => { if (parseInt(value) > 0) setBeginMonth(value) }} />
            <TextField sx={{ width: 70 }} size='small' label='日' type='number' value={beginDay()} onChange={(_event, value) => { if (parseInt(value) > 0) setBeginDay(value) }} />
          </div>
          <div class='flex gap-2 items-center'>
            <span>结束日期</span>
            <TextField sx={{ width: 100 }} size='small' label='年' type='number' value={endYear()} onChange={(_event, value) => { if (parseInt(value) > 0) setEndYear(value) }} />
            <TextField sx={{ width: 70 }} size='small' label='月' type='number' value={endMonth()} onChange={(_event, value) => { if (parseInt(value) > 0) setEndMonth(value) }} />
            <TextField sx={{ width: 70 }} size='small' label='日' type='number' value={endDay()} onChange={(_event, value) => { if (parseInt(value) > 0) setEndDay(value) }} />
          </div>
          <span>课程简介</span>
          <TextField
            label="课程简介"
            size='small'
            value={description()}
            onChange={(_event, value) => {
              setDescription(value)
            }}
          />
        </div>
        <div>
        </div>
        <Divider />


        <div class='flex flex-col gap-1' style="align-self: flex-end;">
          <Button
            variant='contained'
            size='small'
            onClick={() => {
              if (courseName() && description() && beginYear() && beginMonth() && beginDay() && endYear() && endMonth() && endDay()) {
                createCourse()
              }
            }}>
            创建课程
          </Button>
        </div>
      </div>
    </div>
  );
}