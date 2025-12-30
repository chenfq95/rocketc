# GitHub Actions Workflows

## 发布到 npm

这个 workflow 会自动更新版本号并发布包到 npm。

### 功能特性

- ✅ 自动版本管理（支持 patch/minor/major）
- ✅ 支持预发布版本（alpha）
- ✅ 自动构建和发布
- ✅ 检查版本是否已发布，避免重复发布
- ✅ 自动创建 Git tag 和 GitHub Release
- ✅ 支持两种触发方式：手动触发和 tag 触发

### 设置

在使用之前，需要配置以下 GitHub Secret：

1. **NPM_TOKEN**: npm 访问令牌
   - 📖 **详细配置指南**: 请查看 [SETUP_NPM_TOKEN.md](./SETUP_NPM_TOKEN.md)
   - 快速步骤：
     1. 前往 [npmjs.com](https://www.npmjs.com/) 登录
     2. 进入 Account Settings → Access Tokens
     3. 创建新的 Token（选择 "Automation" 类型，推荐）
     4. 将 token 添加到 GitHub Repository Settings → Secrets and variables → Actions
     5. Secret 名称必须为 `NPM_TOKEN`（区分大小写）

### 使用方法

#### 方法 1: 手动触发（推荐）

1. 前往 GitHub 仓库的 **Actions** 标签页
2. 选择 **Publish to npm** workflow
3. 点击 **Run workflow**
4. 选择版本类型：
   - **patch**: 修复版本（0.0.1 → 0.0.2-alpha.0）
   - **minor**: 小版本（0.0.1 → 0.1.0-alpha.0）
   - **major**: 大版本（0.0.1 → 1.0.0-alpha.0）
5. 点击 **Run workflow** 按钮

对于预发布版本（如 `0.0.1-alpha.4`），选择 patch 会递增为 `0.0.1-alpha.5`。

#### 方法 2: 通过 Git Tag 触发

推送一个版本 tag 到仓库：

```bash
git tag v1.0.0
git push origin v1.0.0
```

这会触发 workflow，使用 tag 中的版本号发布。

### 工作流程

1. **检查代码**: 检出最新代码
2. **安装依赖**: 使用 pnpm 安装依赖
3. **计算版本**: 根据触发方式计算新版本号
4. **更新版本**: 更新 `packages/libs/react/package.json` 中的版本号
5. **构建项目**: 运行 `pnpm run build`
6. **检查版本**: 检查该版本是否已在 npm 上发布
7. **发布到 npm**: 如果未发布，则发布到 npm
8. **创建 Tag**: 创建 Git tag（仅手动触发时）
9. **创建 Release**: 创建 GitHub Release（仅手动触发时）

### 版本规则

- **预发布版本**: 如果当前版本包含 `-alpha.X`，递增时会增加 alpha 号
- **正式版本**: 如果当前是正式版本，会根据选择的类型创建新的预发布版本

示例：

- `0.0.1-alpha.4` + patch → `0.0.1-alpha.5`
- `0.0.1` + patch → `0.0.2-alpha.0`
- `0.0.1` + minor → `0.1.0-alpha.0`
- `0.0.1` + major → `1.0.0-alpha.0`
