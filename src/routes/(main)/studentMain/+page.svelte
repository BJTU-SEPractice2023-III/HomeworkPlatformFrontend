<script lang="ts">
import { get, postByJson } from "$lib/api/utils/axios"
import { onMount } from "svelte";

let teachingCourses: any = [];
let learningcourses: any = [];
  function getTeachingCourse() {
      get("api/course/teachingcourse")
        .then((res:any) => {
          console.log(res.data);
          teachingCourses = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    }

    function getLearningCourse() {
      get("api/course/learningcourse")
        .then((res:any) => {
          console.log(res.data);
          learningcourses = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    }

    onMount(() => {
      getTeachingCourse();
      getLearningCourse();
    });


    // function createCourse() {
    //   postByJson("api/course/create", {
    //     ID,
    //     coursename,
    //     TeacherID,
    //   })
    //     .then((res) => {
    //       console.log("[then]: ", res);
    //       alert("你好，成功选课");
    //     })
    //     .catch((err) => {
    //       console.log("[error]: ", err);
    //     });
    // }
    import { Button } from "flowbite-svelte";
</script>

<div class="flex w-full h-full">

  <div class="bg-white w-[200px] p-4 flex flex-col">
    <Button
    on:click={() => {

    }}
    >创建课程</Button>
    <div>教的课程</div>
    {#each teachingCourses as teachingCourse}
      <a href="/course?courseId={teachingCourse.ID}" class="text-black underline">{teachingCourse.name}</a>
    {/each}
    <a href="/course" class="text-black underline">我**,你**</a>
    <a href="/course" class="text-black underline">我*你**的</a>

    <div class="border-t border-gray-400 my-4"></div>

    <div>学的课程</div>
    {#each learningcourses as learningcourse}
      <a href="/course?courseId={learningcourse.ID}" class="text-black underline">{learningcourse.name}</a>
    {/each}
    <a href="/course" class="text-black underline">Home</a>
  </div>

  <div class="flex-1 p-4">我*,原</div>

</div>
