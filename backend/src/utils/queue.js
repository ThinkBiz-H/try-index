let queue = [];
let processing = false;

export const addToQueue = (job) => {
  queue.push(job);
  processQueue();
};

const processQueue = async () => {
  if (processing) return;

  processing = true;

  while (queue.length > 0) {
    const job = queue.shift();
    await job();

    // delay (natural feel)
    await new Promise((res) => setTimeout(res, 2000));
  }

  processing = false;
};
