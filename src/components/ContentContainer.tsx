import { ReactNode } from "react";
import styled from "styled-components";

const ContainerLayout = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: 10px;
  margin-left: 10px;
`;

interface ContentContainerProps {
  children: ReactNode;
}

const ContentContainer = ({ children }: ContentContainerProps) => (
  <ContainerLayout className="min-h-screen">{children}</ContainerLayout>
);

export default ContentContainer;
