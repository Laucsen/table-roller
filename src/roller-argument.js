
export function isArgument(arg) {
  const reg = new RegExp(/^[$](\w+)$/g);
  return reg.test(arg);
}


export default function ArgumentResolver(arg) {
  const reg = new RegExp(/^[$](\w+)$/g);
  const res = reg.exec(arg);

  if (res === null) {
    return -1;
  }

  return res[1];
}
