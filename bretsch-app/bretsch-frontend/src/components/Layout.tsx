// tslint:disable: no-submodule-imports
import React from 'react';
import styled from 'styled-components/macro';
import { Chip } from '@material-ui/core';
import CopyrightIcon from '@material-ui/icons/Copyright';
import { AppBarHeader } from './AppBarHeader';

const headerHeight = '3.65rem';
const footerHeight = '2rem';

const Header = styled.header`
  height: ${headerHeight};
  width: 100%;
  align-items: center;
`;

const Main = styled.main`
  height: calc(100vh - ${headerHeight});
`;
// If Main shouldn't overlap the footer use: height: calc(100vh - ${headerHeight} - ${footerHeight});

const Footer = styled.footer`
  height: ${footerHeight};
  bottom: 0;
  left: 5rem;
  position: fixed;
  z-index: 999;
`;

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <Header data-testid="header">
        <AppBarHeader title={title} />
      </Header>
      <Main>{children}</Main>
      <Footer data-testid="footer">
        <Chip style={{ color: 'black' }} color="primary" size="small" icon={<CopyrightIcon />} label="2021 BRETSCH™" />
      </Footer>
    </>
  );
};
