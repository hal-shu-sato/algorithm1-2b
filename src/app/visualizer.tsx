import { Ratio } from 'react-bootstrap';

import styles from './page.module.css';

export default function Visualizer({
  array,
  size,
}: {
  array: number[];
  size: number;
}) {
  if (size === 0 || !Array.isArray(array)) return null;

  return (
    <div className={styles.visualizerContainer}>
      <Ratio aspectRatio="16x9">
        <div className={styles.visualizer}>
          {array.map((value, i) => (
            <div
              key={i}
              className={styles.element}
              style={{
                width: `${100 / size}%`,
                height: `${(100 * value) / size}%`,
                left: `${(100 * value) / size}%`,
              }}
            />
          ))}
        </div>
      </Ratio>
    </div>
  );
}
