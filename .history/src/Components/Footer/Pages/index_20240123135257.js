import styled from "styled-components";

export { default } from "./Footer";

export const Divfooter = styled.div`
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246/var(--tw-bg-opacity));
  margin-bottom: 0px
  `
export const LiFooter = styled.a`
  color: black;
  text-decoration: none;
  line-height: 1.5;
  &:hover {
    color: #FF385C;
    font-weight: 500;
  }
`;

export const TitleF = styled.h4`
  font-weight: bold;
  color: #FF385C;
  padding: 0px 15px; 

`;
export const Container = styled.div`

`

export const LiFooterBt = styled.a`
  color: black;
  text-decoration: none;
  line-height: 1.8;
  font-size: 13px;
  &:hover {
    color: #FF385C;
    font-weight: 500;
  }
  opacity: 0.7;
`;