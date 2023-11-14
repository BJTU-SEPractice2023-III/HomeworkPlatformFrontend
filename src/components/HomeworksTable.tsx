import { ManageSearch, Edit, Delete, HomeWork, Tab } from "@suid/icons-material";
import { Button, ButtonGroup, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@suid/material";
import { Switch, Match, For, Signal, createSignal, createEffect, Setter, Accessor, Show } from "solid-js";
import { Homework, StudentHomework, delHomework, isEnded, notStartYet } from "../lib/homework";
import { formatDateTime } from "../lib/utils";
import { useNavigate } from "@solidjs/router";
import HomeworkSubmitModal from "./HomeworkSubmitModal";

export default function HomeworksTable(props: { homeworks: Accessor<Homework[]>, setHomeworks: Setter<Homework[]>, isTeaching: boolean }) {
  const navigate = useNavigate()

  const { homeworks, setHomeworks, isTeaching } = props

  const [submitHomeworkId, setSubmitHomeworkId] = createSignal(-1)
  const [open, setOpen] = createSignal(false)

  function getColor(homework: Homework) {
    if (notStartYet(homework)) {
      return 'text-gray'
    }
    if (isEnded(homework)) {
      return 'text-red'
    }
    return ''
  }

  function getScoreStr(homework: StudentHomework) {
    if (homework.score == -1) {
      return '*/100'
    } else {
      return `${homework.score}/100`
    }
  }


  return (
    <>
      <HomeworkSubmitModal homeworkId={submitHomeworkId} open={open} setOpen={setOpen} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>作业名</TableCell>
              <TableCell>起始时间</TableCell>
              <TableCell>结束时间</TableCell>
              <Show when={!isTeaching}>
                <TableCell>分数</TableCell>
              </Show>
              <TableCell size='medium'>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <For each={homeworks()}>{(homework, i) => <TableRow>
              <TableCell><span class={getColor(homework)}>{homework.ID}</span></TableCell>
              <TableCell>
                <div class="flex gap-2 items-center">
                  <span class={getColor(homework)}>{homework.name}</span>
                  <Show when={new Date(homework.beginDate) > new Date()}>
                    <Chip label="未开始" variant="outlined" size="small" sx={{ color: 'gray' }} />
                  </Show>
                  <Show when={new Date(homework.endDate) < new Date()}>
                    <Chip label="已过期" variant="outlined" color="error" size="small" />
                  </Show>
                </div>
              </TableCell>
              <TableCell><span class={getColor(homework)}>{formatDateTime(homework.beginDate)}</span></TableCell>
              <TableCell><span class={getColor(homework)}>{formatDateTime(homework.endDate)}</span></TableCell>
              <Show when={!isTeaching}>
                <TableCell><span class={getColor(homework)}>{getScoreStr(homework as StudentHomework)}</span></TableCell>
              </Show>
              <Switch>
                <Match when={!isTeaching}>
                  <TableCell size="medium">
                    <Button disabled={notStartYet(homework)} onClick={() => {
                      navigate(`${homework.ID}`);
                    }}>查看</Button>
                    <Switch>
                      <Match when={!(homework as StudentHomework).submitted}>
                        <Button disabled={notStartYet(homework) || isEnded(homework)} variant="contained" onClick={() => {
                          setSubmitHomeworkId(homework.ID)
                          setOpen(true)
                        }}>提交</Button>
                      </Match>
                      <Match when={(homework as StudentHomework).submitted}>
                        <Button disabled={notStartYet(homework) || isEnded(homework)} variant="outlined" onClick={() => {
                          setSubmitHomeworkId(homework.ID)
                          setOpen(true)
                        }}>已提交，重新提交</Button>
                      </Match>
                    </Switch>
                  </TableCell>
                  {/* <TableCell size='medium'>
                                <Button onClick={() => { navigate(`${homework.ID}/submit`); }}>提交作业</Button>
                            </TableCell>
                            <TableCell size='medium'>
                                <Button onClick={() => { navigate(`${homework.ID}/comment`); }}>批阅作业</Button>
                            </TableCell> */}
                </Match>
                <Match when={isTeaching}>
                  <TableCell>
                    <ButtonGroup aria-label="outlined primary button group" sx={{ width: 300 }}>
                      <Button onClick={() => { navigate(`${homework.ID}`) }}><ManageSearch /></Button>
                      <Button onClick={() => { navigate(`${homework.ID}/edit`) }}><Edit /></Button>
                      <Button onClick={() => {
                        delHomework(homework.ID).then((res) => {
                          setHomeworks((homeworkList) => {
                            return homeworkList.filter(item => item.ID !== homework.ID)
                          });
                          // console.log(res);
                        }).catch((err) => {
                          console.error(err)
                        });
                      }}><Delete /></Button>
                    </ButtonGroup>
                  </TableCell>
                </Match>
              </Switch>
            </TableRow>}
            </For>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}