import { Button, Modal, Paper, TextField, Typography } from "@suid/material"
import { Accessor, Setter, createEffect, createSignal } from "solid-js"
import { SetStoreFunction, createStore } from "solid-js/store"
import { postFormData } from "../lib/axios"
import FileUploader from "./FileUploader"
import { StudentHomework } from "../lib/homework"
import { AlertsStore } from "../lib/store"
import { askPicture } from "../lib/homework"
import { askQuestion } from "../lib/homework"

export default function AskSpark(props: { open: Accessor<boolean>, setOpen: Setter<boolean> }) {
  const { open, setOpen } = props

  const [content, setContent] = createSignal("")
  const [answer, setAnswer] = createSignal("")
  const [files, setFiles] = createStore<File[]>([])

  //   function submitPicture() {
  //     const formData = new FormData()
  //     files.forEach((file) => {
  //       formData.append("files", file)
  //     })

  //     postFormData(`/v1/ai/spark/image`, formData).then((res) => {
  //         console.log(res.data)
  //         setOpen(false)
  //         newSuccessAlert('提交成功')
  //       }).catch((err) => {
  //         console.error(err)
  //       })

  //   }



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
          sx={{
            overflowY: 'auto'
          }}
          onChange={(_event, value) => {
            setContent(value)
          }}
        />

        <span class='text-sm'>回答</span>
        <TextField
          value={answer()}
          size='small'
          minRows={2}
          multiline>

        </TextField>

        <div class="flex gap-2">
          <Button variant="contained" onClick={() => {
            askQuestion(content()).then((res) => {
              console.log(res.data)
              setAnswer(res.data)
            }).catch((err) => {
              console.error(err)
            })
          }}>询问</Button>
          <Button variant="outlined" onClick={() => { setOpen(false) }}>取消</Button>
        </div>

      </Paper>
    </Modal>
  </>
}

function newSuccessAlert(arg0: string) {
  throw new Error("Function not implemented.")
}
