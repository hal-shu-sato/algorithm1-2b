import swap from './swap';

const shellSort: SortFunc = (array, size, print) => {
  let h = 1;
  while (h < size) {
    h = 3 * h + 1;
  }
  while (h > 1) {
    h = Math.floor(h / 3);
    for (let i = h; i < size; i++) {
      for (let j = i - h; j >= 0; j -= h) {
        if (array[j] > array[j + h]) {
          swap(array, j, j + h);
          print(array);
        } else {
          break;
        }
      }
    }
  }
};

export default shellSort;
