'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  Accordion,
  Button,
  ButtonGroup,
  Col,
  Form,
  Row,
  type FormGroupProps,
} from 'react-bootstrap';

import binSort from '@/sort-algorithm/bin';
import bubbleSort from '@/sort-algorithm/bubble';
import countSort from '@/sort-algorithm/count';
import heapSort from '@/sort-algorithm/heap';
import insertionSort from '@/sort-algorithm/insertion';
import mergeSort from '@/sort-algorithm/merge';
import quickSort from '@/sort-algorithm/quick';
import selectionSort from '@/sort-algorithm/selection';
import shellSort from '@/sort-algorithm/shell';
import SimpleSort from '@/sort-algorithm/simple';
import swap from '@/sort-algorithm/swap';

import Visualizer from './visualizer';

/* main */

/**
 * 初期ソートの種類
 */
type initialSortType = 'desc' | 'asc' | 'random';

/**
 * 初期配列を生成する
 */
function getInitialArray(size: number, initialSort: initialSortType) {
  const array = Array(size)
    .fill(undefined)
    .map((_, i) => i + 1);

  if (initialSort === 'asc') {
    return array;
  }
  if (initialSort === 'desc') {
    return array.reverse();
  }

  // randomize
  let i = size;
  while (i > 1) {
    const j = Math.floor(Math.random() * i--);
    swap(array, i, j);
  }
  return array;
}

/**
 * swap関数の型
 */
type SwapFunc = typeof swap;

/**
 * カスタムソートアルゴリズム関数の型
 */
type CustomSortFunc = (
  array: SortFuncParams[0],
  size: SortFuncParams[1],
  print: SortFuncParams[2],
  swap: SwapFunc,
) => void;

/**
 * ソートアルゴリズムを実行する
 */
function sort(
  sortAlgorithm: string,
  array: number[],
  size: number,
  print: (array: number[]) => void,
  customSort?: CustomSortFunc,
) {
  switch (sortAlgorithm) {
    case 'simple':
      SimpleSort(array, size, print);
      break;
    case 'bubble':
      bubbleSort(array, size, print);
      break;
    case 'selection':
      selectionSort(array, size, print);
      break;
    case 'insertion':
      insertionSort(array, size, print);
      break;
    case 'shell':
      shellSort(array, size, print);
      break;
    case 'quick':
      quickSort(array, size, print);
      break;
    case 'heap':
      heapSort(array, size, print);
      break;
    case 'merge':
      mergeSort(array, size, print);
      break;
    case 'count':
      countSort(array, size, print);
      break;
    case 'bin':
      binSort(array, size, print);
      break;
    case 'custom':
      if (typeof customSort === 'function')
        customSort(array, size, print, swap);
      break;
    default:
      console.log('invalid sort algorithm');
      break;
  }
}

/* UI */

/**
 * 入力各行の共通コンポーネント
 */
function FormRow({
  children,
  className,
  label,
  labelSpan = 4,
  ...props
}: Readonly<
  FormGroupProps & {
    label: string;
    labelSpan?: number;
  }
>) {
  return (
    <Form.Group
      as={Row}
      className={className ? `mb-2 ${className}` : 'mb-2'}
      {...props}
    >
      <Form.Label column xs={labelSpan}>
        {label}
      </Form.Label>
      <Col xs={12 - labelSpan}>{children}</Col>
    </Form.Group>
  );
}

