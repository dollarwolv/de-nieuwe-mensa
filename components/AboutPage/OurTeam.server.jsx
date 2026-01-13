import OurTeam from "./OurTeam";
import config from "@payload-config";
import { getPayload } from "payload";

async function OurTeamServer() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "boards",
    depth: 1,
  });

  return <OurTeam boards={docs} />;
}

export default OurTeamServer;
