import { defineCliConfig } from "sanity/cli";

const projectId = "a81gtm88";
const dataset = "production";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
});
