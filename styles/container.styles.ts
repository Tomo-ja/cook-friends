import styled from 'styled-components'

const Container = styled.div`
	display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1024px;
  margin-inline: auto;
  margin-top: 66px;
  padding-top: 36px;


  main{
    width: max(66%, 400px);
    transition: width 0.5s ease;
  }

  aside{
    width: max(30%, 200px);
    overflow: hidden;
    transform-origin: left;
    transition: width 0.5s ease;
  }

  @media screen and (max-width: 1112px) {
    margin-inline: 44px;
}
  @media only screen and (max-width: 768px)  {
      margin-inline: min(44px, 5%);
      main{
        width: 100%;
      }

      aside{
        width: 0;
        height: 0;
      }
      
      aside.open{
        position: absolute;
        top: 60px;
        right: 0;
        width: min(100vw, 460px);
        height: 100vh;
        padding-top: 36px;
        padding-inline: 16px;
        margin: 0;
        background-color: white;
        box-shadow: -11px 1px 12px -4px rgba(0,0,0,0.75);
      }
  }

  @media only screen and (max-width: 375px)  {
    
  }




`

export default Container