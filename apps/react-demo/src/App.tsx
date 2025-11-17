import { useState } from "react";

// ✅ 示例 1：渲染期间调用 setState（官方推荐的模式）
const DerivedStateExample: React.FC<{ itemId: number }> = ({ itemId }) => {
  const [prevItemId, setPrevItemId] = useState(itemId);
  const [selection, setSelection] = useState<string | null>(null);

  // 当 itemId 改变时，重置 selection
  // 这是 getDerivedStateFromProps 的替代方案
  if (itemId !== prevItemId) {
    setPrevItemId(itemId);
    setSelection(null);
    // ⚠️ React 会立即重新渲染，不会继续执行后面的代码
  }

  console.log("🎨 DerivedStateExample 渲染", { itemId, prevItemId, selection });

  return (
    <div
      style={{ padding: "10px", border: "2px solid green", margin: "10px 0" }}
    >
      <h4>✅ 正确用法：根据 props 更新 state</h4>
      <p>当前 itemId: {itemId}</p>
      <p>上一次 itemId: {prevItemId}</p>
      <p>Selection: {selection || "null"}</p>
      <button onClick={() => setSelection(`Selected-${itemId}`)}>
        选择当前项
      </button>
    </div>
  );
};

// ❌ 示例 2：错误用法 - 无限循环
const InfiniteLoopExample: React.FC = () => {
  // ❌ 如果无条件调用 setState，会无限重新渲染
  // const [count, setCount] = useState(0);
  // setCount(count + 1); // React 会在 50 次后抛出错误

  return (
    <div style={{ padding: "10px", border: "2px solid red", margin: "10px 0" }}>
      <h4>❌ 错误用法：无限循环（代码已注释）</h4>
      <p style={{ color: "red", lineHeight: "1.6" }}>
        如果在渲染期间<strong>无条件</strong>调用 setState，会导致无限循环：
        <br />
        <code
          style={{
            background: "#f5f5f5",
            padding: "2px 6px",
            borderRadius: "3px",
          }}
        >
          setCount(count + 1)
        </code>
        <br />
        React 会在 50 次重新渲染后抛出错误：
        <br />
        <em>"Too many re-renders. React limits the number of renders..."</em>
      </p>
    </div>
  );
};

// ⚠️ 示例 3：有限制的循环
const LimitedLoopExample: React.FC = () => {
  const [count, setCount] = useState(0);

  // ✅ 有条件判断，不会无限循环
  if (count < 5) {
    console.log(
      `🔄 LimitedLoopExample 渲染期间 setState (${count} -> ${count + 1})`
    );
    setCount(count + 1);
  }

  return (
    <div
      style={{ padding: "10px", border: "2px solid orange", margin: "10px 0" }}
    >
      <h4>⚠️ 有限循环：渲染期间递增 count</h4>
      <p>Count: {count}</p>
      <p style={{ color: "orange" }}>
        React 会连续重新渲染 5 次，直到 count === 5（查看 Console）
      </p>
      <button onClick={() => setCount(0)}>重置</button>
    </div>
  );
};

export default function App() {
  const [itemId, setItemId] = useState(1);

  return (
    <div style={{ padding: "20px" }}>
      <h1>React 渲染期间调用 setState</h1>

      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          background: "#e3f2fd",
          borderRadius: "8px",
        }}
      >
        <h3>🤔 问题：为什么不违反"纯组件"原则？</h3>
        <div style={{ lineHeight: "1.8" }}>
          <p>
            <strong>React 的"纯组件"定义：</strong>
          </p>
          <ul>
            <li>
              ✅ 相同的 <code>props/state/context</code> → 相同的 JSX 输出
            </li>
            <li>✅ 不修改外部变量、不直接操作 DOM</li>
          </ul>

          <p>
            <strong>为什么渲染期间调用 setState 不违反？</strong>
          </p>
          <ol>
            <li>
              <strong>setState 不会立即改变状态</strong>
              <br />
              它只是"调度"一次更新，React 会立即重新渲染
            </li>
            <li>
              <strong>过程是确定的</strong>
              <br />
              相同的输入 → 相同的中间状态 → 相同的最终输出
            </li>
            <li>
              <strong>React 内部处理</strong>
              <br />
              React 检测到渲染期间的 setState，会在<strong>当前宏任务中</strong>
              立即重新渲染
            </li>
          </ol>
        </div>
      </div>

      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          background: "#f0f0f0",
          borderRadius: "8px",
        }}
      >
        <h3>控制面板</h3>
        <button
          onClick={() => setItemId((prev) => prev + 1)}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            background: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          切换 Item (当前: {itemId})
        </button>
      </div>

      <DerivedStateExample itemId={itemId} />
      <InfiniteLoopExample />
      <LimitedLoopExample />

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          background: "#fff3cd",
          borderRadius: "8px",
        }}
      >
        <h3>📌 关键点总结</h3>
        <ul style={{ lineHeight: "1.8" }}>
          <li>
            ✅ <strong>可以</strong>在渲染期间调用 setState（有条件判断时）
          </li>
          <li>
            ✅ 用于替代 <code>getDerivedStateFromProps</code>
          </li>
          <li>
            ✅ React 会<strong>立即重新渲染</strong>（同步，在当前宏任务中）
          </li>
          <li>
            ⚠️ 必须有<strong>退出条件</strong>，否则无限循环
          </li>
          <li>
            ⚠️ React 限制最多 <strong>50 次</strong>重新渲染，超过会抛出错误
          </li>
          <li>
            💡 <strong>不违反纯函数</strong>：因为过程是确定的、可预测的
          </li>
        </ul>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          background: "#ffebee",
          borderRadius: "8px",
        }}
      >
        <h3>🔍 深入理解：React 如何处理</h3>
        <pre
          style={{
            background: "#f5f5f5",
            padding: "10px",
            borderRadius: "4px",
            overflow: "auto",
            fontSize: "13px",
          }}
        >
          {`// React 内部逻辑（简化）
function renderComponent(Component, props) {
  let renderCount = 0;
  
  while (renderCount < 50) {
    const jsx = Component(props);
    
    // 检查是否在渲染期间调用了 setState
    if (hasStateUpdate()) {
      renderCount++;
      continue; // 立即重新渲染
    }
    
    return jsx; // 没有更新，返回 JSX
  }
  
  throw new Error("Too many re-renders. React limits...");
}

// 关键：整个过程是同步的，在同一个宏任务中！
// 所以从外部看，组件仍然是"纯"的：
// 输入相同 → 经过多次内部迭代 → 输出相同`}
        </pre>
      </div>
    </div>
  );
}
