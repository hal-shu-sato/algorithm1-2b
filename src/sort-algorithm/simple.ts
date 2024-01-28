import swap from './swap';

const SimpleSort: SortFunc = (array, size, print) => {
  for (let i = 0; i < size - 1; i++) {
    for (let j = i + 1; j < size; j++) {
      if (array[i] > array[j]) {
        swap(array, i, j);
        print(array);
      }
    }
  }
};

export default SimpleSort;
