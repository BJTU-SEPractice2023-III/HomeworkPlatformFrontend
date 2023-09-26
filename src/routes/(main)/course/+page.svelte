<script lang="ts">
import { onMount } from 'svelte';
import { page } from '@sveltejs/kit';

let courseId;
let courseData;

// 使用 page.params 获取 URL 中的参数
const { courseId: paramCourseId } = page.params;
courseId = paramCourseId;

// 根据 courseId 获取相关数据，这里可以是从 API 请求数据的逻辑
// 请根据您的项目需求自行实现数据获取逻辑
courseData = fetchDataForCourse(courseId);
</script>