import { Modal, Paper, TextField, Typography } from "@suid/material"
import { Accessor, Setter } from "solid-js"
export default function LookComment(props: { comment: Accessor<string>, open: Accessor<boolean>, setOpen: Setter<boolean> }) {
  const { open, setOpen, comment } = props

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
        <Typography id="modal-modal-title" variant="h5" component="h2">
          评论详情
        </Typography>

        <span class='text-sm'>内容</span>
        <TextField
          size='small'
          minRows={4}
          value={comment()}
          multiline
          sx={{
            // height: /
            overflowY: 'auto'
          }}
        />

      </Paper>
    </Modal>
  </>
  )
}