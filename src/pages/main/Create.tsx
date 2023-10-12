import { Route, Outlet } from '@solidjs/router'
import Courses from "./Courses"
import { Button, Card, CardContent, Divider, TextField, Typography } from '@suid/material'
import { For, Show, createSignal, onMount } from 'solid-js'

export default function Create() {
    const [courseName, setCourseName] = createSignal([])
    const [beginDate, setBeginDate] = createSignal([])
    const [endDate, setEndDate] = createSignal([])
    const [description, setDescription] = createSignal([])
  
    return (
        <div class='flex-1 flex justify-center'>
          <div class='flex flex-col gap-4'>
            <div class='flex flex-col gap-2'>
                <div class='flex items-center justify-between'>
                <span style="font-size: 24px; font-weight: bold;">创建课程</span>
                </div>
                <span style="color : gray">创建课程需要输入课程名字,开始日期,结束日期,课程简介</span>
            </div>
      
            <Divider />
      
            <div class='flex flex-col gap-2'>
              <div style="font-style: italic; color: gray;">以下空行为必填内容</div>
              <span>课程名字</span><TextField label="课程名字" size='small' />
              <span>开始日期</span><TextField label="开始日期" size='small' />
              <span>结束日期</span><TextField label="结束日期" size='small' />
              <span>课程简介</span><TextField label="课程简介" size='small' />
            </div>
          </div>
        </div>
      );
}