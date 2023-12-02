import { useParams, A, useRouteData } from '@solidjs/router';
import { Card, CardContent, Typography } from '@suid/material';
import { Show, createEffect, createResource, createSignal } from 'solid-js';
import type { Course } from '../../../lib/course';
import { formatDateTime } from '../../../lib/utils';
import { CourseData } from '../../../index';
import { getUserInfo } from '../../../lib/user';

export default function Course() {
  const params = useParams();

  const { course, mutateCourse, refetchCourse } = useRouteData<typeof CourseData>()

  const [teacher] = createResource(() => course(), async () => {
    const res = await getUserInfo(course().teacherID)
    return res
  })

  createEffect(() => {
    console.log(course().description)
  })

  return (
    <Show when={course()}>
      <Card sx={{ width: "100%", minWidth: 275 }}>
        <CardContent>
          <Typography variant="h3" component="div">
            {course().name}
          </Typography>
          {/* TODO: Add teacher name, and a link to teacher's profile */}
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            授课老师：<A href='' class='text-blue'>{teacher() && teacher().username}</A>
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {formatDateTime(course().beginDate)}～{formatDateTime(course().endDate)}
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
            {course().description}
          </Typography>
        </CardContent>
      </Card>
    </Show>
  );
}