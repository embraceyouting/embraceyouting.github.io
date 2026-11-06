# 网站维护约定

- GitHub Pages 是主站，保留 GitHub `origin`、`main` 分支、现有历史与 `CNAME`。未经用户明确要求，不更换域名或重写历史。
- 用户已授权后续要求的网站更新在验证后提交并推送 GitHub。先检查工作区与远端状态，保留已有修改；使用普通推送，遇到权限或冲突时报告阻碍，不强制推送。
- 验证至少包括 `node --check script.js` 与 `node scripts/build-static.mjs`；页面交互或布局修改需要可用条件下的浏览器检查。
- Sites 为独立镜像。读取并复用 `.openai/hosting.json` 中的项目 ID，遵循 Sites 原生源码、保存版本与部署流程，确认部署结果后再报告上线；不要重复创建项目。
- 构建仅将 `index.html`、`styles.css`、`script.js` 原样复制至 `dist/`。GitHub 的 `CNAME` 不进入 Sites 发布文件。
- GitHub 推送与 Sites 部署分别完成、分别验证。不要承诺插件会持续后台同步外部 GitHub 仓库，也不要仅凭公开读取成功就声称拥有写入权限。
- 不将访问令牌、登录凭据或临时授权写入仓库、构建目录或日志。
