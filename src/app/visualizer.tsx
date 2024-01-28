'use client';

import { useState } from 'react';

import { Button, Col, Form, Row, type FormGroupProps } from 'react-bootstrap';

function FormRow({
  children,
  className,
  label,
  ...props
}: Readonly<FormGroupProps & { label: string }>) {
  return (
    <Form.Group
      as={Row}
      className={className ? `my-2 ${className}` : 'my-2'}
      {...props}
    >
      <Form.Label column xs="3">
        {label}
      </Form.Label>
      <Col xs="9">{children}</Col>
    </Form.Group>
  );
}

export default function Visualizer() {
  const [size, setSize] = useState<number | null>(64);
  const [initialSort, setInitialSort] = useState('desc');
  const [sortAlgorithm, setSortAlgorithm] = useState('bubble');

  return (
    <>
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
              return;
            } else {
              setSize(Number(value));
            }
          }}
        />
      </FormRow>
      <FormRow label="初期状態" controlId="initialSort">
        <Form.Select
          value={initialSort}
          onChange={(event) => setInitialSort(event.target.value)}
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
          <option value="bubble">バブルソート</option>
          <option value="selection">選択ソート</option>
          <option value="insertion">挿入ソート</option>
          <option value="merge">マージソート</option>
          <option value="quick">クイックソート</option>
          <option value="heap">ヒープソート</option>
          <option value="radix">基数ソート</option>
        </Form.Select>
      </FormRow>
      <Button variant="primary">実行</Button>
    </>
  );
}
