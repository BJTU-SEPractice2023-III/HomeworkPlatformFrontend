import { ManageSearch, Edit, Delete } from "@suid/icons-material";
import { Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@suid/material";
import { Switch, Match, For, Signal } from "solid-js";
import { Homework, delHomework } from "../lib/homework";
import { formatDateTime } from "../lib/utils";
import { useNavigate } from "@solidjs/router";

export default function HomeworksTable(props: { homeworks: Signal<Homework[]>, isTeaching: boolean }) {
    const navigate = useNavigate()

    const [homeworkList, setHomeworkList] = props.homeworks
    const isTeaching = props.isTeaching

    return <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
            <TableHead>
                <TableRow>
                    <TableCell>作业名</TableCell>
                    <TableCell>起始时间</TableCell>
                    <TableCell>结束时间</TableCell>
                    <TableCell size='medium'>操作</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <For each={homeworkList()}>{(homework, i) => <TableRow>
                    <TableCell>{homework.name}</TableCell>
                    <TableCell>{formatDateTime(homework.beginDate)}</TableCell>
                    <TableCell>{formatDateTime(homework.endDate)}</TableCell>
                    <Switch>
                        <Match when={!isTeaching}>
                            <TableCell size="medium">
                                <Button onClick={() => { navigate(`${homework.ID}`) }}>查看</Button>
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
                                    <Button onClick={() => {navigate(`${homework.ID}`)}}><ManageSearch /></Button>
                                    <Button onClick={() => {navigate(`${homework.ID}/edit`)}}><Edit /></Button>
                                    <Button onClick={() => {
                                        delHomework(homework.ID).then((res) => {
                                            setHomeworkList((homeworkList) => {
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
}