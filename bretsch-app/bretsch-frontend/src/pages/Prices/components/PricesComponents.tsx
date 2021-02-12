// tslint:disable: no-submodule-imports
import { Booking, VehicleType } from '../../../util/EntityInterfaces';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: `${theme.spacing(1)}px auto`,
    maxWidth: 500,
    padding: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
}));

export interface PricesProps {
    vehicleType: VehicleType;
}
 

export const PricesItem: React.FC<PricesProps> = ({ vehicleType }) => {
  const classes = useStyles();
  const { type, startPrice, pricePerMinute } = vehicleType;
  

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
          <Avatar src={`./icons/marker/${vehicleType.type}.png`} />
          </Grid>
          <Grid item xs>
            <Typography>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  Name:
                </Grid>
                <Grid item xs={6}>
                  {type} 
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  Start price:
                </Grid>
                <Grid item xs={7}>
                  {startPrice} €
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  Price per minute:
                </Grid>
                <Grid item xs={7}>
                  {pricePerMinute} €
                </Grid>
              </Grid>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
