// 命名为: compress.js

const fs = require("fs");
const path = require("path");

// 从命令行获取输入文件
const inputFile = process.argv[2];

if (!inputFile) {
  console.error("错误：请提供一个 .md 文件路径。");
  console.log("用法: node compress.js <your_file.md>");
  process.exit(1);
}

// 检查文件是否存在
if (!fs.existsSync(inputFile)) {
  console.error(`错误：文件未找到: ${inputFile}`);
  process.exit(1);
}

// 定义输出文件路径
const outputName = `${path.basename(inputFile, ".md")}_compressed.md`;
const outputPath = path.join(path.dirname(inputFile), outputName);

try {
  // 1. 读取文件内容
  const fileContent = fs.readFileSync(inputFile, "utf8");

  // 2. 拆分成行
  const lines = fileContent.split("\n");

  // 3. 处理每一行
  const processedLines = lines.map((line) => {
    // 关键：只删除 "行尾" 的空格，保留 "行首" 的结构
    return line.trim();
  });

  // 4. 重新组合成文本
  let processedContent = processedLines.join("\n");

  // 5. (关键) 将3个或更多连续的换行符，压缩为2个 (即保留一个空行)
  // 这可以删除所有多余的空行
  processedContent = processedContent.replace(/\n{3,}/g, "\n\n");

  // 6. 写入新文件
  fs.writeFileSync(outputPath, processedContent, "utf8");

  console.log("--- 压缩完成 (安全模式) ---");
  console.log(`保留了所有前导空格（结构）。`);
  console.log(`移除了所有行尾空格和多余空行。`);
  console.log(`输入: ${inputFile}`);
  console.log(`输出: ${outputPath}`);
} catch (error) {
  console.error(`处理文件时发生错误: ${error.message}`);
  process.exit(1);
}
