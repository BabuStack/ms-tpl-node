export default function delay<T = any>(timeout: number, ...args: any[]): Promise<T> {
  return new Promise(resolve => setTimeout(resolve, timeout, ...args));
}