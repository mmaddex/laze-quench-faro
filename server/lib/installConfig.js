const { name: extensionName } = require("../../webtask.json");

module.exports = {
  DENY_ACCESS_RULE_NAME:
    "DO-NOT-MODIFY not sure if this is required",
  EXTENSION_CLIENT_NAME: extensionName,
  EXTENSION_AUDIENCE: "urn:breaking-changes", // The audience for the extension API
};
