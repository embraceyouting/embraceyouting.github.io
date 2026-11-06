# embraceyouting.github.io

whisper 的个人主页与作品集。GitHub Pages 是主站，Sites 用于独立托管镜像。

在线访问：https://embraceyouting.github.io/

GitHub 主站保留仓库中的 `CNAME` 域名配置。Sites 的项目与静态发布目录由 `.openai/hosting.json` 记录；镜像部署结果以 Sites 返回的地址和状态为准。

## 本地预览

这是一个不依赖构建工具的静态站点。直接用浏览器打开 `index.html`，或在当前目录运行任意静态文件服务器即可。

## 文件说明

- `index.html`：页面结构与个人内容
- `styles.css`：响应式视觉样式
- `script.js`：中英文切换、主题切换、移动端导航、滚动显现与交互特效
- `CNAME`：GitHub Pages 的自定义域名配置
- `scripts/build-static.mjs`：为 Sites 准备静态发布文件
- `AGENTS.md`：后续网站维护与发布约定

页面支持中英文切换、深浅色主题、粒子连线背景、Hero 鼠标聚光、滚动进度、桌面端自定义光标、卡片 3D 倾斜、局部光晕、按钮磁吸与扫光效果。

## 内容更新

后续新增博客文章时，可以在当前结构基础上接入 Markdown 生成器；目前主页已经预留了 Notes / 博客入口。

## 验证与发布

在仓库根目录运行：

```sh
node --check script.js
node scripts/build-static.mjs
```

构建脚本仅使用 Node.js 内置模块，将三个网页文件原样复制至 `dist/`。缺少任一文件时构建失败。生成目录不纳入版本控制，也不包含 `CNAME`，因此不会将 GitHub 的域名配置带到 Sites 镜像。

更新主站需要有效的 GitHub 写入权限：验证变更后提交并普通推送至 GitHub `origin/main`，再检查 GitHub Pages 的发布结果。公开读取仓库不代表已具备推送权限。

更新 Sites 镜像需要读取 `.openai/hosting.json` 中的项目 ID，按 Sites 原生流程同步源码、保存版本并部署，再确认部署成功。GitHub 推送与 Sites 部署是分别执行和验证的两个动作；Sites 插件不会自动持续同步这个外部 GitHub 仓库。不要在仓库或构建文件中保存访问凭据。
