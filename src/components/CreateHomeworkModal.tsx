import DatePicker, { PickerValue } from "@rnwonder/solid-date-picker"
import { Box, Modal, TextField, Typography, useTheme } from "@suid/material"
import { Signal, createSignal } from "solid-js"
import { createStore } from "solid-js/store"

export default function CreateHomeworkModal(props: { open: Signal<boolean> }) {
  const [open, setOpen] = props.open
  const theme = useTheme()

  const [name, setName] = createSignal("")
  const [description, setDescription] = createSignal("")
  const [files, setFiles] = createStore<File[]>([])

  const [dateRange, setDateRange] = createSignal<PickerValue>({
    value: {
      start: "2021-01-31T23:00:00.000Z",
      end: "2021-02-04T23:00:00.000Z"
    },
    label: "",
  });

  const [commentdateend, setcommentdateend] = createSignal<PickerValue>({
    value: {
      selected: "2021-01-31T23:00:00.000Z"
    },
    label: "",
  });

  const [date, setDate] = createSignal<Date>();

  return <>
    <Modal
      open={open()}
      onClose={() => { setOpen(false) }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          maxWidth: "1000px",
          bgcolor: theme.palette.background.paper,
          boxShadow: "24px",
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          创建作业
        </Typography>

        <span>作业名字</span>
        <div class='flex'>
          <TextField
            size='small'
            value={name()}
            onChange={(_event, value) => {
              setName(value)
            }} />
        </div>

        <span class='text-sm'>作业内容</span>
        <TextField
          size='small'
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
            onChange={(event) => {
              setFiles([...files, ...event.target.files]);
            }}
            class="border border-gray-300 p-2 mt-1 rounded"
            multiple
            required
          />
        </form>

        <div class='pr-2'>
          <span class='text-sm'>作业起止日期</span>


          <DatePicker
            datePickerWrapperClass="z-24"
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
            type='single'
            onChange={(data) => {
              if (data.type === "single") {
                console.log(data);
              }
            }} />

        </div>

      </Box>
    </Modal>
  </>
}