import * as React from 'react';
import {AppBar, Container, Typography} from '@material-ui/core';

import "./index.component.scss"

export default function Header() {
  return (
      <AppBar position="static" className="app-header">
        <Container className="header-container">
          <Typography variant="h6" component="div" style={{fontFamily: "OpenSansBold"}}>
            CONTACT MANAGER
          </Typography>
        </Container>
      </AppBar>
  );
}
