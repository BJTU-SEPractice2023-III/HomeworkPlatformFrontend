import { Button, useTheme } from "@suid/material";
<<<<<<< HEAD
import { Show, createSignal, onMount } from "solid-js";
import { AlertsStore, UserCoursesStore } from "../../../lib/store";
=======
import { Show, onMount } from "solid-js";
import { UserCoursesStore } from "../../../lib/store";
>>>>>>> 5acfd1fed0b40bf26aa678311c39abb5dcad216b
import { useNavigate, useParams, useRouteData } from "@solidjs/router";
import { Homework, getCourseHomeworks, isEnded, notStartYet } from '../../../lib/homework';
import { CourseData } from "../../../index";
import HomeworksTable from "../../../components/HomeworksTable";
import { createStore } from "solid-js/store";


export default function Homeworks() {
  const params = useParams();
  const navigate = useNavigate();
  const { isTeaching, isLearning } = UserCoursesStore();
  const { newSuccessAlert, newWarningAlert, newErrorAlert } = AlertsStore()

  const { course, mutateCourse, refetchCourse } = useRouteData<typeof CourseData>();
  const [homeworks, setHomeworks] = createStore<Homework[]>([]);
  onMount(async () => {
    getCourseHomeworks(parseInt(params.courseId)).then((res) => {
      setHomeworks(res.toSorted((a, b) => {
        console.log(a.ID, b.ID, notStartYet(a), notStartYet(b))
        if (!notStartYet(a) && notStartYet(b)) {
          // a 已开始，b 未开始 -> a 在 b 前
          return -1;
        }
        if (notStartYet(a) && !notStartYet(b)) {
          // a 未开始，b 已开始 -> a 在 b 后
          return 1;
        }

        if (isEnded(a) && !isEnded(b)) {
          // a 未过期，b 已过期 -> a 在 b 前
          return 1;
        }
        if (!isEnded(a) && isEnded(b)) {
          // a 已过期，b 未过期 -> a 在 b 后
          return -1;
        }

        // 按照截止时间由近到远
        if (new Date(a.endDate) < new Date(b.endDate)) {
          return -1;
        }
        return 0;
      }));
      // setHomeworks(res);
      // console.log("homeworks: ", homeworks);
    });
  });

  const theme = useTheme();

  return (
    <Show when={course()}>
      <Show when={isTeaching(course())}>
        <Button variant="contained" onClick={() => { navigate('new');newSuccessAlert('布置成功'); }}>创建作业</Button>
      </Show>

      {/* <CreateHomeworkModal open={_open}/> */}

      <HomeworksTable homeworks={homeworks} setHomeworks={setHomeworks} isTeaching={isTeaching(course())} />
    </Show>
  );
}
