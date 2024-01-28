import swap from './swap';

const bubbleSort: SortFunc = (array, size, print) => {
  for (let i = 0; i < size - 1; i++) {
    for (let j = size - 1; j > i; j--) {
      if (array[j - 1] > array[j]) {
        swap(array, j - 1, j);
        print(array);
      }
    }
  }
};

export default bubbleSort;
