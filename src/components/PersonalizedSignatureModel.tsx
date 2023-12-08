import { Button, Modal, Paper, TextField, Typography } from "@suid/material"
import { Accessor, Setter, createSignal } from "solid-js"
import { editSignature } from "../lib/user"

export default function PersonalizedSignatureModel(props: { open: Accessor<boolean>, setOpen: Setter<boolean> }) {
  const { open, setOpen } = props

  const [content, setContent] = createSignal("")
  function writeSignature(){
    editSignature(content()).then((res)=>{
      console.log(res)
      setOpen(false)
      window.location.reload(); 
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
          个性签名
        </Typography>
        <TextField
          size='small'
          value={content()}
          minRows={4}
          multiline
          onChange={(_event, value) => {
            setContent(value)
          }}
          sx={{
            overflowY: 'auto'
          }}
        />

        <div class="flex gap-2">
          <Button variant="contained" onClick={()=>{writeSignature()}}>修改</Button>
          <Button variant="outlined" onClick={() => { setOpen(false) }}>取消</Button>
        </div>

      </Paper>
    </Modal>
  </>
}