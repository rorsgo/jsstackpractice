import Bee from "bee-queue";

import CancellationMail from "../app/jobs/CancellationMail";

const jobs = [CancellationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        beeQueue: new Bee(key, {
          redis: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
          }
        }),
        handle
      };
    });
  }

  add(queue, job) {
    return this.queues[queue]
      .beeQueue
      .createJob(job)
      .save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { beeQueue, handle } = this.queues[job.key]

      beeQueue.process(handle);
      }
    );
  }

}

export default new Queue();