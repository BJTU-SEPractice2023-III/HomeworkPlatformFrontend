import { Modal, Paper, TextField, Typography } from "@suid/material"
import { Accessor, Setter, Signal } from "solid-js"
import { For } from "solid-js/web"
export default function TeacherLookModel(props: { student: Signal<any[]> ,open: Signal<any[]>, setOpen: Setter<boolean> }) {
  const { student,open,setOpen } = props;

  return (<>
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

        <span class='text-sm'>作业内容</span>
          <TextField
            size='small'
            minRows={2}
            value={student.content}
            multiline
            sx={{
              overflowY: 'auto'
            }}
          />


        <span class='text-sm'>评论</span>
        <For each={student.Comments}>{(comments, i) =>
          <TextField
            size='small'
            minRows={2}
            value={comments.comment}
            multiline
            sx={{
              overflowY: 'auto'
            }}
          />}
        </For>

      </Paper>
    </Modal>
  </>
  )
}