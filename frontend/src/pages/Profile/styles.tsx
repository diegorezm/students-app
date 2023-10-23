import styled from 'styled-components'

export const ModalContainer = styled.div`
  position:relative;
  background-color: ${props => props.colors.black};
  color: ${props => props.colors.white};
  display: flex;
  width: 540px;
  height: 360px;
  flex-direction: column;
  border-radius: 5px;
  margin: 6% auto;
  justify-content:center;
  font-size: 20px;
  text-align: center;
  align-items: center;
  gap: 15%;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  .btn{
    position: absolute; 
    top: 5px; 
    right: 10px; 
    margin: 0;
    padding: 0;
  }

`

export const Container = styled.div`
  position:relative;
  background-color: ${props => props.colors.black};
  color: ${props => props.colors.white};
  display: flex;
  flex-direction: column;
  margin: 5% auto;
  border-radius: 5px;
  justify-content:center;
  font-size: 20px;
  text-align: center;
  align-items: center;
  max-width: 540px;
  gap: 15%;
  height: 360px;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  .icon-text {
    display: inline-block;
    text-align: center;
    margin-left:5px;
  }

  .profile-pic:hover{
    cursor: pointer;
    opacity: 0.6;
  }
  .profile-pic  img{
    width: 200px;
    height: 160px;
    border-radius: 50%;

  }
  .profile-pic   .default-icon{
    font-size: 6em;
  }

  .btn{
    position: absolute; 
    top: 5px; 
    right: 10px; 
    margin: 0;
    padding: 0;
  }

  @media (max-width: 768px) {
    margin:0;
    border-radius: 0;
    padding: 0;
    height: 100%;
    box-shadow:none;
    z-index:0;
  }

`

export const Button = styled.button`
  width: 25%;
  height: 35px;
  background:  ${props => props.colors.cyan};
  color: white;
  border: none;
  border-radius: 5px;
  &:hover{
    background: ${props => props.colors.brightGreen};
  }
  @media (max-width: 768px) {
  width: 30%;
  height: 35px;
  }
`

export const BtnEdit = styled.div`
  display: flex; 
  justify-content: center;
  align-items: center;
  background: ${props => props.colors.cyan};
  text-align: center;
  width: 40px;
  height: 40px;
  color: white;
  border: none;
  border-radius: 50%;
  &:hover{
    background: ${props => props.colors.brightGreen};
    cursor: pointer;
  }
  /* @media (max-width: 768px) { */
  /*   width: 30%; */
  /*   height: 35px; */
  /* } */

`
export const BtnDel = styled.div`
  display: flex; 
  justify-content: center;
  align-items: center;
  background: ${props => props.colors.red};
  text-align: center;
  width: 40px;
  height: 40px;
  color: white;
  border: none;
  border-radius: 50%;
  &:hover{
    background: ${props => props.colors.yellow};
    cursor: pointer;
  }

`
