import users from "./users";
import teamsData from "./teams";

const getSelectedMembers = (teamId) => {
  const team = teamsData.find((t) => t.id === teamId);
  if (!team) return [];

  const leader = team.teamMembers.find((member) => member.role === "LEADER");
  const normalMembers = team.teamMembers.filter((member) => member.role !== "LEADER");

  if (normalMembers.length < 2) return [];

  const firstMember = normalMembers[0];
  const lastMember = normalMembers[normalMembers.length - 1];

  // Map team members to their full details from users.js
  const selectedUsers = [leader, firstMember, lastMember].map((member) =>
    users.find((user) => user.username === member.username)
  );

  return selectedUsers;
};

export default getSelectedMembers;
