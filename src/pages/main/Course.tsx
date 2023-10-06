
import { useParams } from '@solidjs/router';
export default function Course() {
  const params = useParams();

  return (
    <>
      <h1>Course(id: {params.id})</h1>
    </>
  )
}