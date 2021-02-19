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
import { maxDate, minAge, validateBirthday } from '../../util/ValidBirthday';
import { validatePassword } from '../../util/RequestHelper';

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
    token,
    actions: { getTokenData },
  } = useContext(authContext);
  const [chosenPayment, setChosenPayment] = React.useState('');

  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  const fetchProfile = async () => {
    const profileRequest = await fetch(`/api/user/${getTokenData()?.id}`, {
      headers: { 'content-type': 'application/json', Authorization: token },
      method: 'GET',
    });

    if (profileRequest.status === 200) {
      const profileJSON = await profileRequest.json();
      setProfile(profileJSON.data);

      const bday = new Date(profileJSON.data?.birthDate);
      bday.setHours(0, 0, 0, 0);
      setSelectedDate(bday);

      setChosenPayment(profileJSON.data?.preferedPayment);
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
    passwordOld: '',
    birthDate: profile?.birthDate,
    lastName: profile?.lastName,
    preferedPayment: profile?.preferedPayment,
    streetPlusNumber: profile?.streetPlusNumber,
  });

  const handleDateChange = (date: Date) => {
    if (date) {
      date.setHours(0, 0, 0, 0);
    }
    setSelectedDate(date);
    setValues({ ...values, birthDate: new Date(date).toDateString() });
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

    if (e.target.name === 'passwordOld') {
      e.target.setCustomValidity('');
    }
  };

  const validateOldPassword = async (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.name === 'passwordOld') {
      if (!(await validatePassword(`${profile?.email}`, `${values.passwordOld}`, token))) {
        e.target.setCustomValidity('Incorrect password!');
      }
    }
  };

  const onSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateBirthday(selectedDate)) {
      return;
    }

    await fetch(`/api/user/${getTokenData()?.id}`, {
      body: JSON.stringify({
        ...values,
      }),
      headers: { 'Content-Type': 'application/json', Authorization: token },
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
          <ProfileName data-testid="profile-edit-profilename">
            {editNameSettings ? (
              <TextField
                data-testid="profile-edit-firstname1"
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
                data-testid="profile-edit-lastname2"
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
                    data-testid="profile-edit-name"
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
                  data-testid="profile-edit-name"
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
                    data-testid="profile-edit-mainSettings1"
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
                  data-testid="profile-edit-mainSettings1"
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
                    data-testid="profile-edit-email1"
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
                    data-testid="profile-edit-password1"
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
                      data-testid="profile-edit-password2"
                      onChange={fieldDidChange}
                      margin="dense"
                      name="passwordShadow"
                      label="Confirm New Password"
                      type="password"
                      fullWidth
                      required
                    />
                    <TextField
                      data-testid="profile-edit-password3"
                      onChange={fieldDidChange}
                      onBlur={validateOldPassword}
                      margin="dense"
                      name="passwordOld"
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
                      data-testid="profile-edit-personalSettings"
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
                    data-testid="profile-edit-personalSettings"
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
                        data-testid="profile-edit-birthDate"
                        id="birthDate"
                        name="birthDate"
                        margin="normal"
                        label="Birthdate"
                        format="yyyy-MM-dd"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        required
                        fullWidth
                        disableFuture
                        maxDate={maxDate}
                        helperText={`You have to be at least ${minAge} years old!`}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                ) : (
                  `${new Date(profile?.birthDate).getFullYear()}-${(
                    '0' +
                    (new Date(profile?.birthDate).getMonth() + 1)
                  ).slice(-2)}-${('0' + new Date(profile?.birthDate).getDate()).slice(-2)}`
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
                    data-testid="profile-edit-adress"
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
                    data-testid="profile-edit-city"
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
                      data-testid="profile-edit-paymentSettings"
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
                    data-testid="profile-edit-paymentSettings"
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
                    data-testid="profile-edit-payment"
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
