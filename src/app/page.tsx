import { Container } from 'react-bootstrap';

import Main from './main';

export default function Home() {
  return (
    <Container as="main" className="my-3">
      <Main />
    </Container>
  );
}
