# 配置 NPM_TOKEN Secret

本指南将帮助你配置 GitHub Actions 所需的 npm 访问令牌。

## 步骤 1: 在 npm 上创建访问令牌

### 1.1 登录 npm

1. 访问 [npmjs.com](https://www.npmjs.com/)
2. 点击右上角 **Sign In** 登录你的账户
3. 如果还没有账户，点击 **Sign Up** 注册

### 1.2 创建访问令牌

1. 登录后，点击右上角的头像
2. 在下拉菜单中选择 **Access Tokens**（访问令牌）
3. 或者直接访问：https://www.npmjs.com/settings/[你的用户名]/tokens

4. 点击 **Generate New Token**（生成新令牌）
5. 选择令牌类型：

   - **Automation**（推荐）：用于 CI/CD，不会过期，但只能用于自动化场景
   - **Granular**：更细粒度的权限控制，可以设置过期时间
   - **Classic**：传统令牌，可以设置过期时间

6. 填写令牌信息：

   - **Token name**（令牌名称）：例如 `github-actions-publish`
   - **Type**（类型）：选择 **Automation**（推荐）或 **Granular**
   - 如果选择 Granular，需要设置权限和包范围

7. 点击 **Generate Token**（生成令牌）

### 1.3 复制令牌

⚠️ **重要**：令牌只会显示一次，请立即复制并保存！

令牌格式类似：`npm_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## 步骤 2: 在 GitHub 仓库中添加 Secret

### 2.1 进入仓库设置

1. 打开你的 GitHub 仓库
2. 点击仓库顶部的 **Settings**（设置）标签
3. 在左侧边栏中，展开 **Secrets and variables**（密钥和变量）
4. 点击 **Actions**（操作）

### 2.2 添加新的 Secret

1. 点击 **New repository secret**（新建仓库密钥）按钮
2. 填写信息：
   - **Name**（名称）：输入 `NPM_TOKEN`（必须完全一致，区分大小写）
   - **Secret**（密钥）：粘贴刚才复制的 npm 访问令牌
3. 点击 **Add secret**（添加密钥）

### 2.3 验证 Secret 已添加

在 Secrets 列表中，你应该能看到 `NPM_TOKEN`，但值会被隐藏显示为 `••••••••`

## 步骤 3: 验证配置

### 3.1 检查 workflow 文件

确保你的 workflow 文件中正确引用了 Secret：

```yaml
env:
  NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 3.2 测试发布

1. 前往 GitHub 仓库的 **Actions** 标签页
2. 选择 **Publish rocketc-react-ui to npm** workflow
3. 点击 **Run workflow**
4. 选择版本类型（如 `patch`）
5. 点击 **Run workflow** 按钮
6. 查看 workflow 运行日志，确认发布成功

## 常见问题

### Q: 令牌权限不足怎么办？

A: 确保令牌类型是 **Automation** 或具有 **Publish** 权限。如果是 Granular 类型，需要确保：

- 权限范围包括 `publish`
- 包范围包括你要发布的包名（如 `react-uic`）

### Q: 如何撤销或删除令牌？

**在 npm 上撤销令牌：**

1. 访问 https://www.npmjs.com/settings/[你的用户名]/tokens
2. 找到对应的令牌
3. 点击 **Revoke**（撤销）

**在 GitHub 上删除 Secret：**

1. 进入仓库 Settings → Secrets and variables → Actions
2. 找到 `NPM_TOKEN`
3. 点击右侧的删除图标

### Q: 令牌过期了怎么办？

如果使用的是 **Automation** 类型令牌，不会过期。如果使用的是其他类型且已过期：

1. 在 npm 上创建新令牌
2. 在 GitHub 上更新 `NPM_TOKEN` Secret 的值

### Q: 如何更新 Secret？

1. 进入仓库 Settings → Secrets and variables → Actions
2. 找到 `NPM_TOKEN`
3. 点击右侧的编辑图标（铅笔图标）
4. 更新 Secret 值
5. 点击 **Update secret**

## 安全建议

1. ✅ **使用 Automation 类型令牌**：专门为 CI/CD 设计，不会过期
2. ✅ **定期轮换令牌**：即使 Automation 令牌不会过期，也建议定期更换
3. ✅ **不要将令牌提交到代码仓库**：始终使用 GitHub Secrets
4. ✅ **限制令牌权限**：如果使用 Granular 类型，只授予必要的权限
5. ✅ **监控令牌使用**：定期检查 npm 账户的访问日志

## 相关链接

- [npm 访问令牌文档](https://docs.npmjs.com/about-access-tokens)
- [GitHub Secrets 文档](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [npm 账户设置](https://www.npmjs.com/settings)
