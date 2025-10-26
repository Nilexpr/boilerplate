import { createFileRoute, redirect } from "@tanstack/solid-router";

export const Route = createFileRoute("/")({
  // 使用 beforeLoad 在加载前重定向（推荐）
  beforeLoad: () => {
    throw redirect({
      to: "/edit",
    });
  },
});
