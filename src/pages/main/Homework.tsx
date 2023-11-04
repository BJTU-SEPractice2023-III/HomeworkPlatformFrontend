import { useParams } from '@solidjs/router';
import { For, Match, Show, Switch, createSignal, onMount } from 'solid-js';
import { homeworklists } from '../../lib/homework'
export default function Homework() {
  const params = useParams();

  onMount(() => {

  })

  return (
    <div>
      {parseInt(params.id)}
    </div>

  );
}
