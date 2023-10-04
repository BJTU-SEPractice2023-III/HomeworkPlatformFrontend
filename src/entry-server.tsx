import { redirect } from "solid-start";
import {
  createHandler,
  renderAsync,
  StartServer,
} from "solid-start/entry-server";

const protectedPaths = ["/"]

export default createHandler(
  ({forward}) => {
    return async event => {
      const path = new URL(event.request.url).pathname
      console.log(path)
      if (protectedPaths.includes(path)) {
        return redirect("/login")
      }
      return forward(event)
    }
  },
  renderAsync((event) => <StartServer event={event} />)
);
