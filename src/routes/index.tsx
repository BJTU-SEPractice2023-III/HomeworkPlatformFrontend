import { Navigate, Title } from "solid-start";
import Counter from "~/components/Counter";

export default function Home() {
  // 从 localStorage 获取 token，若为空则跳转到 /login
  const token = localStorage.getItem("homework-platform-jwt");
  console.log(token)
  if (!token) {
    return <Navigate href="/login" />
  }

  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <Counter />
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
