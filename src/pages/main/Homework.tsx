import { useParams } from '@solidjs/router';
import { For, Match, Show, Switch, createSignal, onMount } from 'solid-js';
import { homeworklists, getHomework, Homework } from '../../lib/homework'
import { Button, Card, CardContent, Typography, Divider, TextField, } from '@suid/material';
import { UserCoursesStore } from '../../lib/store';
export default function Homeworks() {
  const params = useParams();
  const [homeworks, setHomeworks] = createSignal<Homework>({ ID: 0, name: "", CourseID: 0, files: null, description: "", beginDate: "", endDate: "", commentenddate: "" });
  onMount(() => {
    getHomework(parseInt(params.id)).then((res) => {
      setHomeworks(res);
      // console.log('homework: ', res)
      console.log(homeworks().files)
    });
  })

  return (
    <div class='flex flex-col' style={{ width: '80%' }}>
      <div class='flex-1'>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h3" component="div">
              {"作业名：" + homeworks().name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'red' }}>
              {"作业截止时间:" + homeworks().endDate}
              <br />
              content content
            </Typography>
          </CardContent>
        </Card>
      </div>

      <div class="font-bold text-xl">
        作业内容：
      </div>
      <div class="text-sm text-gray-500 ml-24">
        {homeworks().description}
      </div>

      <Divider />
      <div class="mt-4">
        <label class="font-bold text-xl block text-gray-700 text-sm font-bold mb-2" for="inputField">
          请输入答案：
        </label>
        <form class="mt-4">
          <label class="block text-sm">选择附件：</label>
          <input
            type="file"
            name="attachment"
            // onChange={handleFileChange}
            class="border border-gray-300 p-2 mt-1 rounded"
            multiple
            required
          />
        </form>
        <textarea
          id="textAreaField"
          // value={text()}
          // onInput={handleTextAreaChange}
          rows="16"
          class="w-full px-3 py-2 border rounded-md text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      <Divider />
      <Button style={{ width: '8%' }} variant='contained' size='small'>
        提交作业
      </Button>
      <Button style={{ width: '8%' }}>
        互评作业
      </Button>
    </div>
  );
}
