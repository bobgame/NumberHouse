export function objCopy(source: any): any {
  return JSON.parse(JSON.stringify(source))
}
