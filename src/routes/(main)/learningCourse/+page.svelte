<script lang="ts">
    import { afterNavigate, goto } from "$app/navigation";
    import axios from "axios";
    import { get, postByJson } from "$lib/api/utils/axios"
  
    let courses: any = [];
  
    function getCourse() {
    //   get("/api/course")
    //     .then((res) => {
    //       console.log(res.data);
    //       courses = res.data.data;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    }
  
    let teacher = "";
    let coursename = "";
    let credit = "";
  
    function selectCourse() {
      postByJson("api/course/learningcourse", {
        coursename,
        credit,
        teacher,
      })
        .then((res) => {
          console.log("[then]: ", res);
          alert("你好，成功选课");
        })
        .catch((err) => {
          console.log("[error]: ", err);
        });
    }
  
    import {
      Card,
      Table,
      TableBody,
      TableBodyCell,
      TableBodyRow,
      TableHead,
      TableHeadCell,
    } from "flowbite-svelte";
  
    import { Button } from "flowbite-svelte";
    import { onMount } from "svelte";
  
    onMount(() => {
      getCourse();
    });
  </script>
  
  <div class="bg-white border-t p-2">
    <Button on:click={getCourse}>刷新</Button>
  </div>
  
  <div>
    <Table>
      <TableHead>
        <TableHeadCell>ID</TableHeadCell>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Credit</TableHeadCell>
        <TableHeadCell>Teacher</TableHeadCell>
        <TableHeadCell>Button</TableHeadCell>
      </TableHead>
      <TableBody>
        {#each courses as course}
          <TableBodyRow>
            <TableBodyCell>{course.id}</TableBodyCell>
            <TableBodyCell>{course.name}</TableBodyCell>
            <TableBodyCell>{course.credit}</TableBodyCell>
            <TableBodyCell>{course.teacher}</TableBodyCell>
            <TableHeadCell>
              <!-- svelte-ignore missing-declaration -->
              <Button
                on:click={() => {
                  coursename = course.name;
                  credit = course.credit;
                  teacher = course.teacher;
                  selectCourse();
                }}
                gradient
                color="green"
                pill={true}
              >
                选课</Button
              >
            </TableHeadCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </div>