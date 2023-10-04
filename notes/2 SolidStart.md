# 2 SolidStart

## 目录结构

```
node_modules/
public/
src/
├── routes/
│   ├── index.tsx
├── entry-client.tsx
├── entry-server.tsx
├── root.tsx
```

- **node_modules/** - 略
- **public/** - the `public` directory contains publicly-available assets (images, styles, fonts, etc.) for your application. You can read more about using [static assets](https://start.solidjs.com/core-concepts/static-assets).
- **src/** - the `src` directory is where most of your SolidStart application code will live. It's aliased to `~/` for importing in your code.
- **src/routes/** - this is where your file routes/pages will be located. You should read more about [routing](https://start.solidjs.com/core-concepts/routing).
- [**src/entry-client.tsx**](https://start.solidjs.com/api/entry-client) - the [`entry-client.tsx`](https://start.solidjs.com/api/entry-client) file is what loads and *hydrates* the JavaScript for our application on the client side (in browser). In many cases, you won't need to modify this file.
- [**src/entry-server.tsx**](https://start.solidjs.com/api/entry-server) - the [`entry-server.tsx`](https://start.solidjs.com/api/entry-server) handles requests on the server. In many cases, you won't need to modify this file.
- [**root.tsx**](https://start.solidjs.com/api/root) - this is the HTML root of your application both for client and server rendering. You can think of this as the shell inside which your application will be rendered.