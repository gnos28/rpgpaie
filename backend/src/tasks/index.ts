import CronJob from "node-cron";
import { getDsnEveUseCase } from "../useCases/getDsnEve/getDsnEve.core";
import { getDsnEveAdapter } from "../useCases/getDsnEve/getDsnEve.spi";

const initScheduledJobs = () => {
  if (process.env.NODE_ENV !== "test") {
    console.log("initScheduledJobs...");

    // const every30min = "*/30 * * * *";
    // const every6min = "*/2 * * * *";
    const at1pm = "0 13 * * *";

    const cronimportPolyvalenceFromPowerAutomateAndAdd = CronJob.schedule(
      at1pm,
      () => getDsnEveUseCase(getDsnEveAdapter)
    );

    cronimportPolyvalenceFromPowerAutomateAndAdd.start();
  }
};

export default { initScheduledJobs };
