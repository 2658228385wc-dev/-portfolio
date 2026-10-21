/**
 * 站内路由跳转（事件驱动）。
 * 锚点导航（<a href="#...">）在沙箱 iframe 预览中会被拦截，导致点击无反应；
 * 这里通过 CustomEvent 通知 App 切换视图，同时仍同步 location.hash 以支持
 * 直接输入 URL / 刷新恢复。双重保险：两者任一可用即可生效。
 */
export const ROUTE_EVENT = "app:navigate";

export function navigate(hash: string) {
  try {
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    }
  } catch {
    /* 沙箱环境下 hash 赋值可能被拦，忽略 */
  }
  const num = hash.match(/project\/(\d+)/)?.[1] ?? null;
  window.dispatchEvent(new CustomEvent(ROUTE_EVENT, { detail: num }));
}
