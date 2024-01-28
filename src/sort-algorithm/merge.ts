function merge(
  from: number[],
  into: number[],
  length: number,
  size: number,
  print: (array: number[]) => void,
) {
  let start = 0;
  while (start < size) {
    let i = start;
    let j = start + length;
    let k = start;
    const iEnd = Math.min(start + length, size);
    const jEnd = Math.min(start + length + length, size);
    while (i < iEnd && j < jEnd) {
      if (from[i] <= from[j]) {
        into[k++] = from[i++];
      } else {
        into[k++] = from[j++];
      }
      print(into);
    }
    while (i < iEnd) {
      into[k++] = from[i++];
      print(into);
    }
    while (j < jEnd) {
      into[k++] = from[j++];
      print(into);
    }
    start += length + length;
  }
}

const mergeSort: SortFunc = (a, size, print) => {
  const b = new Array<number>(size);
  let length = 1;
  while (length < size) {
    merge(a, b, length, size, print);
    merge(b, a, 2 * length, size, print);
    length *= 4;
  }
};

export default mergeSort;
