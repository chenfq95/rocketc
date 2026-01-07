import { Link } from 'wouter';
import { Button } from '@rocketc/react';
import NotFoundIllustration from '../../assets/not-found.svg?react';

export default function NotFoundPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col items-center gap-6 text-center">
        {/* SVG 配图 */}
        <div className="flex items-center justify-center">
          <NotFoundIllustration className="w-64 h-64 md:w-80 md:h-80" />
        </div>

        {/* 404 文字 */}
        <div className="flex flex-col gap-2">
          <h1 className="text-6xl font-bold text-foreground md:text-8xl">404</h1>
          <h2 className="text-xl font-semibold text-muted-foreground md:text-2xl">页面未找到</h2>
          <p className="text-sm text-muted-foreground md:text-base">
            抱歉，您访问的页面不存在或已被移动
          </p>
        </div>

        {/* 返回按钮 */}
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/">返回首页</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">前往仪表盘</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
