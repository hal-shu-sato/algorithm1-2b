import { Ratio } from 'react-bootstrap';

import styles from './page.module.css';

function parseRGBHex(hex: string) {
  const m = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return { red: 0, green: 0, blue: 0 };
  return {
    red: parseInt(m[1], 16),
    green: parseInt(m[2], 16),
    blue: parseInt(m[3], 16),
  };
}

function getRGBDec(red: number, green: number, blue: number) {
  return `rgb(${red},${green},${blue})`;
}

export default function Visualizer({
  array,
  size,
  startColor,
  endColor,
  bgColor,
}: {
  array: number[];
  size: number;
  startColor: string;
  endColor: string;
  bgColor: string;
}) {
  if (size === 0 || !Array.isArray(array)) return null;

  const max = Math.max(...array);

  const startColorRGB = parseRGBHex(startColor);
  const endColorRGB = parseRGBHex(endColor);

  return (
    <div className={styles.visualizerContainer}>
      <Ratio aspectRatio="16x9">
        <div style={{ backgroundColor: bgColor }}>
          {array.map((value, i) => (
            <div
              key={i}
              className={styles.element}
              style={{
                width: `${100 / size}%`,
                height: `${(100 * value) / max}%`,
                left: `${(100 * i) / size}%`,
                backgroundColor: getRGBDec(
                  startColorRGB.red +
                    ((endColorRGB.red - startColorRGB.red) * value) / max,
                  startColorRGB.green +
                    ((endColorRGB.green - startColorRGB.green) * value) / max,
                  startColorRGB.blue +
                    ((endColorRGB.blue - startColorRGB.blue) * value) / max,
                ),
              }}
            />
          ))}
        </div>
      </Ratio>
    </div>
  );
}
