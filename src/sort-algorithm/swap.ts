export default function swap(array: number[], i: number, j: number): void {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}
