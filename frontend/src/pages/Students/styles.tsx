import styled from "styled-components";
export const StyledTable = styled.table`
  caption-side: top;
  overflow-x: scroll;
  font-size: 20px;
  min-width: 560px;
  border-collapse: collapse;
  text-align: center;
  margin: 2% auto;
  width: 75%;
  background-color: ${props => props.colors.white};
  tbody tr{
    border-bottom: 1px solid ${props =>  props.colors.black};
    border-right: 1px solid ${props =>  props.colors.black};
  }

  thead > tr {
    background-color: ${props => props.colors.black};

    color: ${props => props.colors.white};

  }

  td {
    padding: 5px 10px;
    color: ${props => props.colors.black};
  }
  
  @media (max-width: 768px) {
    th, td {
      width: 100%;
    }

    tbody tr {
      margin-bottom: 15px;
    }
  }

`;

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

export const ModalContainer = styled.div`
  position:relative;
  background-color: ${props => props.colors.black};
  color: ${props => props.colors.white};
  display: flex;
  width: 600px;
  height: 400px;
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

export const BtnAdd = styled.button`
  position: fixed;
  display: flex;
  bottom: 2%;
  right: 2%;
  justify-content: center;
  align-items: center;
  text-align: center;
  border:  none;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background: ${props => props.colors.black};
  color: ${props => props.colors.white};
  transition: all 0.3s;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
  &:hover{
    background: ${props => props.colors.brightBlack};
    color: ${props => props.colors.brightWhite};
    width: 70px;
    height: 70px;
  }
`

export const Button = styled.button`
  width: 25%;
  height: 35px;
  background: ${props => props.colors.cyan};
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