import * as React from "react";

// 简化的 roving focus 子系统
const RovingCtx = React.createContext<{
  name: string;
  register(id: string): void;
} | null>(null);

function RovingRoot({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  const api = React.useMemo(
    () => ({
      name,
      register(id: string) {
        console.log(`[register] group=${name} item=${id}`);
      },
    }),
    [name]
  );
  return <RovingCtx.Provider value={api}>{children}</RovingCtx.Provider>;
}

function RovingItem({ id }: { id: string }) {
  const ctx = React.useContext(RovingCtx);
  React.useEffect(() => {
    ctx?.register(id);
  }, [ctx, id]);
  return <button>{id}</button>;
}

// ------------------ 父系统：Toolbar（有自己的 roving 组） ------------------
function Toolbar({ children }: { children: React.ReactNode }) {
  return (
    <RovingRoot name="toolbar">
      <RovingItem id="bold" />
      <RovingItem id="italic" />
      {children}
    </RovingRoot>
  );
}

// ------------------ 子系统：RadioGroup（也有自己的 roving 组） ------------------
function RadioGroup({
  renderOutside,
}: {
  renderOutside: (nodes: React.ReactNode) => React.ReactNode;
}) {
  // 子系统确实创建了自己的组
  const items = (
    <>
      <RovingItem id="radio-1" />
      <RovingItem id="radio-2" />
    </>
  );
  return (
    <RovingRoot name="radio-group">
      {/* 期望：两个 item 注册到 radio-group */}
      {/* 但如果组合把 item 渲染到了组外（asChild/Slot/布局重排等），就近 Provider 变成了 toolbar */}
      {renderOutside(items)}
    </RovingRoot>
  );
}

// ------------------ 挂载：把 RadioGroup 的条目“重排到组外” ------------------
export default function App() {
  const [outlet, setOutlet] = React.useState<React.ReactNode>(null);

  return (
    <Toolbar>
      <RadioGroup
        renderOutside={(nodes) => {
          // 故意把条目渲染到 Toolbar 作用域下（组外）
          // 模拟 asChild/Slot/把 children 挂到别处的组合方式
          setOutlet(nodes);
          return null;
        }}
      />
      {outlet}
    </Toolbar>
  );
}

/*
控制台输出（问题现象）：
[register] group=toolbar item=bold
[register] group=toolbar item=italic
[register] group=toolbar item=radio-1   ← 本应属于 radio-group，却注册进了 toolbar
[register] group=toolbar item=radio-2   ← 同上
*/
