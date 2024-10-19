export function sleep(timeout = 500) {
  return new Promise((resolve) =>
    setTimeout(
      () => {
        resolve(Math.random() > 0.6);
      },
      Math.floor(Math.random() * 1000 + timeout),
    ),
  );
}