export default function Main() {
  const [size, setSize] = useState<number | null>(64);
  const [initialSort, setInitialSort] = useState<initialSortType>('desc');
  const [sortAlgorithm, setSortAlgorithm] = useState('simple');
  const [customAlgorithm, setCustomAlgorithm] = useState('');
  const [startColor, setStartColor] = useState('#ff0000');
  const [endColor, setEndColor] = useState('#ffff00');
  const [bgColor, setBgColor] = useState('#000000');
  const [timePerStep, setTimePerStep] = useState<number | null>(10);

  const [visualizerState, setVisualizerState] = useState<{
    history: number[][];
    historySize: number;
    size: number;
  }>({ history: [], historySize: 0, size: 0 });
  const [historyIndex, setHistoryIndex] = useState(0);

  const visualize = () => {
    // initialize
    pause();
    setHistoryIndex(0);

    const history: number[][] = [];
    const print = (array: number[]) => {
      history.push([...array]);
    };

    const array = getInitialArray(size ?? 0, initialSort);
    print(array);

    if (sortAlgorithm === 'custom') {
      const customSort = eval(
        '(array, size, print, swap) => {' + customAlgorithm + '}',
      ) as CustomSortFunc;
      sort(sortAlgorithm, array, size ?? 0, print, customSort);
    } else {
      sort(sortAlgorithm, array, size ?? 0, print);
    }

    setVisualizerState({
      history,
      historySize: history.length,
      size: size ?? 0,
    });
  };

  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const play = useCallback(() => {
    if (intervalId === null) {
      const interval = setInterval(() => {
        setHistoryIndex((prev) => {
          if (prev + 1 < visualizerState.historySize) return prev + 1;
          return prev;
        });
      }, timePerStep ?? 1);
      setIntervalId(interval);
    }
  }, [intervalId, visualizerState.historySize, timePerStep]);

  const pause = useCallback(() => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [intervalId]);

  useEffect(() => {
    if (
      intervalId !== null &&
      historyIndex + 1 >= visualizerState.historySize
    ) {
      pause();
    }
  }, [intervalId, historyIndex, visualizerState.historySize, pause]);

  return (
    <>
      <Row>
        <Col xs="12" lg="3">
          <h1>Sort Visualizer</h1>
          <FormRow label="要素数" controlId="elementSize">
            <Form.Control
              type="number"
              min={1}
              max={512}
              value={size === null ? '' : size}
              onChange={(event) => {
                const value = event.target.value;
                if (value === '') {
                  setSize(null);
                } else {
                  const valueAsNumber = Number(value);
                  if (valueAsNumber > 512) {
                    setSize(512);
                  } else if (valueAsNumber < 1) {
                    setSize(1);
                  } else {
                    setSize(valueAsNumber);
                  }
                }
              }}
            />
          </FormRow>
          <FormRow label="初期列" controlId="initialSort">
            <Form.Select
              value={initialSort}
              onChange={(event) => {
                switch (event.target.value) {
                  case 'desc':
                  case 'asc':
                  case 'random':
                    setInitialSort(event.target.value);
                    break;
                  default:
                    break;
                }
              }}
            >
              <option value="desc">降順</option>
              <option value="asc">昇順</option>
              <option value="random">乱数</option>
            </Form.Select>
          </FormRow>
          <FormRow label="ソートアルゴリズム" controlId="sortAlgorithm">
            <Form.Select
              value={sortAlgorithm}
              onChange={(event) => setSortAlgorithm(event.target.value)}
            >
              <option value="simple">シンプルソート</option>
              <option value="bubble">バブルソート</option>
              <option value="selection">選択ソート</option>
              <option value="insertion">挿入ソート</option>
              <option value="shell">シェルソート</option>
              <option value="quick">クイックソート</option>
              <option value="heap">ヒープソート</option>
              <option value="merge">マージソート</option>
              <option value="count">カウントソート（不完全）</option>
              <option value="bin">ビンソート（不完全）</option>
              <option value="custom">カスタム...</option>
            </Form.Select>
          </FormRow>
          <FormRow
            label="カスタムソートアルゴリズム"
            controlId="customAlgorithm"
            className={sortAlgorithm === 'custom' ? '' : 'd-none'}
          >
            <div>function customSort (array, size, print, swap) {'{'}</div>
            <Form.Control
              as="textarea"
              rows={3}
              value={customAlgorithm}
              onChange={(event) => setCustomAlgorithm(event.target.value)}
            />
            <div>{'}'}</div>
          </FormRow>
          <div className="mb-2 d-grid gap-2">
            <Button onClick={visualize}>実行</Button>
          </div>
          <Accordion className="mb-2">
            <Accordion.Item eventKey="customize">
              <Accordion.Header>カスタマイズ</Accordion.Header>
              <Accordion.Body>
                <FormRow label="開始色" controlId="startColor" labelSpan={6}>
                  <Form.Control
                    type="color"
                    value={startColor}
                    onChange={(event) => setStartColor(event.target.value)}
                  />
                </FormRow>
                <FormRow label="終了色" controlId="endColor" labelSpan={6}>
                  <Form.Control
                    type="color"
                    value={endColor}
                    onChange={(event) => setEndColor(event.target.value)}
                  />
                </FormRow>
                <FormRow label="背景色" controlId="bgColor" labelSpan={6}>
                  <Form.Control
                    type="color"
                    value={bgColor}
                    onChange={(event) => setBgColor(event.target.value)}
                  />
                </FormRow>
                <FormRow
                  label="1stepあたりのミリ秒数"
                  controlId="timePerStep"
                  labelSpan={6}
                >
                  <Form.Control
                    type="number"
                    min={1}
                    value={timePerStep === null ? '' : timePerStep}
                    onChange={(event) => {
                      const value = event.target.value;
                      if (value === '') {
                        setTimePerStep(null);
                      } else {
                        const valueAsNumber = Number(value);
                        if (valueAsNumber < 1) {
                          setTimePerStep(1);
                        } else {
                          setTimePerStep(valueAsNumber);
                        }
                      }
                    }}
                  />
                </FormRow>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col xs="12" lg="9">
          <Row className="mb-2 gx-2">
            <ButtonGroup as={Col} xs="auto">
              <Button key="first" onClick={() => setHistoryIndex(0)}>
                最初
              </Button>
              <Button
                key="back"
                onClick={() =>
                  setHistoryIndex((prev) => {
                    if (prev - 1 >= 0) return prev - 1;
                    return prev;
                  })
                }
              >
                前
              </Button>
              <Button
                key="play"
                onClick={play}
                {...(intervalId !== null ? { disabled: true } : [])}
              >
                再生
              </Button>
              <Button key="pause" onClick={pause}>
                一時停止
              </Button>
              <Button
                key="next"
                onClick={() =>
                  setHistoryIndex((prev) => {
                    if (prev + 1 < visualizerState.historySize) return prev + 1;
                    return prev;
                  })
                }
              >
                次
              </Button>
              <Button
                key="last"
                onClick={() => setHistoryIndex(visualizerState.historySize - 1)}
              >
                最後
              </Button>
            </ButtonGroup>
            <Col className="d-flex align-items-center">
              {visualizerState.historySize !== 0 ? (
                <>
                  <Form.Range
                    value={historyIndex + 1}
                    min={1}
                    max={visualizerState.historySize}
                    onChange={(event) => {
                      setHistoryIndex(Number(event.target.value) - 1);
                    }}
                  />
                  <div className="text-nowrap">
                    {historyIndex + 1} / {visualizerState.historySize} steps
                  </div>
                </>
              ) : (
                <></>
              )}
            </Col>
          </Row>
          <Visualizer
            array={visualizerState.history[historyIndex]}
            size={visualizerState.size}
            startColor={startColor}
            endColor={endColor}
            bgColor={bgColor}
          />
        </Col>
      </Row>
    </>
  );
}
