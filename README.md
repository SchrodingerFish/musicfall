# MusicFall - 沉浸式高品质音乐播放器

MusicFall 是一个基于 **Next.js 15** 和 **React** 构建的现代 Web 音乐播放器。它采用极致的 **Glassmorphism (玻璃拟态)** 设计风格，旨在提供沉浸式的视觉体验和高品质的音频享受。

## ✨ 主要功能

- **🔍 多源音乐搜索**
  - 支持 Netease (网易云), Tencent (QQ音乐), Spotify, YouTube Music 等多个音乐源。
  - 快速聚合搜索结果，一键播放。

- **🎧 高品质音频播放**
  - **音质选择**: 支持从标准 (128k) 到 **无损 (Lossless/SQ)** 及 **Hi-Res** 的多种音质切换。
  - **无缝播放**: 切换音质时自动保持播放进度。

- **📥 下载功能**
  - 支持一键下载当前播放的歌曲。
  - 下载文件自动匹配当前选择的音质。

- **📺 沉浸式全屏模式**
  - 精美的全屏播放界面，带有动态模糊背景。
  - **歌词同步**: 支持 LRC 歌词解析与自动滚动。

- **🌍 国际化 (i18n) 支持**
  - 内置多语言支持：**简体中文**、**English**、**한국어 (韩语)**、**日本語 (日语)**。
  - 侧边栏一键切换语言，且自动保存用户偏好。

- **🎨 现代化 UI/UX**
  - 全局采用 **Glassmorphism** 设计风格。
  - 响应式布局，流畅的交互动画。
  - 包含播放队列、音量控制、进度条拖拽等完整播放器功能。

## 🛠️ 技术栈

- **框架**: [Next.js 15 (App Router)](https://nextjs.org/)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: CSS Modules (Vanilla CSS with CSS Variables for theming)
- **图标**: [Lucide React](https://lucide.dev/)
- **状态管理**: React Context API (PlayerContext, LanguageContext)
- **API**: GDStudio Music API

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/your-username/musicfall.git
cd musicfall
```

### 2. 安装依赖

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000) 即可开始体验。

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 📂 项目结构

```
src/
├── app/                 # Next.js App Router 页面
│   ├── layout.tsx       # 全局布局 (包含 Providers)
│   ├── page.tsx         # 首页
│   └── search/          # 搜索页
├── components/          # React 组件
│   ├── FullScreenPlayer/# 全屏播放器 (歌词, 背景)
│   ├── PlayerBar/       # 底部播放控制条
│   ├── Sidebar/         # 侧边栏导航
│   └── SongList/        # 歌曲列表
├── context/             # 全局状态 (Context)
│   ├── PlayerContext    # 播放器核心逻辑
│   └── LanguageContext  # 国际化逻辑
├── services/            # API 服务
│   └── api.ts           # 音乐接口封装
├── types/               # TypeScript 类型定义
└── locales/             # 翻译文件
```

## 📝 许可证

MIT License
