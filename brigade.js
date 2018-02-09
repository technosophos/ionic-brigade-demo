const { events, Job } = require("brigadier");

const ACTION_MOVE = "action_move_card_from_list_to_list"

events.on("exec", (e, p) => {
  console.log("hello")
});

events.on("webhook", (e, p) => {
  console.log(e.provider)
});

events.on("trello", (e, p) => {
  console.log(e.payload);
  const hook = JSON.parse(e.payload)
  const d = hook.action.display
  if (d.translationKey != ACTION_MOVE) {
    return
  }

  var s = slack(p, hook)
  s.run()
});

function slack(p, hook) {
  const d = hook.action.display
  var slack = new Job("slack-notify", "technosophos/slack-notify:latest", ["/slack-notify"])
  var m = `From "${d.entities.listBefore.text}" to "${d.entities.listAfter.text}" <${hook.model.shortUrl}> <@U0RMKK605>`  
  slack.storage.enabled = false
  slack.env = {
    SLACK_WEBHOOK: p.secrets.SLACK_WEBHOOK,
    SLACK_USERNAME: "Trello",
    SLACK_TITLE: `Moved "${d.entities.card.text}"`,
    SLACK_MESSAGE: m,
    SLACK_ICON: "https://a.trellocdn.com/images/ios/0307bc39ec6c9ff499c80e18c767b8b1/apple-touch-icon-152x152-precomposed.png"
  }
}
