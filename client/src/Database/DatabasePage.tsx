/* eslint-disable */
import React from 'react';
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

const styles = {
  main: {
    width: '90%',
    margin: 'auto',
  },
};

export default function DatabasePage() {
  const drawerWidth = 230;
  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
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
            <Button variant="contained">ADD NEW REFERRAL</Button>
          </CardContent>
        </Card>
        <Box sx={{ height: '50px' }} />
        <DataGrid />
      </Box>
    </Box>
  );
}
