import { Title } from "solid-start";
import { useParams } from "solid-start";

export default function Course() {
  const params = useParams();

  return (
    <main>
      <Title>Course(id: {params.id})</Title>
      <h1>Course(id: {params.id})</h1>
    </main>
  );
}
