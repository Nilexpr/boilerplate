# 原则

主要用于个人项目，目前第一版先按照 [react-starter-kit](https://github.com/kriasoft/react-starter-kit) 的结构去搭。

# 技术栈

## 前端

- [Solid](https://www.solidjs.com/)
- TanStack Router
- Tailwind CSS

## 后端

- tRPC
- [Better Auth](https://www.better-auth.com/)

## 数据库 & ORM

- Drizzle
- `pglite`

## 开发工具

## 项目约定

- `commitlint`，提交的时候请使用 pnpm cz。

> - `commitlint` 只是个函数，接受 commit 时候的文本，只做一次校验，输出错误原因。
>   - 每次 commit 的时候，会存在 `.git/COMMIT_EDITMSG` 下，以后可以看看为什么还要写到文件里。
> - 为了方便使用，`commitizen` 可以配合 `commitlint` 提供交互命令行。
>   - 实际用的是 `@commitlint/cz-commitlint` 这个包，本质是 `commitizen` 对 `commitlint` 的适配层，让 `commitizen` 读 `commitlint.config.js` 的配置。
>   - 看了下依赖，`inquirer@9` 这个包可以给命令行加一点交互效果，有空可以看下。
