import { Button, useTheme } from "@suid/material";
import { Show, createSignal, onMount } from "solid-js";
import { UserCoursesStore } from "../../../lib/store";
import { useNavigate, useParams, useRouteData } from "@solidjs/router";
import { Homework, StudentHomework, getCourseHomeworks } from '../../../lib/homework'
import { CourseData } from "../../../index";
import HomeworksTable from "../../../components/HomeworksTable";

export default function Homeworks() {
  const params = useParams();
  const navigate = useNavigate()
  const { isTeaching, isLearning } = UserCoursesStore()

  const course = useRouteData<typeof CourseData>()
  const _homeworks = createSignal<Homework[]>([])
  const [homeworks, setHomeworks] = _homeworks
  onMount(async () => {
    getCourseHomeworks(parseInt(params.courseId)).then((res) => {
      res
      console.log(res)
      setHomeworks(res)
      console.log("homeworks: ", homeworks())
    });
  });

  const theme = useTheme()

  return (
    <Show when={course()}>
      <Show when={isTeaching(course())}>
        <Button variant="contained" onClick={() => { navigate('new') }}>创建作业</Button>
      </Show>

      {/* <CreateHomeworkModal open={_open}/> */}

      <HomeworksTable homeworks={_homeworks} isTeaching={isTeaching(course())} />
    </Show>
  );
}
