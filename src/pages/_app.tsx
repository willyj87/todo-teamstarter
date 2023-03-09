import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import { Button, Card, Container, Nav, Navbar } from "react-bootstrap";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Todo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Tasks</Nav.Link>
              <Nav.Link href="#link">Done</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>
        <Container className="container" fluid>
          <Card className="text-center mt-5 mb-10" border="light">
            <Card.Body>
              <Card.Title>Welcome to your todo app</Card.Title>
              <Card.Text>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt.
              </Card.Text>
            </Card.Body>
          </Card>
          <Component {...pageProps} />
        </Container>
      </main>
    </>
  );
}
