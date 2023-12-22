import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@suid/material";
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
        <TableContainer component={Paper} sx={{ width: '100%' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>分数</TableCell>
                <TableCell>评论</TableCell>
                {/* TODO: 修改分数 */}
              </TableRow>
            </TableHead>
            <TableBody>
              <For each={submission().Comments}>{(comment, i) =>
                <TableRow>
                  <TableCell>{comment.userId}</TableCell>
                  <TableCell>{comment.score}</TableCell>
                  <TableCell>
                    <TextField
                      size='small'
                      minRows={2}
                      value={comment.comment}
                      multiline
                      sx={{
                        width: '100%',
                        overflowY: 'auto',
                      }}
                    />
                  </TableCell>
                </TableRow>
              }
              </For>
            </TableBody>
          </Table>
        </TableContainer>
      </Show>
    </Paper>
  )
}