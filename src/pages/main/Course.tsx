import { useParams, A } from '@solidjs/router';
import { Card, CardContent, Typography } from '@suid/material';
import { Show, createSignal, onMount } from 'solid-js';
import { getCourse } from '../../lib/course';
import type { Course } from '../../lib/course';
import { formatDateTime } from '../../lib/utils';

export default function Course() {
  const params = useParams();

  const [course, setCourse] = createSignal<Course | null>();

  onMount(() => {
    getCourse(parseInt(params.id)).then((res) => {
      // console.log(res);
      setCourse(res);
    });
  });

  return (
    <div class='flex-1 p-4'>
      <Show when={course() != null}>
        <Card sx={{ minWidth: 275 }}>
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
      </Show>
    </div>
  );
}
