import { Avatar, Button, Divider, TextField } from '@suid/material'
import { createSignal, onMount } from 'solid-js'
import { assignHomework } from '../../lib/homework'
import DatePicker, { PickerValue } from "@rnwonder/solid-date-picker";
import { useNavigate } from '@solidjs/router';
import { useParams, A } from '@solidjs/router';


export default function CreateHomework() {
    const [dateRange, setDateRange] = createSignal<PickerValue>({
        value: {},
        label: "",
    });

    const [commentdateend, setcommentdateend] = createSignal<PickerValue>({
        value: {},
        label: "",
    });

    const [homeworkName, setHomeworkName] = createSignal('')
    const [description, setDescription] = createSignal('')
    const [username, setUsername] = createSignal('')
    const [file, setFile] = createSignal<File>()

    onMount(() => {
        setUsername(localStorage.getItem('homework-platform-username'))
    })

    const navigate = useNavigate()

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        // 创建一个 FormData 对象
        const formData = new FormData();
        formData.append("attachment", file());

        // 使用 fetch API 
        fetch("/your-upload-endpoint", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    console.log("附件上传成功！");
                } else {
                    console.error("上传失败，请重试。");
                }
            })
            .catch((error) => {
                console.error("上传过程中出现错误：", error);
            });
    };

    function createHomework() {
        const params = useParams();
        let beginDate = new Date(dateRange().value.start)
        let endDate = new Date(dateRange().value.end)
        let commentenddate = new Date(commentdateend().value.end)
        assignHomework(file(), parseInt(params.id), homeworkName(), description(), beginDate, endDate, commentenddate).then((res) => {
            const id = res.data
            navigate(`/homework/${id}`)
        }).catch((err) => {
            console.error(err)
        })
    }

    return (
        <div class='flex-1 justify-center mt-10 mb-10 m-10 pl-6 pr-6'>
            <div class='flex flex-col gap-4'>

                <div class='flex flex-col gap-1'>
                    <div class='flex items-center justify-between'>
                        <span style="font-size: 24px; font-weight: bold;">布置作业</span>
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
                            <span>作业名字</span>
                            <div class='flex'>
                                <TextField
                                    size='small'
                                    value={homeworkName()}
                                    onChange={(_event, value) => {
                                        setHomeworkName(value)
                                    }} />
                            </div>
                        </div>
                    </div>

                    <span class='text-sm'>作业内容</span>
                    <TextField
                        size='small'
                        value={description()}
                        onChange={(_event, value) => {
                            setDescription(value)
                        }}
                    />
                    <form onSubmit={handleSubmit} class="mt-4">
                        <label class="block text-sm">选择附件：</label>
                        <input
                            type="file"
                            name="attachment"
                            onChange={handleFileChange}
                            class="border border-gray-300 p-2 mt-1 rounded"
                            required
                        />
                        <Button variant='contained'>
                            提交
                        </Button>
                    </form>

                    <div class='pr-2'>
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

                    </div>

                    <div class='pr-2'>
                        <span class='text-sm'>评论截止日期</span>
                        <DatePicker
                            inputClass='rounded border-[#00000045] border-1 h-5.5 p-2 text-[#777777] mt-2'
                            value={commentdateend}
                            setValue={setcommentdateend}
                            onChange={(data) => {
                            }} />

                    </div>
                </div>

                <Divider />


                <div class='flex flex-col gap-1' style="align-self: flex-end;">
                    <Button
                        variant='contained'
                        size='small'
                        onClick={() => {
                            if (homeworkName() && description() && dateRange().value.start && dateRange().value.end) {
                                createHomework()
                            }
                        }}>
                        创建作业
                    </Button>
                </div>
            </div>
        </div >
    );
}