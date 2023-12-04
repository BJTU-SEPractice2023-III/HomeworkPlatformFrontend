import { Button, Modal, Paper, TextField, Typography } from "@suid/material"
import { Accessor, Match, Setter, Switch, createEffect, createSignal, onMount } from "solid-js"
import { askQuestion } from "../lib/homework"

export default function AskSpark(props: { open: Accessor<boolean>, setOpen: Setter<boolean> }) {
  const { open, setOpen } = props

  const [status, setStatus] = createSignal("close")
  const [content, setContent] = createSignal("")
  const [answer, setAnswer] = createSignal("")

  function connect() {
    let url = `http://` + window.location.hostname.replace("http://", "").replace("https://", "") + `:8888/api/v1/ai/spark?token=` +
      localStorage.getItem('jwt')
    console.log(url)
    let es = new EventSource(url);

    setStatus("connecting")
    es.onopen = () => {
      console.log("opened")
      setStatus("open")
      setAnswer("")
    }

    es.onmessage = (e) => {
      // console.log(e)
      setAnswer((ans) => ans + e.data)
    }

    es.onerror = (err) => {
      console.log(err)
      setStatus("close")
    }
  }

  onMount(() => {
    connect()
  })

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
          询问问题
        </Typography>
        {status()}
        {/* <Switch>
          <Match when={status}>

          </Match>
        </Switch> */}

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
            setAnswer("")
            askQuestion(content()).then((res) => {
              // console.log(res.data)
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