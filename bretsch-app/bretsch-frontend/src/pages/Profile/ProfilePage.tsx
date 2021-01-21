import { Layout } from '../../components/Layout';
import React, { useEffect, useState } from 'react';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import styled from 'styled-components';
import { User } from '../../util/EntityInterfaces';
import { Divider, Grid, makeStyles, TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';

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

export const ProfilePage = () => {
  const [profile, setProfile] = useState<User>();
  const [editNameSettings, setEditNameSettings] = React.useState(false);
  const [editMainSettings, setEditMainSettings] = React.useState(false);
  const [editPersonalSettings, setEditPersonalSettings] = React.useState(false);
  const [editPaymentSettings, setEditPaymentSettings] = React.useState(false);
  const classes = useStyles();

  const fetchProfile = async function () {
    const profileRequest = await fetch(`/api/user/1`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    });

    if (profileRequest.status === 200) {
      const taskJSON = await profileRequest.json();
      console.log(taskJSON.data);
      setProfile(taskJSON.data);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <Layout title="My Profile">
      <MyProfile>
        <AccountCircleTwoToneIcon style={{ fontSize: 100 }} className={classes.headings} />
        <ProfileName>
          {editNameSettings ? (
            <TextField autoFocus margin="dense" id="name" value={profile?.firstName} type="text" fullWidth />
          ) : (
            profile?.firstName + ' '
          )}
          {editNameSettings ? (
            <TextField autoFocus margin="dense" id="name" value={profile?.lastName} type="text" fullWidth />
          ) : (
            profile?.lastName
          )}

          {editNameSettings ? (
            <>
              <CancelIcon
                style={{ margin: '0 0 0 0.5rem', fontSize: 30 }}
                className={classes.headings}
                onClick={() => {
                  setEditNameSettings(false);
                }}
              />
              <CheckIcon
                style={{ margin: '0 0 0 0.5rem', fontSize: 30 }}
                className={classes.headings}
                onClick={() => {}}
              />
            </>
          ) : (
            <EditIcon
              style={{ margin: '0 0 0 0.5rem', fontSize: 30 }}
              className={classes.headings}
              onClick={() => {
                setEditNameSettings(true);
              }}
            />
          )}
        </ProfileName>
        <Box mt={2}>
          <Divider />
        </Box>

        <SectionTitle className={classes.headings}>
          Main Settings
          {editMainSettings ? (
            <>
              <CancelIcon
                style={{ margin: '0 0 0 0.5rem', fontSize: 30 }}
                className={classes.headings}
                onClick={() => {
                  setEditMainSettings(false);
                }}
              />
              <CheckIcon
                style={{ margin: '0 0 0 0.5rem', fontSize: 30 }}
                className={classes.headings}
                onClick={() => {}}
              />
            </>
          ) : (
            <EditIcon
              style={{ margin: '0 0 0 0.5rem', fontSize: 30 }}
              className={classes.headings}
              onClick={() => {
                setEditMainSettings(true);
              }}
            />
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
            <Grid item xs={4}>
              {editMainSettings ? (
                <TextField autoFocus margin="dense" id="name" value={profile?.email} type="text" fullWidth />
              ) : (
                profile?.email
              )}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              Password:
            </Grid>
            <Grid item xs={4}>
              {editMainSettings ? (
                <TextField autoFocus margin="dense" id="name" value={profile?.hashedPassword} type="text" fullWidth />
              ) : (
                profile?.hashedPassword
              )}
            </Grid>
          </Grid>
        </Section>
        <Section>
          <SectionTitle className={classes.headings}>
            Personal Settings
            {editPersonalSettings ? (
              <>
                <CancelIcon
                  style={{ margin: '0 0 0 0.5rem', fontSize: 30 }}
                  className={classes.headings}
                  onClick={() => {
                    setEditPersonalSettings(false);
                  }}
                />
                <CheckIcon
                  style={{ margin: '0 0 0 0.5rem', fontSize: 30 }}
                  className={classes.headings}
                  onClick={() => {}}
                />
              </>
            ) : (
              <EditIcon
                style={{ margin: '0 0 0 0.5rem', fontSize: 30 }}
                className={classes.headings}
                onClick={() => {
                  setEditPersonalSettings(true);
                }}
              />
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
                <TextField autoFocus margin="dense" id="name" value={profile?.birthDate} type="text" fullWidth />
              ) : (
                profile?.birthDate
              )}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              Adress:
            </Grid>
            <Grid item xs={4}>
              {editPersonalSettings ? (
                <TextField autoFocus margin="dense" id="name" value={profile?.streetPlusNumber} type="text" fullWidth />
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
                <TextField autoFocus margin="dense" id="name" value={profile?.city} type="text" fullWidth />
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
                <CancelIcon
                  style={{ margin: '0 0 0 0.5rem', fontSize: 30 }}
                  className={classes.headings}
                  onClick={() => {
                    setEditPaymentSettings(false);
                  }}
                />
                <CheckIcon
                  style={{ margin: '0 0 0 0.5rem', fontSize: 30 }}
                  className={classes.headings}
                  onClick={() => {}}
                />
              </>
            ) : (
              <EditIcon
                style={{ margin: '0 0 0 0.5rem', fontSize: 30 }}
                className={classes.headings}
                onClick={() => {
                  setEditPaymentSettings(true);
                }}
              />
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
                <TextField autoFocus margin="dense" id="name" value={profile?.preferedPayment} type="text" fullWidth />
              ) : (
                profile?.preferedPayment
              )}
            </Grid>
          </Grid>
        </Section>
      </MyProfile>
    </Layout>
  );
};
