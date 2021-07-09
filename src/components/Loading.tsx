import LoadingSVG from 'assets/loading.svg';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100%;
  flex-direction: column;
  align-items: center;

  img {
    width: 15%;
  }

  span {
    color: white;
    font-size: 30px;
  }
`

function Loading() {
  return (
    <LoadingWrapper>
      <img alt="loading" src={LoadingSVG}/>
      <span>Loading</span>
    </LoadingWrapper>
  )
}

export default Loading;