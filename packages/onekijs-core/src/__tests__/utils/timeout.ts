export async function asyncTimeout(timeout = 0): Promise<any> {
  return await new Promise((resolve: any) => setTimeout(resolve, timeout));
}

export async function wait(fn: () => boolean, timeout = 5000, interval = 10): Promise<any> {
  const start = new Date().getTime();
  while (true) {
    const resolved = fn();
    if (resolved) return;
    const now = new Date().getTime();
    if (now - start > timeout) {
      throw new Error('wait timeout');
    }
    await asyncTimeout(interval);
  }
}

export async function waitCallback(callback?: jest.Mock<any, any>, timeout?: number, interval?: number): Promise<any> {
  if (!callback) throw new Error('callback is undefined');
  return await wait(
    () => {
      return callback.mock.calls.length > 0;
    },
    timeout,
    interval,
  );
}
