import { Box, Button, Modal, Paper, TextField, Typography, useTheme } from "@suid/material"
import { Accessor, Setter, Signal, createSignal } from "solid-js"
import { createStore } from "solid-js/store"
import { postFormData } from "../lib/axios"

export default function HomeworkSubmitModal(props: { homeworkId: number, open: Accessor<boolean>, setOpen: Setter<boolean> }) {
  const { homeworkId, open, setOpen } = props
  const theme = useTheme()

  const [content, setContent] = createSignal("")
  const [files, setFiles] = createStore<File[]>([])

  function onSubmit() {
    console.log("onSubmit")

    const formData = new FormData()
    files.forEach((file) => {
      formData.append("files", file)
    })
    formData.set("content", content())

    postFormData(`/v1/homeworks/${homeworkId}/submits`, formData).then((res) => {
      console.log(res)
      setOpen(false)
    }).catch((err) => {
      console.error(err)
    })
  }

  return <>
    <Modal
      open={open()}
      onClose={() => { setOpen(false) }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          maxWidth: "1000px",
          maxHeight: "80%",
          overflowY: "auto",
          boxShadow: "24px",
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 1
        }}
      >
        <Typography id="modal-modal-title" variant="h5" component="h2">
          提交作业
        </Typography>

        <span class='text-sm'>作业内容</span>
        <TextField
          size='small'
          value={content()}
          minRows={4}
          multiline
          onChange={(_event, value) => {
            setContent(value)
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

        <div class="flex gap-2">
          <Button variant="contained" onClick={onSubmit}>提交</Button>
          <Button variant="outlined" onClick={() => {setOpen(false)}}>取消</Button>
        </div>

      </Paper>
    </Modal>
  </>
}