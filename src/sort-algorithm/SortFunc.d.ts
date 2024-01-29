type SortFunc = (
  array: number[],
  size: number,
  print: (array: number[]) => void,
) => void;
type SortFuncParams = Parameters<SortFunc>;
