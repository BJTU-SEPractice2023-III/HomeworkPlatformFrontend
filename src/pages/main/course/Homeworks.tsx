import { Button, useTheme } from "@suid/material";
import { Show, createSignal, onMount } from "solid-js";
import { UserCoursesStore } from "../../../lib/store";
import { useNavigate, useParams, useRouteData } from "@solidjs/router";
import { Homework, getCourseHomeworks, isEnded, notStartYet } from '../../../lib/homework';
import { CourseData } from "../../../index";
import HomeworksTable from "../../../components/HomeworksTable";


export default function Homeworks() {
  const params = useParams();
  const navigate = useNavigate();
  const { isTeaching, isLearning } = UserCoursesStore();

  const course = useRouteData<typeof CourseData>();
  const [homeworks, setHomeworks] = createSignal<Homework[]>([]);
  onMount(async () => {
    getCourseHomeworks(parseInt(params.courseId)).then((res) => {
      // res;
      // console.log(res);
      // res.sort((a, b) => {
      //   return b.ID - a.ID
      // })
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
      console.log("homeworks: ", homeworks());
    });
  });

  const theme = useTheme();

  return (
    <Show when={course()}>
      <Show when={isTeaching(course())}>
        <Button variant="contained" onClick={() => { navigate('new'); }}>创建作业</Button>
      </Show>

      {/* <CreateHomeworkModal open={_open}/> */}

      <HomeworksTable homeworks={homeworks} setHomeworks={setHomeworks} isTeaching={isTeaching(course())} />
    </Show>
  );
}
