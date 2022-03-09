import { server, setupPlugins } from "./server";

// Catch unhandling unexpected exceptions
process.on("uncaughtException", (error: Error) => {
  console.log(error);
  console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on("unhandledRejection", (reason: any) => {
  console.log(reason);
  console.error(`unhandledRejection ${reason}`);
});

// Define async start function
(async () => {
  try {
    await setupPlugins();
    await server.start();
    console.log("Server running at:", server.info.uri);
  } catch (err) {
    throw err;
  }
})();
