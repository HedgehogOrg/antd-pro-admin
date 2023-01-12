let status = 'pending';
let result: any;
// eslint-disable-next-line consistent-return
function wrapPromise(promise: Promise<any>) {
  const suspender = promise.then(
    (r: any) => {
      status = 'success';
      result = r;
    },
    (e: any) => {
      status = 'error';
      result = e;
    },
  );
  if (status === 'pending') {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw suspender;
  } else if (status === 'error') {
    throw result;
  } else if (status === 'success') {
    return result;
  }
}

/**
 * promise结束就返回组件
 * @param promise Promise 必须resolve一个React组件
 * @returns 组件
 */
function SuspenseWithPromise({ promise, children }: { promise: Promise<any>, children: any }) {
  wrapPromise(promise);
  return children;
}

export default SuspenseWithPromise;
