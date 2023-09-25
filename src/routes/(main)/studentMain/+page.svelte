<script lang="ts">
import { get, postByJson } from "$lib/api/utils/axios"
import { onMount } from "svelte";

let teachingCourse: any = [];
let learningcourse: any = [];
  function getTeachingCourse() {
      get("api/course/teachingcourse")
        .then((res:any) => {
          console.log(res.data);
          teachingCourse = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function getLearningCourse() {
      get("api/course/learningcourse")
        .then((res:any) => {
          console.log(res.data);
          learningcourse = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    }

    onMount(() => {
      getTeachingCourse();
      getLearningCourse();
    });

</script>

<div class="flex w-full h-full">

  <div class="bg-white w-[200px] p-4">旅行者,你将去往何方?</div>

  <div class="flex-1 p-4">我*,原</div>

</div>
