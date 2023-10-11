import { Route, Outlet } from '@solidjs/router'
import Courses from "./Courses"
import { Button, Card, CardContent, Divider, TextField, Typography } from '@suid/material'
import { For, Show, createSignal, onMount } from 'solid-js'

export default function Create() {
    const [teachingLessons, setTeachingLessons] = createSignal([])
    const [learningLessons, setLearningLessons] = createSignal([])
  
    return (
        <div class='flex-1 flex justify-center'>
          <div class='flex flex-col gap-4'>
            <div class='flex flex-col gap-2'>
                <div class='flex items-center justify-between'>
                <span style="font-size: 24px; font-weight: bold;">创建课程</span>
                </div>
                <span>创建课程需要输入课程名字,开始日期,结束日期,课程简介</span>
            </div>
      
            <Divider />
      
            <div class='flex flex-col gap-2'>
              <TextField label="search" size='small' />
            </div>
          </div>
        </div>
      );
}