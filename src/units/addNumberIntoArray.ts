export function addNumberIntoArray(num: number, arr: Array<number>) {
  const index = arr.indexOf(num)
  if (index === -1) {
    arr.push(num)
  }
}
