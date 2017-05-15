
export function isRoll(roll) {
  const expression = new RegExp(/^(\d+)(d(\d+))?(x(\d+))?$/g);
  return expression.test(roll);
}

export default function rollerResolver(roll) {
  const expression = new RegExp(/^(\d+)(d(\d+))?(x(\d+))?$/g);
  const res = expression.exec(roll);

  if (res === null) {
    return -1;
  }

  const count = Number(res[1]);
  const faces = Number(res[3]);
  const multiplier = Number(res[5]) || 1;

  // Resolve
  if (res[3] === undefined) {
    return count * multiplier;
  }

  let result = 0;
  for (let i = 0; i < count; i++) {
    result += Math.floor(Math.random() * faces) + 1;
  }
  return result * multiplier;
}
