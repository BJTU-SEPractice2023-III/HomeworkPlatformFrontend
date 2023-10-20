import { useParams, A } from '@solidjs/router';
import { BottomNavigation, BottomNavigationAction, Button, Card, CardContent, Typography } from '@suid/material';
import { For, Match, Show, Switch, createSignal, onMount } from 'solid-js';
import { getCourse } from '../../lib/course';
import type { Course } from '../../lib/course';
import { formatDateTime } from '../../lib/utils';
import { Favorite, LocationOn, Restore } from '@suid/icons-material';
import { store } from '../../lib/store';

export default function Course() {
  const params = useParams();

  const [course, setCourse] = createSignal<Course | null>();
  const [tab, setTab] = createSignal('index');

  onMount(() => {
    getCourse(parseInt(params.id)).then((res) => {
      // console.log(res);
      setCourse(res);
    });
  });

  function index() {
    return <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography> */}
        <Typography variant="h3" component="div">
          {course().name}
        </Typography>
        {/* TODO: Add teacher name, and a link to teacher's profile */}
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <A href='' class='text-blue'>teacher</A>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {formatDateTime(course().beginDate)}～{formatDateTime(course().endDate)}
        </Typography>
        <Typography variant="body2">
          {course().description}
        </Typography>
      </CardContent>
    </Card>
  }

  function homework() {
    return <>
      homework</>
  }

  function students() {
    return <>
      students</>
  }

  return (
    <div class='flex-1 p-4 gap-2'>
      <div class='flex w-full gap-2 mb-2'>
        <Button sx={{ borderBottom: tab() == 'index' ? 1 : 0 }} onClick={() => { setTab('index') }}>
          简介
        </Button>
        <Button sx={{ borderBottom: tab() == 'homework' ? 1 : 0 }} onClick={() => { setTab('homework') }}>
          作业
        </Button>
        <Button sx={{ borderBottom: tab() == 'students' ? 1 : 0 }} onClick={() => { setTab('students') }}>
          学生列表
        </Button>
      </div>

      <Show when={course() != null}>
        <Switch fallback={<>在写了在写了</>}>
          <Match when={tab() == 'index'}>
            {index()}
          </Match>
          <Match when={tab() == 'homework'}>
            {homework()}
          </Match>
          <Match when={tab() == 'students'}>
            {students()}
          </Match>
        </Switch>
      </Show>
    </div>
  );
}
