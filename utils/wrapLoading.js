const ora = require("ora");

async function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

async function wrapLoading(fn, message, ...args) {
  const spinner = ora(message);
  spinner.start();
  try {
    let resData = await fn(...args);
    spinner.succeed();
    return resData;
  } catch (e) {
    spinner.fail("request failed,refetch...");
    await sleep(1000);
    return wrapLoading(fn, message, ...args);
  }
}

module.exports = {
  wrapLoading,
};
