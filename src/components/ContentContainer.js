import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContainerLayout = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 10px;
`;
const ContentContainer = ({ children }) => (
  <ContainerLayout className="min-h-screen">{children}</ContainerLayout>
);

ContentContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContentContainer;