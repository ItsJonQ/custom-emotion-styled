import { css, styled } from '../styles';

const Header = styled('h1')({
  background: 'rgba(0, 25, 255, 0.1)',
  color: '#0055ff',
  textAlign: 'center',
  padding: 20,
  lineHeight: 1,
});

export default function Home() {
  return (
    <div>
      <Header as="h2" margin={20}>
        Hello
      </Header>
    </div>
  );
}
