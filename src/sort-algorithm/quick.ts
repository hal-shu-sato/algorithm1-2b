import swap from './swap';

function quick(
  array: number[],
  left: number,
  right: number,
  print: (array: number[]) => void,
) {
  if (left >= right) return;

  const pivot = array[Math.floor((left + right) / 2)];
  let i = left;
  let j = right;

  do {
    while (array[i] < pivot) i++;
    while (array[j] > pivot) j--;
    if (i <= j) {
      swap(array, i, j);
      i++;
      j--;
      print(array);
    }
  } while (i <= j);
  quick(array, left, j, print);
  quick(array, i, right, print);
}

const quickSort: SortFunc = (array, size, print) => {
  quick(array, 0, size - 1, print);
};

export default quickSort;
