import { Link } from "react-router";
import Section from "../../components/Section/Section";
import Container from "../../components/Container/Container";

export default function Unauthorized() {
  return (
    <main>
      <Section>
        <Container>
          <p>You need to sign in</p>
          <Link to="/sign-in">
            <button>Go to Sign In</button>
          </Link>
        </Container>
      </Section>
    </main>
  );
}
