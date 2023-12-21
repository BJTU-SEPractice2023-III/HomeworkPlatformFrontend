import { Modal, Paper, TextField, Typography } from "@suid/material"
import { Accessor, Setter, Signal } from "solid-js"
import { For } from "solid-js/web"
import { CommentTask } from "../lib/homework";
export default function TeacherLookModel(props: { studentId: Accessor<number> ,student: Accessor<CommentTask[]>, open: Accessor<any[]>, setOpen: Setter<boolean> }) {
  const { studentId,student,open,setOpen } = props;

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
            multiline
            sx={{
              overflowY: 'auto'
            }}
          />


        <span class='text-sm'>评论</span>
        <For each={student()[studentId()].Comments}>{(comments, i) =>
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