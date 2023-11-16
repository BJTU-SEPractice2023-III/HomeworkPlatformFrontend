import { useParams } from '@solidjs/router';
import { Button, Card, CardContent, Divider, TextField, Typography } from '@suid/material'
import { Show, createSignal, onMount } from 'solid-js';

export default function CommentHomework() {
    const params = useParams();
    const [score, setScore] = createSignal();
    const [comments, setComments] = createSignal('');
    const handleScoreChange = (event) => {
        const newValue = parseInt(event.target.value, 10); // 解析输入的新值为整数
        setScore(newValue); // 更新状态值
    };


    return (
        <div class='flex-1 flex w-full'>
            <div class='flex flex-col gap-2 w-full'>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            作业名
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            截止日期
                        </Typography>
                        <Typography variant="body2">
                            作业内容
                            <br />
                            作业内容
                        </Typography>
                    </CardContent>
                </Card>
            </div>

            <aside class='min-w-[250px] border-0 border-l border-solid border-slate-200 p-6 flex flex-col gap-4'>
                <div class='flex flex-col gap-2'>
                    评分：
                </div>
                <input
                    id="numberSelector"
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    class="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    onChange={handleScoreChange}
                />
                <Divider />
                <div class='flex flex-col gap-2'>
                    评论：
                </div>
                <TextField
                    size='small'
                    value = {comments()}
                    onChange={(_event, value) => {
                        setComments(value)
                      }}
                />

                <Button variant='contained'>
                    提交批改
                </Button>

            </aside>
        </div>
    );
}