import styled from 'styled-components';

const Container = styled.div`
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    color: white
  }
`

export default function PageNotFound(): JSX.Element {
  return (
    <Container>
      <h2>404 - Page Not Found</h2>
    </Container>
  )
}