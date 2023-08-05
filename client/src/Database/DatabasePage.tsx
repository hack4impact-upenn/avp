/* eslint-disable */
import React, { useState } from 'react';
import DataGrid from '../components/DataGrid';
import SideBar from '../components/SideBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { GlobalProps } from '../util/types/generic';
import UploadModal from './UploadModal';

const styles = {
  main: {
    width: '90%',
    margin: 'auto',
  },
  button: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
};

export default function DatabasePage({
  globalProps,
  setGlobalProps,
}: GlobalProps) {
  const drawerWidth = 230;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Card>
          <CardContent>
            <Typography sx={{ fontSize: '24px' }}>
              Referrals Database
            </Typography>
            <Typography sx={{ mb: 2 }} color="text.secondary">
              See all referrals here
            </Typography>
            <Button variant="contained" href="/form-add">
              ADD NEW REFERRAL
            </Button>
          </CardContent>
        </Card>
        <Box sx={{ height: '50px' }} />
        <DataGrid globalProps={globalProps} setGlobalProps={setGlobalProps} />
        <Button
         variant="contained"
         color="primary"
         style={styles.button}
         onClick={handleButtonClick}
       >
         Import CSV to Database
       </Button>
      </Box>
      <UploadModal
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
      />
    </Box>
  );
}
