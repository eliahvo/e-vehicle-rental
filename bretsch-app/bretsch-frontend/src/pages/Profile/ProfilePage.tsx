// tslint:disable: no-submodule-imports
import { Layout } from '../../components/Layout';
import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import styled from 'styled-components';
import { User } from '../../util/EntityInterfaces';
import { Divider, Grid, IconButton, makeStyles, MenuItem, TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import { useSnackbar } from 'notistack';
import { authContext } from '../../contexts/AuthenticationContext';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme) => ({
  headings: {
    color: theme.palette.primary.main,
  },
}));

export const MyProfile = styled.div`
  margin: 5rem 5rem 10rem 10rem;
`;

export const ProfileName = styled.div`
  font-size: 3rem;
  margin: -5.5rem 0 0 10rem;
`;

export const SectionTitle = styled.div`
  font-size: 2rem;
  margin: 3rem 0 0 0;
`;
export const Section = styled.div`
  font-size: 1.5rem;
  margin: 1rem 0 0 0;
`;

const useDateStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginRight: theme.spacing(1),
    width: 175,
  },
}));

const PaymentMethod = [
  {
    value: 'Paypal',
    label: 'Paypal',
  },
  {
    value: 'Visa',
    label: 'Visa',
  },
  {
    value: 'Bitcoin',
    label: 'Bitcoin',
  },
  {
    value: 'Mastercard',
    label: 'Mastercard',
  },
];

