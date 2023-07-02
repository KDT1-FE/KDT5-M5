import styled from 'styled-components'

export const LoadingSpinner = () => {
  return (
    <SpinnerWrap>
      <div className="spinner"></div>
    </SpinnerWrap>
  )
}

const SpinnerWrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .spinner {
    width: 200px;
    height: 100px;
    &::after {
      content: '';
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 64px;
      height: 64px;
      margin-top: -32px;
      margin-left: -32px;
      border-radius: 50%;
      border: 4px solid #dedede;
      border-top-color: #ffa9be;
      animation: spinner 0.3s linear infinite;
    }
  }
  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
