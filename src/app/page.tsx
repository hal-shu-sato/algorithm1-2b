import { Container } from 'react-bootstrap';

import Visualizer from './visualizer';
// import styles from './page.module.css';

export default function Home() {
  return (
    <Container as="main" className="my-3">
      <h1>Sort Visualizer</h1>
      <Visualizer />
    </Container>
  );
}
