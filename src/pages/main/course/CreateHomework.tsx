import { Button, Divider, TextField } from '@suid/material'
import { createSignal } from 'solid-js'
import DatePicker, { PickerValue } from "@rnwonder/solid-date-picker";
import { useNavigate } from '@solidjs/router';
import { useParams } from '@solidjs/router';
import { postFormData } from '../../../lib/axios';
import { createStore } from 'solid-js/store';

export default function CreateHomework() {
  const params = useParams();
  const [dateRange, setDateRange] = createSignal<PickerValue>({
    value: {
      start: (new Date()).toString(),
      end: (new Date()).toString()
    },
    label: "",
  });

  const [commentdateend, setcommentdateend] = createSignal<PickerValue>({
    value: {
      selected: (new Date()).toString()
    },
    label: "",
  });

  const [homeworkName, setHomeworkName] = createSignal('name')
  const [description, setDescription] = createSignal('desc')
  const [files, setFiles] = createStore<File[]>([])

  const navigate = useNavigate()

  const handleFileChange = (event) => {
    console.log(event.target.files)
    setFiles([...files, ...event.target.files]);
  };

  function createHomework() {
    let beginDate = new Date(dateRange().value.start)
    let endDate = new Date(dateRange().value.end)
    let commentEndDate = new Date(commentdateend().value.selected)

    const formData = new FormData();
    for (let file in files) {
      formData.append("attachment", file);
    }
    formData.set("name", homeworkName())
    formData.set("description", description())
    formData.set("beginDate", `${beginDate}`);
    formData.set("endDate", `${endDate}`);
    formData.set("commentEndDate", `${commentEndDate}`);

    // createCourseHomework(parseInt(params.id), homeworkName(), description(), beginDate, endDate, commentEndDate, files)
    postFormData(`/v1/courses/${params.id}/homeworks`, formData).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.error(err)
    })
    // assignHomework(files(), parseInt(params.id), homeworkName(), description(), beginDate, endDate, commentEndDate).then((res) => {
    //     const id = res.data
    //     console.log(id)
    //     navigate(`/homework/${id}`)
    // }).catch((err) => {
    //     console.error(err)
    // })
  }


  return (
    <div class='flex flex-col gap-4 w-full max-w-[80%]'>

      <span style="font-size: 24px; font-weight: bold;">布置作业</span>

      <Divider />

      <div class="flex gap-4">
        <div class='flex flex-1 flex-col gap-2 w-full'>
          <span>作业名字</span>
          <TextField
            size='small'
            value={homeworkName()}
            onChange={(_event, value) => {
              setHomeworkName(value)
            }} />

          <span class='text-sm'>作业内容</span>
          <TextField
            size='small'
            minRows={4}
            multiline
            value={description()}
            onChange={(_event, value) => {
              setDescription(value)
            }}
          />
          <form class="mt-4">
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
            value={commentdateend}
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
          onClick={() => {
            console.log(homeworkName() && description() && dateRange().value.start && dateRange().value.end)
            if (homeworkName() && description() && dateRange().value.start && dateRange().value.end) {
              createHomework()
            }
          }}>
          布置作业
        </Button>
      </div>
    </div>
  );
}