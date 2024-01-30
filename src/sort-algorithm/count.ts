const countSort: SortFunc = (a, size, print) => {
  const m = Math.max(...a);

  const count = new Array<number>(m + 1).fill(0);
  for (let i = 0; i < size; i++) {
    count[a[i] - 1]++;
  }

  for (let i = 0; i < m; i++) {
    count[i + 1] += count[i];
  }

  const b = new Array<number>(size);
  for (let i = size - 1; i >= 0; i--) {
    const j = --count[a[i] - 1];
    b[j] = a[i];
  }

  for (let i = 0; i < size; i++) {
    a[i] = b[i];
    print(a);
  }
};

export default countSort;
