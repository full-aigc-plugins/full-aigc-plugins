/** 判断 release-tooling 同步是否应写入 AGENTS.md。 */
export function shouldWriteAgents({ exists, current, expected, refreshAgents }) {
  if (!exists) return true;
  if (current === expected) return false;
  return refreshAgents === true;
}
