import styled, {createGlobalStyle, keyframes} from "styled-components";
import {Link} from "react-router-dom";

export const ToastStyleSuccess = (colorScheme) => {
  return {
    style: {
      background: colorScheme.name === "gruvbox_dark" ? colorScheme.background : colorScheme.background,
      color: colorScheme.name === "gruvbox_dark" ? colorScheme.foreground : colorScheme.brightBlack,
    },
  };
};

export const ToastStyleError = (colorScheme) => {
  return {
    style: {
      background: colorScheme.name === "gruvbox_dark" ? colorScheme.red : colorScheme.red,
      color: colorScheme.name === "gruvbox_dark" ? colorScheme.foreground : colorScheme.white,
    },
  };
};


export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }
  html, body, #root{
    height: 100%;
    background: ${(props) => props.colors.background};
    color:${(props) => props.colors.foreground};
  }
  button{
    cursor: pointer;
  }
  a{
    text-decoration: none;
  }
  ul{
    list-style: none;
  }
`;
export const Container = styled.section`
  margin: auto;
  text-align: center;
  max-width: 780px;
  min-height: 350px;
  background: ${(props) => props.colors.black};
  color: ${(props) => props.colors.white};
  border-radius: 5px;
  @media (max-width: 768px) {
    min-width: 100%;
    min-height: 100%;
    margin:0;
    border-radius: 0;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  height: 100%;
  padding-top: 25px;
  margin: 10%;
  gap: 10px;
  @media (max-width: 768px) {
    margin:0;
    gap: 15px;
    background: ${(props) => props.colors.black};
    color: ${(props) => props.colors.white};
  }
`

export const Input = styled.input`
  width: 100%;
  height: 25px;
  text-align:center;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => props.colors.background};
  color: ${(props) => props.colors.foreground};
  font-size: 16px;

  @media (max-width: 768px) {
    height: 35px;
  }
`
export const Button = styled.button`
  width: 10%;
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
export const Label = styled.label` flex: 1;
  text-align: left;
`

export const FormLink = styled(Link)`
  color: ${props => props.colors.yellow};
  &:hover,
  &:focus{
    color: ${props => props.colors.brightWhite};
  }
`
export const TableButton = styled(Link)`
  color: ${props => props.color};
  padding: 5px;
  &:hover,
  &:focus{
    color: ${props => props.focus};
  }
`
export const Title = styled.h1`
    text-align: center;
    display: block; 
    margin-top: 10px;

    @media (max-width: 768px) {
      display: none; 
    }
`;


export const LoadingWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
`

export const BounceAnimation = keyframes`
  0% { 
    margin-bottom: 0; 
  }

  50% { 
    margin-bottom: 1rem;
  }

  100% { 
    margin-bottom: 0;
  }
`
export const Dot = styled.div`
  background-color: ${(props) => props.color.black};
  border-radius: 50%;
  width: 0.75rem;
  height: 0.75rem;
  margin: 0 0.25rem;
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${(props) => props.delay};
`

