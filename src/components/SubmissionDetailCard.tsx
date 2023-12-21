import { Paper, TextField } from "@suid/material";
import { Accessor, onMount } from "solid-js";
import { For, Show } from "solid-js/web";

export default function SubmissionDetailCard(props: { submission: Accessor<any> }) {
  const { submission } = props;
  // onMount(() => {
  //   console.log(`[SubmissionDetailCard]: submission: `, submission())
  // })
  return (
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
      <Show when={submission()}>
        <span class='text-sm'>作业内容</span>
        <TextField
          size='small'
          minRows={2}
          multiline
          value={submission().content}
          sx={{
            overflowY: 'auto'
          }}
        />
        <span class='text-sm'>评论</span>
        <For each={submission().Comments}>{(comments, i) =>
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
      </Show>
    </Paper>
  )
}