import { Booking, User, Vehicle } from '../../../util/EntityInterfaces';
import React, {useContext, useEffect, useState} from 'react';
import { DataGrid, ValueFormatterParams } from '@material-ui/data-grid';
import { Dialog, DialogContent, DialogTitle, FormControl, IconButton, MenuItem, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import Button from '@material-ui/core/Button';
import { chipMessageError, chipMessageSucess, CreateButton, deleteDialog } from './vehicleTable';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { authContext } from '../../../contexts/AuthenticationContext';

export const BookingTable = () => {
  const { token } = useContext(authContext);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [vehiclesSelect, setVehiclesSelect] = useState<any[]>([]);
  const [usersSelect, setUsersSelect] = useState<any[]>([]);

  const [choosedBookings, setChoosebBookings] = useState<Booking>();
  const [choosedBookingsDeleteID, setchoosebBookingsDeleteID] = useState<string>();

  const [bDeleteDialog, setbDeleteDialog] = useState(false);

  const handleBDeleteDialogClose = () => {
    setbDeleteDialog(false);
  };
  // create and update dialog
  const [bStartDate, setbStartDate] = useState<Date | null>(new Date());
  const [bEndDate, setbEndDate] = useState<Date | null>(new Date());
  const [bpaymentStatus, setbpaymentStatus] = useState<string>('');
  const [bPrice, setubPrice] = useState<string>('');
  const [bVehicleId, setbVehicleId] = useState<string>('');
  const [buserId, setbUserId] = React.useState<string>('');

  const handlebStartDateChange = (date: Date | null) => {
    setbStartDate(date);
  };
  const handlebEndDateChange = (date: Date | null) => {
    setbEndDate(date);
  };
  const handleUPaymentStatusChange = (e) => {
    setbpaymentStatus(e.target.value.toString());
  };
  const handleBPriceChange = (e) => {
    setubPrice(e.target.value.toString());
  };
  const handleBVehicleChange = (e) => {
    setbVehicleId(e.target.value.toString());
  };
  const handleUUserChange = (e) => {
    setbUserId(e.target.value.toString());
  };

  // Dialog
  const [createDialogBooking, setCreateDialogBooking] = useState<boolean>(false);
  const [updateDialogBooking, setUpdateDialogBooking] = useState<boolean>(false);

  const handleCreateDialogOpen = () => {
    setCreateDialogBooking(true);
  };
  const handleCreateDialogClose = () => {
    setCreateDialogBooking(false);
    clearInput();
  };
  const handleUpdateDialogClose = () => {
    setUpdateDialogBooking(false);
    clearInput();
  };

  // Chips
  const [chipBookingDelete, setchipBookingDelete] = useState<boolean>(false);
  const [chipErrorDelete, setchipErrorDelete] = useState<boolean>(false);

  const [chipBookingUpdate, setchipBookingUpdate] = useState<boolean>(false);
  const [chipErrorUpdate, setchipErrorUpdate] = useState<boolean>(false);

  const [chipBookingCreate, setchipBookingCreate] = useState<boolean>(false);
  const [chipErrorCreate, setchipErrorCreate] = useState<boolean>(false);


  const handleBookingDeleteSucChipClose = () => {
    setchipBookingDelete(false);
  };
  const handleBookingDeleteErrorChipClose = () => {
    setchipErrorDelete(false);
  };
  const handleBookingUpdateSucChipClose = () => {
    setchipBookingUpdate(false);
  };
  const handleBookingUpdateErrorChipClose = () => {
    setchipErrorUpdate(false);
  };
  const handleBookingCreateSucChipClose = () => {
    setchipBookingCreate(false);
  };
  const handleBookingCreateErrorChipClose = () => {
    setchipErrorCreate(false);
  };

  useEffect(() => {
    allBookings().then((r) => allVehicles().then(() => allUsers()));
  }, []);

  useEffect(() => {
    createVehicleArray();
  }, [vehicles]);

  useEffect(() => {
    createUserArray();
  }, [users]);

  useEffect(() => {
    if (choosedBookings) {
      setchoosebBookingsDeleteID(choosedBookings.bookingId.toString());
      fillInput();
    }
  }, [choosedBookings]);

  const createVehicleArray = () => {
    const newArr = [];
    for (const v of vehicles) {
      newArr.push({ value: v.vehicleId, label: v.licencePlate });
    }
    setVehiclesSelect(newArr);
  };

  const createUserArray = () => {
    const newArr = [];
    for (const u of users) {
      newArr.push({ value: u.userId, label: u.firstName + ' ' + u.lastName });
    }
    setUsersSelect(newArr);
  };

  // get all vehicles
  const allVehicles = async () => {
    const vehicleRequest = await fetch(`/api/vehicle/`, {
      headers: { 'content-type': 'application/json' },
      method: 'GET',
    });
    if (vehicleRequest.status === 200) {
      const vehicleJSON = await vehicleRequest.json();
      await setVehicles(vehicleJSON.data);
    }
  };

  // get all users
  const allUsers = async () => {
    const userRequest = await fetch(`/api/user/`, {
      headers: { 'content-type': 'application/json', Authorization: token },
      method: 'GET',
    });
    if (userRequest.status === 200) {
      const userJSON = await userRequest.json();
      setUsers(userJSON.data);
    }
  };

  // get all bookings
  const allBookings = async () => {
    const userRequest = await fetch(`/api/booking/`, {
      headers: { 'content-type': 'application/json', Authorization: token },
      method: 'GET',
    });
    if (userRequest.status === 200) {
      const userJSON = await userRequest.json();
      setBookings(userJSON.data);
    }
  };

  // create Booking
  const createBookingDB = async (e) => {
    e.preventDefault();
    const bookingRequest = await fetch(`/api/booking/`, {
      headers: { 'content-type': 'application/json', Authorization: token },
      method: 'POST',
      body: JSON.stringify({
        startDate: bStartDate.toDateString(),
        endDate: bEndDate.toString(),
        paymentStatus: bpaymentStatus,
        price: bPrice,
        vehicleId: bVehicleId,
        userId: buserId,
      }),
    });
    if (bookingRequest.status === 201) {
      await allBookings();
      setchipBookingCreate(true);
    } else {
      setchipErrorCreate(true);
    }
    handleCreateDialogClose();
    await clearInput();
  };

  // delete booking
  const deleteBookingDB = async () => {
    if (choosedBookings) {
      const vehicleRequest = await fetch(`/api/booking/` + choosedBookings.bookingId, {
        headers: { 'content-type': 'application/json', Authorization: token },
        method: 'DELETE',
      });
      if (vehicleRequest.status === 200) {
        await allBookings();
        setchipBookingDelete(true);
      } else {
        setchipErrorDelete(true);
      }
      handleBDeleteDialogClose();
    }
  };

  // update vehicles
  const updateBookingDB = async (e) => {
    e.preventDefault();
    if (choosedBookings) {
      const vehicleRequest = await fetch(`/api/booking/` + choosedBookings.bookingId, {
        headers: { 'content-type': 'application/json', Authorization: token },
        method: 'PATCH',
        body: JSON.stringify({
          endDate: bEndDate,
          price: bPrice,
          paymentStatus: bpaymentStatus,
        }),
      });
      if (vehicleRequest.status === 200) {
        await allBookings();
        handleUpdateDialogClose();
        setchipBookingUpdate(true);
      } else {
        handleUpdateDialogClose();
        setchipErrorUpdate(true);
      }
      await clearInput();
    }
  };

  const fillInput = () => {
    if (choosedBookings) {
      setbpaymentStatus(choosedBookings.paymentStatus);
      setbEndDate(choosedBookings.endDate);
      setubPrice(choosedBookings.price.toString());
    }
  };

  const clearInput = () => {
    setbStartDate(new Date());
    setbEndDate(new Date());
    setbpaymentStatus('');
    setubPrice('');
    setbVehicleId('');
    setbUserId('');
  };

  const updateChoosedBooking = async (id: string) => {
    const choosedBooking = bookings.filter((b) => b.bookingId.toString() === id);
    if (choosedBooking.length === 1) {
      await setChoosebBookings(choosedBooking[0]);
      setUpdateDialogBooking(true);
    }
  };

  // all bookings
  const bookingRows: any[] = [];
  for (const booking of bookings) {
    bookingRows.push({
      id: booking.bookingId,
      user: [booking.user.firstName, booking.user.lastName],
      vehicle: booking.vehicle.licencePlate,
      startdate: booking.startDate,
      enddate: booking.endDate,
      payment: booking.paymentStatus,
      price: booking.price,
      button: booking.bookingId,
    });
  }
  const bookingUpdateDialog = (mOpen: boolean, hClose: any, actiontype: string, finishFunc: any) => {
    return (
      <Dialog onClose={hClose} aria-labelledby="simple-dialog-title" open={mOpen}>
        <form onSubmit={finishFunc}>
          <DialogTitle id="simple-dialog-title">{actiontype} booking</DialogTitle>
          <DialogContent dividers>
            <p>Payment Status: </p>
            <FormControl required>
              <TextField
                data-testid="admin-updateBooking-PaymentStatus"
                onChange={handleUPaymentStatusChange}
                value={bpaymentStatus}
                id="outlined-required"
                variant="outlined"
              />
            </FormControl>
            <p>End:</p>
            <FormControl required>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker data-testid="admin-updateBooking-End"
                  margin="normal"
                  id="date-picker-dialog"
                  format="dd/MM/yyyy"
                  value={bEndDate}
                  onChange={handlebEndDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <KeyboardTimePicker data-testid="admin-updateBooking-TimePicker"
                  margin="normal"
                  id="time-picker"
                  label="Time picker"
                  value={bEndDate}
                  onChange={handlebEndDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
            <p>Price: </p>
            <FormControl required>
              <TextField
                data-testid="admin-updateBooking-Price"
                onChange={handleBPriceChange}
                value={bPrice}
                id="outlined-required"
                variant="outlined"
              />
            </FormControl>
          </DialogContent>
          <div>
            <Button data-testid="admin-createVehicle-createSend" type="submit" color="primary">
              {actiontype}
            </Button>
          </div>
        </form>
      </Dialog>
    );
  };

  const bookingCreateDialog = (mOpen: boolean, hClose: any, actiontype: string, finishFunc: any) => {
    return (
      <Dialog onClose={hClose} aria-labelledby="simple-dialog-title" open={mOpen}>
        <form onSubmit={finishFunc}>
          <DialogTitle id="simple-dialog-title">{actiontype} booking</DialogTitle>
          <DialogContent dividers>
            <p>Payment Status: </p>
            <FormControl required>
              <TextField
                data-testid="admin-createBooking-PaymentStatus"
                onChange={handleUPaymentStatusChange}
                value={bpaymentStatus}
                id="outlined-required"
                variant="outlined"
              />
            </FormControl>
            <p>Start:</p>
            <FormControl required>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker data-testid="admin-createBooking-Start"
                  margin="normal"
                  id="date-picker-dialog"
                  format="dd/MM/yyyy"
                  value={bStartDate}
                  onChange={handlebStartDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
                <KeyboardTimePicker data-testid="admin-createBooking-TimePicker"
                  margin="normal"
                  id="time-picker"
                  label="Time picker"
                  value={bStartDate}
                  onChange={handlebStartDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
            <p>Vehicle: </p>
            <FormControl required>
              <TextField
                data-testid="admin-createBooking-Vehicle"
                id="outlined-select-currency"
                select
                value={bVehicleId}
                onChange={handleBVehicleChange}
                variant="outlined"
              >
                {vehiclesSelect.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
            <p>User: </p>
            <FormControl required>
              <TextField
                data-testid="admin-createVehicle-User"
                id="outlined-select-currency"
                select
                value={buserId}
                onChange={handleUUserChange}
                variant="outlined"
              >
                {usersSelect.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </DialogContent>
          <div>
            <Button data-testid="admin-createVehicle-createSend" type="submit" color="primary">
              {actiontype}
            </Button>
          </div>
        </form>
      </Dialog>
    );
  };

  const handleDeleteBooking = async (e: any) => {
    let id = '';
    id = e.currentTarget.id.toString();
    const bDelete = bookings.filter((b) => b.bookingId.toString() === id);
    if (bDelete.length === 1) {
      await setChoosebBookings(bDelete[0]);
      await setbDeleteDialog(true);
    }
  };

  return (
    <>
      <CreateButton>
        <Button data-testid="admin-createBooking-createButton" variant="outlined" onClick={handleCreateDialogOpen} color="primary">
          Create
        </Button>
        <Button style={{ margin: 10 }} variant="outlined" onClick={allBookings}>
          Refresh
        </Button>
      </CreateButton>
      <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              columns={[
                {
                  field: 'id',
                  headerName: 'ID',
                  renderCell: (params: ValueFormatterParams) => (
                    <>
                      <IconButton
                        aria-label="info"
                        color="primary"
                        onClick={() => {
                          updateChoosedBooking(params.value.toString());
                        }}
                        style={{ marginRight: 5, color: 'primary' }}
                      >
                        <EditIcon />
                      </IconButton>
                      {params.value.toString()}
                    </>
                  ),
                },
                {
                  field: 'user',
                  headerName: 'User',
                  width: 150,
                  renderCell: (params: ValueFormatterParams) => (
                    <>
                      {params.value[0]} {params.value[1]}
                    </>
                  ),
                },
                { field: 'vehicle', headerName: 'Vehicle', width: 150 },
                { field: 'startdate', headerName: 'Start', width: 250 },
                { field: 'enddate', headerName: 'End', width: 250 },
                { field: 'payment', headerName: 'Payment Status' },
                { field: 'price', headerName: 'Price' },
                {
                  field: 'button',
                  headerName: 'Button',
                  renderCell: (params: ValueFormatterParams) => (
                    <strong>
                      <Button data-testid="12345"
                        id={params.value.toString()}
                        onClick={handleDeleteBooking}
                        variant="outlined"
                        color="secondary"
                        size="small"
                        style={{ marginLeft: 16 }}
                      >
                        Delete
                      </Button>
                    </strong>
                  ),
                },
              ]}
              rows={bookingRows}
              disableColumnMenu
              showToolbar
            />
          </div>
        </div>
      </div>
      {chipMessageSucess(chipBookingDelete, handleBookingDeleteSucChipClose, 'Successfully delete Booking.')}
      {chipMessageError(
        chipErrorDelete,
        handleBookingDeleteErrorChipClose,
        'Something went wrong. Could not delete booking.',
      )}

      {chipMessageSucess(chipBookingUpdate, handleBookingUpdateSucChipClose, 'Successfully update Booking.')}
      {chipMessageError(
        chipErrorUpdate,
        handleBookingUpdateErrorChipClose,
        'Something went wrong. Could not update booking.',
      )}

      {chipMessageSucess(chipBookingCreate, handleBookingCreateSucChipClose, 'Successfully create Booking.')}
      {chipMessageError(
        chipErrorCreate,
        handleBookingCreateErrorChipClose,
        'Something went wrong. Could not create booking.',
      )}

      {bookingCreateDialog(createDialogBooking, handleCreateDialogClose, 'Create', createBookingDB)}
      {bookingUpdateDialog(updateDialogBooking, handleUpdateDialogClose, 'Update', updateBookingDB)}
      {deleteDialog(choosedBookingsDeleteID, 'Booking', handleBDeleteDialogClose, deleteBookingDB, bDeleteDialog)}
    </>
  );
};
