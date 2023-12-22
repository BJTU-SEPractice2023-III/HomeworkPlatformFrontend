import { useParams } from '@solidjs/router';
import { Button, Card, CardContent, Divider, TextField, Typography } from '@suid/material'
import { For, Show, createSignal, onMount } from 'solid-js';
import { getSubmit, postComment, commentHomework } from '../../../lib/homework';
import { useNavigate } from '@solidjs/router';
import axios from 'axios';
import { AlertsStore } from '../../../lib/store';
export default function CommentHomework() {
  const params = useParams();
  const [score, setScore] = createSignal(0);
  const [content, setContent] = createSignal('');
  const [submit, setSubmit] = createSignal<commentHomework>();
  const { newSuccessAlert, newWarningAlert, newErrorAlert } = AlertsStore()
  const navigate = useNavigate()
  const [fileList, setfileList] = createSignal<string[]>([]);
  const handleScoreChange = (event, value) => {
    const newValue = parseInt(event.target.value, 10); // 解析输入的新值为整数
    console.log(value)

    if (0 <= newValue && newValue <= 100) {
      setScore(newValue); // 更新状态值
    } else {
      setScore(0)
    }
  };

  onMount(() => {
    getSubmit(parseInt(params.submissionId)).then((res) => {
      console.log(res)
      setSubmit(res)
      setfileList(res.file_paths)
    });
  })

  function submitComment() {
    if (content().length <= 0) {
      newWarningAlert('批改内容不能为空')
      return
    }
    postComment(parseInt(params.submissionId), score(), content()).then((res) => {
      console.log(score())
      console.log(content())
      newSuccessAlert('批改成功')
      navigate('../../../')
    }).catch(()=>{
      newErrorAlert('批改错误')
    });
  }
  const getFilename = (path: string) => {
    const parts = path.split('\\')
    return parts[parts.length - 1]
  }
  async function getFilesList(path: string) {
    axios.get(`http://127.0.0.1:8888/api/v1/file/${path}`, {
      responseType: 'blob',
      timeout: 3000,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      // console.log(res.data)
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(new Blob([res.data]));
      //设置链接的下载属性和文件名
      const result = path.split("\\");
      link.download = result[result.length - 1]
      //触发点击事件
      link.click();
      //释放虚拟链接
      window.URL.revokeObjectURL(link.href);
    })
  }

  return (
    <div class='flex-1 flex w-full'>
      <div class='flex flex-col gap-2 w-full'>
        <Show when={submit()}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                编号：{submit().ID}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                最近更新：{submit().UpdatedAt}
              </Typography>
              <Typography variant="body2">
                作业内容：{submit().content}
                <br />
                作业链接
                <For each={fileList()}>
                  {(file, i) => <div>
                    <Button
                      onClick={() => {
                        getFilesList(file)
                      }}>
                      {getFilename(file)}
                    </Button>
                  </div>}
                </For>
              </Typography>
            </CardContent>
          </Card>
        </Show>
      </div>

      <aside class='min-w-[250px] border-0 border-l border-solid border-slate-200 p-6 flex flex-col gap-4'>
        <div class='flex flex-col gap-2'>
          评分：
        </div>
        <TextField
          label="Controlled number"
          type="number"
          value={score()}
          onChange={handleScoreChange}
        />
        <Divider />
        <div class='flex flex-col gap-2'>
          评论：
        </div>
        <TextField
          size='small'
          minRows={6}
          multiline
          value={content()}
          onChange={(_event, value) => {
            setContent(value)
          }}
          sx={{
            height: '180px',
            overflowY: 'auto'
          }}
        />

        <Button
          variant='contained'
          onClick={() => {
            submitComment()
          }}>
          提交批改
        </Button>
      </aside>
    </div>
  );
}