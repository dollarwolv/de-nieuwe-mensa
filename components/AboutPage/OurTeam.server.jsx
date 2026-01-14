import OurTeam from "./OurTeam";
import config from "@payload-config";
import { getPayload } from "payload";

async function OurTeamServer() {
  const payload = await getPayload({ config });
  const { docs: boardMembersByYear } = await payload.find({
    collection: "boards",
    depth: 1,
  });

  const { docs: cooksByYear } = await payload.find({
    collection: "cooks",
    depth: 1,
  });

  return (
    <OurTeam
      boardMembersByYear={boardMembersByYear}
      cooksByYear={cooksByYear}
    />
  );
}

export default OurTeamServer;
