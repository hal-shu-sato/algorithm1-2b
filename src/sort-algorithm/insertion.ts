import swap from './swap';

const insertionSort: SortFunc = (array, size, print) => {
  for (let i = 1; i < size; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (array[j] <= array[j + 1]) break;
      swap(array, j, j + 1);
      print(array);
    }
  }
};

export default insertionSort;
