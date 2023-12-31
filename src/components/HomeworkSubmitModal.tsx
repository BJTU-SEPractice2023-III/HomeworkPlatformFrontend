import { Button, Modal, Paper, TextField, Typography } from "@suid/material"
import { Accessor, Setter, createEffect, createSignal } from "solid-js"
import { SetStoreFunction, createStore } from "solid-js/store"
import { postFormData } from "../lib/axios"
import FileUploader from "./FileUploader"
import { StudentHomework } from "../lib/homework"
import { AlertsStore } from "../lib/store"

export default function HomeworkSubmitModal(props: { homeworkId: Accessor<number>, onSubmitted: (id: number) => void, open: Accessor<boolean>, setOpen: Setter<boolean> }) {
  const { homeworkId, onSubmitted, open, setOpen } = props

  const [content, setContent] = createSignal("")
  const [files, setFiles] = createStore<File[]>([])
  const { newSuccessAlert, newWarningAlert, newErrorAlert } = AlertsStore()

  createEffect(() => {
    homeworkId()
    setContent("")
    setFiles([])
  })

  function onSubmit() {
    console.log("onSubmit")

    const formData = new FormData()
    files.forEach((file) => {
      formData.append("files", file)
    })
    formData.set("content", content())

    postFormData(`/v1/homeworks/${homeworkId()}/submits`, formData).then((res) => {
      onSubmitted(homeworkId())
      setOpen(false)
      newSuccessAlert('提交成功')
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

        <span class='text-sm'>内容</span>
        <TextField
          size='small'
          value={content()}
          minRows={4}
          multiline
          onChange={(_event, value) => {
            setContent(value)
          }}
          sx={{
            // height: /
            overflowY: 'auto'
          }}
        />

        <span class='text-sm'>附件</span>
        <FileUploader files={files} setFiles={setFiles} />

        <div class="flex gap-2">
          <Button variant="contained" onClick={onSubmit}>提交</Button>
          <Button variant="outlined" onClick={() => {setOpen(false)}}>取消</Button>
        </div>

      </Paper>
    </Modal>
  </>
}