import { Ability, AbilityBuilder } from "@casl/ability";
// Defines how to detect object's type
function subjectName(item) {
  if (!item || typeof item === "string") {
    return item;
  }
  return item.__type;
}

const ability = new Ability([], { subjectName });

// TODO: using redux
const role = localStorage.getItem("role");
if (role) {
  ability.update(defineRulesFor(role));
}

function defineRulesFor(role) {
  const { can, rules } = AbilityBuilder.extract();
  const crud = ["read", "create", "update", "delete"];
  switch (role) {
    case "1":
      can("view", ["User", "Question", "Import", "Interview"]);
      break;
    case "2":
      can("view", ["Question", "Interview"]);
      break;
    default:
      break;
  }
  return rules;
}

export default ability;
