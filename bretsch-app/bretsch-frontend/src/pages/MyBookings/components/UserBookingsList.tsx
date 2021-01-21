import { Booking } from '../../../util/EntityInterfaces';
import styled from 'styled-components/macro';
import React from 'react';
import { Layout } from '../../../components/Layout';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

export interface UserBookingProps {
  booking: Booking;
}

export const UserBookingItem: React.FC<UserBookingProps> = ({ booking }) => {
  const classes = useStyles();
  const { bookingId, createdAt, updatedAt, startDate, endDate, paymentStatus, price, vehicle } = booking;
  const [userBookings, setUserBookings] = React.useState<Booking[]>([]);

  const onPauseResume = () => {};

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar src={`./icons/marker/${vehicle.vehicleType.type}.png`} />
          </Grid>
          <Grid item xs>
            <Typography>
              {price} <br />
              {startDate} <br />
              {endDate} <br />
              {vehicle.vehicleType.type}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
