组件库，基本思路是：

- 使用 `zag.js` 做底层实现，样式复用 `shadcn`。
- 分为 Primitive 层和 Components 层，其中：
  - Primitive 层所有 API 参考 `Radix Primitive`
  - Components 层做 `shadcn` 移植