export const ProfilePage = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [profile, setProfile] = useState<User>();
  const [editNameSettings, setEditNameSettings] = React.useState(false);
  const [editMainSettings, setEditMainSettings] = React.useState(false);
  const [editPersonalSettings, setEditPersonalSettings] = React.useState(false);
  const [editPaymentSettings, setEditPaymentSettings] = React.useState(false);
  const {
    actions: { getTokenData },
  } = useContext(authContext);
  const [chosenPayment, setChosenPayment] = React.useState('EUR');

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const fetchProfile = async () => {
    const profileRequest = await fetch(`/api/user/${getTokenData()?.id}`, {
      headers: { 'content-type': 'application/json' },
      method: 'GET',
    });

    if (profileRequest.status === 200) {
      const profileJSON = await profileRequest.json();
      setProfile(profileJSON.data);
    } else {
      enqueueSnackbar(`Error while fetching profile data!`, {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const [values, setValues] = useState({
    city: profile?.city,
    email: profile?.email,
    firstName: profile?.firstName,
    password: '',
    passwordShadow: '',
    birthDate: profile?.birthDate,
    lastName: profile?.lastName,
    preferedPayment: profile?.preferedPayment,
    streetPlusNumber: profile?.streetPlusNumber,
  });

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setValues({ ...values, birthDate: date.toLocaleDateString() });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChosenPayment(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    if (e.target.name === 'passwordShadow') {
      if (values.password === e.target.value) {
        e.target.setCustomValidity('');
      } else {
        e.target.setCustomValidity("Passwords don't match!");
      }
    }
  };

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`/api/user/${getTokenData()?.id}`, {
      body: JSON.stringify({
        ...values,
        birthdate: selectedDate,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PATCH',
    });
    enqueueSnackbar(`Saved changes!`, {
      variant: 'success',
    });
    setEditNameSettings(false);
    setEditMainSettings(false);
    setValues({ ...values, ['password']: '' });
    setEditPersonalSettings(false);
    setEditPaymentSettings(false);
    fetchProfile();
  };

  return (
    <Layout title="My Profile">
      <MyProfile>
        <form onSubmit={onSubmitForm}>
          <AccountCircleTwoToneIcon style={{ fontSize: 100 }} className={classes.headings} />
          <ProfileName>
            {editNameSettings ? (
              <TextField
                onChange={fieldDidChange}
                margin="dense"
                name="firstName"
                label="First Name"
                defaultValue={profile?.firstName}
                type="text"
                required
              />
            ) : (
              `${profile?.firstName} `
            )}
            {editNameSettings ? (
              <TextField
                onChange={fieldDidChange}
                margin="dense"
                name="lastName"
                label="Last Name"
                defaultValue={profile?.lastName}
                type="text"
                required
              />
            ) : (
              profile?.lastName
            )}

            {editNameSettings ? (
              <>
                <IconButton>
                  <CancelIcon
                    style={{ margin: '0 0 0 0.5rem', fontSize: 30 }}
                    className={classes.headings}
                    onClick={() => {
                      setEditNameSettings(false);
                    }}
                  />
                </IconButton>
                <IconButton type="submit">
                  <CheckIcon
                    style={{ margin: '0 0 0 0.5rem', fontSize: 30 }}
                    className={classes.headings}
                    type="submit"
                  />
                </IconButton>
              </>
            ) : (
              <IconButton
                disabled={editNameSettings || editMainSettings || editPersonalSettings || editPaymentSettings}
              >
                <EditIcon
                  style={{ margin: '0 0 0 0.5rem', fontSize: 30 }}
                  className={classes.headings}
                  onClick={() => {
                    setEditNameSettings(true);
                  }}
                />
              </IconButton>
            )}
          </ProfileName>
          <Box mt={2}>
            <Divider />
          </Box>

          <SectionTitle className={classes.headings}>
            Main Settings
            {editMainSettings ? (
              <>
                <IconButton>
                  <CancelIcon
                    style={{ margin: '0 0 0 0.5rem', fontSize: 30 }}
                    className={classes.headings}
                    onClick={() => {
                      setEditMainSettings(false);
                      setValues({ ...values, ['password']: '' });
                    }}
                  />
                </IconButton>
                <IconButton type="submit">
                  <CheckIcon
                    type="submit"
                    style={{ margin: '0 0 0 0.5rem', fontSize: 30 }}
                    className={classes.headings}
                  />
                </IconButton>
              </>
            ) : (
              <IconButton
                disabled={editNameSettings || editMainSettings || editPersonalSettings || editPaymentSettings}
              >
                <EditIcon
                  style={{ margin: '0 0 0 0.5rem', fontSize: 30 }}
                  className={classes.headings}
                  onClick={() => {
                    setEditMainSettings(true);
                  }}
                />
              </IconButton>
            )}
            <Box mt={1} mb={1}>
              <Divider />
            </Box>
          </SectionTitle>
          <Section>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                Email:
              </Grid>
              <Grid item xs={5}>
                {editMainSettings ? (
                  <TextField
                    autoFocus
                    onChange={fieldDidChange}
                    margin="dense"
                    name="email"
                    label="Email"
                    defaultValue={profile?.email}
                    type="email"
                    fullWidth
                    required
                    autoComplete="off"
                  />
                ) : (
                  profile?.email
                )}
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                Password:
              </Grid>
              <Grid item xs={5}>
                {editMainSettings ? (
                  <TextField
                    onChange={fieldDidChange}
                    margin="dense"
                    name="password"
                    label="New Password"
                    type="password"
                    fullWidth
                  />
                ) : (
                  '**********'
                )}
                {values.password ? (
                  <>
                    <TextField
                      onChange={fieldDidChange}
                      margin="dense"
                      name="passwordShadow"
                      label="Confirm New Password"
                      type="password"
                      fullWidth
                      required
                    />
                    <TextField
                      onChange={fieldDidChange}
                      margin="dense"
                      name="passwordShadow"
                      label="Old Password"
                      type="password"
                      fullWidth
                      required
                    />
                  </>
                ) : (
                  ''
                )}
              </Grid>
            </Grid>
          </Section>
          <Section>
            <SectionTitle className={classes.headings}>
              Personal Settings
              {editPersonalSettings ? (
                <>
                  <IconButton>
                    <CancelIcon
                      style={{ margin: '0 0 0 0.5rem', fontSize: 30 }}
                      className={classes.headings}
                      onClick={() => {
                        setEditPersonalSettings(false);
                      }}
                    />
                  </IconButton>

                  <IconButton type="submit">
                    <CheckIcon
                      type="submit"
                      style={{ margin: '0 0 0 0.5rem', fontSize: 30 }}
                      className={classes.headings}
                    />
                  </IconButton>
                </>
              ) : (
                <IconButton
                  disabled={editNameSettings || editMainSettings || editPersonalSettings || editPaymentSettings}
                >
                  <EditIcon
                    style={{ margin: '0 0 0 0.5rem', fontSize: 30 }}
                    className={classes.headings}
                    onClick={() => {
                      setEditPersonalSettings(true);
                    }}
                  />
                </IconButton>
              )}
              <Box mt={1} mb={1}>
                <Divider />
              </Box>
            </SectionTitle>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                Birth Date:
              </Grid>
              <Grid item xs={4}>
                {editPersonalSettings ? (
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        id="birthDate"
                        name="birthDate"
                        margin="normal"
                        label="Birthdate"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        required
                        fullWidth
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                ) : (
                  profile?.birthDate
                )}
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                Address:
              </Grid>
              <Grid item xs={4}>
                {editPersonalSettings ? (
                  <TextField
                    onChange={fieldDidChange}
                    margin="dense"
                    name="streetPlusNumber"
                    label="Address"
                    defaultValue={profile?.streetPlusNumber}
                    type="text"
                    fullWidth
                    required
                  />
                ) : (
                  profile?.streetPlusNumber
                )}
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                City:
              </Grid>
              <Grid item xs={4}>
                {editPersonalSettings ? (
                  <TextField
                    onChange={fieldDidChange}
                    margin="dense"
                    name="city"
                    label="City"
                    defaultValue={profile?.city}
                    type="text"
                    fullWidth
                    required
                  />
                ) : (
                  profile?.city
                )}
              </Grid>
            </Grid>
          </Section>
          <Section>
            <SectionTitle className={classes.headings}>
              Payment Settings
              {editPaymentSettings ? (
                <>
                  <IconButton>
                    <CancelIcon
                      style={{ margin: '0 0 0 0.5rem', fontSize: 30 }}
                      className={classes.headings}
                      onClick={() => {
                        setEditPaymentSettings(false);
                      }}
                    />
                  </IconButton>
                  <IconButton type="submit">
                    <CheckIcon
                      type="submit"
                      style={{ margin: '0 0 0 0.5rem', fontSize: 30 }}
                      className={classes.headings}
                    />
                  </IconButton>
                </>
              ) : (
                <IconButton
                  disabled={editNameSettings || editMainSettings || editPersonalSettings || editPaymentSettings}
                >
                  <EditIcon
                    style={{ margin: '0 0 0 0.5rem', fontSize: 30 }}
                    className={classes.headings}
                    onClick={() => {
                      setEditPaymentSettings(true);
                    }}
                  />
                </IconButton>
              )}
              <Box mt={1} mb={1}>
                <Divider />
              </Box>
            </SectionTitle>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                Payment:
              </Grid>
              <Grid item xs={4}>
                {editPaymentSettings ? (
                  <TextField
                    autoFocus
                    onChange={handleChange}
                    margin="dense"
                    name="preferedPayment"
                    label="Preferred Payment"
                    value={chosenPayment}
                    type="text"
                    fullWidth
                    select
                    required
                  >
                    {PaymentMethod.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  profile?.preferedPayment
                )}
              </Grid>
            </Grid>
          </Section>
        </form>
      </MyProfile>
    </Layout>
  );
};
