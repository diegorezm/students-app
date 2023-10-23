import styled from 'styled-components';

export const Nav = styled.nav`
  background: ${(props) => props.colors.black};
  min-width: 100%;
  max-height: 70px;
  font-size:25px;
  display: flex;
  color: ${(props) => props.colors.white};
  align-items: center;
  justify-content: space-between;
  padding: 15px;
`;

export const BtnDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;

  .links:hover, span:hover {
    cursor: pointer;
    color: ${(props) => props.colors.brightCyan};
  }

  .links {
    color: ${(props) => props.colors.white};
  }
  @media (max-width: 768px) {
    padding:0px;
  }

  span {
    display: flex; 
    align-items: center; 
    gap: 10px; 

    img {
      max-width: 50px;
      height: 70%;
      margin: 0;
      padding: 0;
      border-radius: 50%;
      border: 2px solid ${(props) => props.colors.yellow};
    }

    .default-icon {
      font-size: 50px; 
      color: ${(props) => props.colors.yellow}; 
    }
    @media (max-width: 768px) {
      gap:0px;
    }

  }
`;



export const Dropdown = styled.div`
  position: fixed;
  color: ${(props) => props.colors.white};
  border: 2px solid ${(props) => props.colors.green};
  gap: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align:center;
  width: 140px;
  height: 160px;
  top:6%;
  right: 2px;
  background-color: ${(props) => props.colors.black};
  border-radius: 5px;
  ul li{
    border-bottom: 2px solid gray; 
    border-width: 1px;
    margin: 10px;
  }
  
  .links{
    color: ${(props) => props.colors.white};
  }
  .links:hover,span:hover{
    cursor: pointer;
    color: ${(props) => props.colors.cyan};
    
  }
`

