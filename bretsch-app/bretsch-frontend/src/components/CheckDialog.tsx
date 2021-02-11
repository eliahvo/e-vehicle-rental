import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { Checkmark } from 'react-checkmark';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, useTheme } from '@material-ui/core';
import { AppContext } from '../contexts/AppContext';

export const CheckDialog: React.FC<{ text: String }> = ({ text }) => {
  const theme = useTheme();
  const { checkDialog, toggleCheckDialog } = React.useContext(AppContext);

  return (
    <Dialog open={checkDialog} maxWidth="sm">
      <DialogTitle>
        <Checkmark color={theme.palette.primary.main} size="xxLarge" />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
