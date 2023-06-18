import React from 'react';
import { Grid } from '@mui/material';
import avpLogo from '../assets/avpLogo.svg';

/**
 * This styles the whole screen as a grid component, serves as a wrapper to ensure
 * that we know what role it plays, as well as height as the whole screen, spacing, and resizing
 * @param children The {@link AnyChildren} representing the components of the screen.
 * @returns
 */
function Header() {
  return (
    <header>
      <div style={{ color: 'white', display: 'flex', marginBottom: '50px' }}>
        <img
          src={avpLogo}
          alt="logo"
          style={{ marginTop: '50px', marginLeft: '70px' }}
        />
        <div style={{ marginTop: '50px', marginLeft: '10px', color: 'black' }}>
          Anti-Violence <br /> Partnership of Philadelphia
        </div>
      </div>
    </header>
  );
}

export default Header;
