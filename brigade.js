const { events, Job } = require("brigadier");

events.on("exec", (e, p) => {
  console.log("hello")
});

events.on("webhook", (e, p) => {
  console.log(e.provider)
});

events.on("trello", (e, p) => {
  console.log(e.payload);
});
