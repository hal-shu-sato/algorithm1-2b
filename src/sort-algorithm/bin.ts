const binSort: SortFunc = (a, size, print) => {
  const m = Math.max(...a);

  const head = new Array<number>(m);
  for (let i = 0; i < m; i++) {
    head[i] = -1;
  }

  const next = new Array<number>(size);
  for (let i = size - 1; i >= 0; i--) {
    const value = a[i];
    next[i] = head[value - 1];
    head[value - 1] = i;
  }

  const b = new Array<number>(size);
  let i = 0;
  for (let j = 0; j < m; j++) {
    let p = head[j];
    while (p !== -1) {
      b[i++] = a[p];
      p = next[p];
    }
  }

  for (let i = 0; i < size; i++) {
    a[i] = b[i];
    print(a);
  }
};

export default binSort;
