import { useParams, A, useRouteData } from '@solidjs/router';
import { Breadcrumbs, Button, Card, CardContent, Link, Typography } from '@suid/material';
import { Match, Show, Switch, createSignal, onMount } from 'solid-js';
import type { Course } from '../../../lib/course';
import { formatDateTime } from '../../../lib/utils';
import { Homework, getCourseHomeworks } from '../../../lib/homework'
import { useNavigate } from '@solidjs/router';
import { UserCoursesStore } from '../../../lib/store';
import { CourseData } from '../../../index';

export default function Course() {
  const params = useParams();

  const course = useRouteData<typeof CourseData>()

  return (
    <Show when={course()}>
      <Card sx={{ width: "100%", minWidth: 275 }}>
        <CardContent>
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
  );
}