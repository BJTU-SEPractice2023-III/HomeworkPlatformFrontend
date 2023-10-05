import { useParams } from '@solidjs/router';
export default function Courses() {
  const params = useParams();

  return (
    <>
      <h1>Courses(id: {params.id})</h1>
    </>
  )
}