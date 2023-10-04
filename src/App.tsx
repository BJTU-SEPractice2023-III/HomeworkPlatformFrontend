import type { Component } from 'solid-js';
import { Routes, Route, A } from 'the-solid-router';
import Courses from './pages/Courses';
import Login from './pages/Login';

import { Accessor, createMemo } from "solid-js";

const App: Component = () => {
  // true????
  const isLoggedIn: Accessor<string | true> = createMemo(() => {
      const jwt = localStorage.getItem("homework-platform-jwt");
      if (!jwt) {
          return "/login";
      }
      return true;
  });

  return (
    <>
      <h1>router</h1>
      <A href="/courses/2">courses/2</A>
      <Routes>
        <Route path="/courses/:id" guard={isLoggedIn} component={Courses} />
        <Route path="/login" component={Login} />
      </Routes>
      <p class="text-4xl text-green-700 text-center py-20">
        Hello{' '}
        <a
          class="text-pink-600 hover:font-bold hover:border-1"
          href="https://antfu.me/posts/reimagine-atomic-css"
          target="atomic-css"
        >
          Atomic CSS
        </a>
        !
      </p>
    </>
  );
};

export default App;
