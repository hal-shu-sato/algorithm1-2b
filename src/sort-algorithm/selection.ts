import swap from './swap';

const selectionSort: SortFunc = (array, size, print) => {
  for (let i = 0; i < size - 1; i++) {
    let minPos = i;
    for (let j = i + 1; j < size; j++) {
      if (array[j] < array[minPos]) {
        minPos = j;
        print(array);
      }
    }
    swap(array, i, minPos);
    print(array);
  }
};

export default selectionSort;
