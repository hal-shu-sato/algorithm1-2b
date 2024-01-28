import swap from './swap';

function downHeap(
  array: number[],
  k: number,
  r: number,
  print: (array: number[]) => void,
) {
  const v = array[k];
  for (;;) {
    let j = k + k + 1;
    if (j > r) break;
    if (j !== r && array[j + 1] > array[j]) j++;
    if (v >= array[j]) break;
    array[k] = array[j];
    print(array);
    k = j;
  }
  array[k] = v;
  print(array);
}

const heapSort: SortFunc = (array, size, print) => {
  for (let i = size - 1; i >= 0; i--) {
    downHeap(array, i, size - 1, print);
  }
  for (let i = size - 1; i > 0; i--) {
    swap(array, 0, i);
    print(array);
    downHeap(array, 0, i - 1, print);
  }
};

export default heapSort;
