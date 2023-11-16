import { Box, Button, Divider, TextField } from '@suid/material'
import { For, createSignal,onMount } from 'solid-js'
import DatePicker, { PickerValue } from "@rnwonder/solid-date-picker";
import { useNavigate } from '@solidjs/router';
import { useParams } from '@solidjs/router';
import { postFormData } from '../../../lib/axios';
import { getHomework, isEnded, notStartYet, StudentHomework,homeworksComment } from '../../../lib/homework'
import { createStore } from 'solid-js/store';
import { createCourseHomework } from '../../../lib/course';
import { DeleteOutline } from '@suid/icons-material';
import FileUploader from '../../../components/FileUploader';

export default function HomeworkEdit() {
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



  onMount(() => {
    getHomework(parseInt(params.homeworkId)).then((res) => {
        setHomeworkName(res.name)
        setDescription(res.description)
        // setDateRange()
        // setcommentdateend()
    //   setHomework(res);
    //   console.log(homework())
    });
  })

  const [name, setHomeworkName] = createSignal('')
  const [description, setDescription] = createSignal('')
  const [files, setFiles] = createStore<File[]>([])

  const navigate = useNavigate()

//   onMount(() => {
//    console.log(params.homeworkId)
//     });


  function createHomework() {
    // TODO: Make a toast
    if (!name() || !description() || !dateRange().value.start || !dateRange().value.end || !commentDateEnd().value.selected) {
      return
    }

    let beginDate = new Date(dateRange().value.start)
    let endDate = new Date(dateRange().value.end)
    let commentEndDate = new Date(commentDateEnd().value.selected)

    createCourseHomework(parseInt(params.courseId), name(), description(), beginDate, endDate, commentEndDate, files).then((res) => {
      console.log('Created homework: ', res)
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