import { Layout } from '../../components/Layout';
import React, { useEffect, useState } from 'react';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import styled from 'styled-components';
import { User } from '../../util/EntityInterfaces';
import { Divider, Grid, makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';

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
          {profile?.firstName} {profile?.lastName}
          <EditIcon style={{ margin: '0 0 0 0.5rem', fontSize: 30 }} className={classes.headings} />
        </ProfileName>
        <Box mt={2}>
          <Divider />
        </Box>

        <SectionTitle className={classes.headings}>
          Main Settings
          <Box mt={1}>
            <Divider />
          </Box>
        </SectionTitle>
        <Section>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <EditIcon style={{ margin: '0 0.5rem 0 0', fontSize: 20 }} className={classes.headings} />
              Email:
            </Grid>
            <Grid item xs={4}>
              {profile?.email}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <EditIcon style={{ margin: '0 0.5rem 0 0', fontSize: 20 }} className={classes.headings} />
              Password:
            </Grid>
            <Grid item xs={4}>
              {profile?.hashedPassword}
            </Grid>
          </Grid>

          <SectionTitle className={classes.headings}>
            Personal Settings
            <Box mt={1}>
              <Divider />
            </Box>
          </SectionTitle>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <EditIcon style={{ margin: '0 0.5rem 0 0', fontSize: 20 }} className={classes.headings} />
              Birth Date:
            </Grid>
            <Grid item xs={4}>
              {profile?.birthDate}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <EditIcon style={{ margin: '0 0.5rem 0 0', fontSize: 20 }} className={classes.headings} />
              Adress:
            </Grid>
            <Grid item xs={4}>
              {profile?.streetPlusNumber}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <EditIcon style={{ margin: '0 0.5rem 0 0', fontSize: 20 }} className={classes.headings} />
              City:
            </Grid>
            <Grid item xs={4}>
              {profile?.city}
            </Grid>
          </Grid>

          <SectionTitle className={classes.headings}>
            Payment Settings
            <Box mt={1}>
              <Divider />
            </Box>
          </SectionTitle>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <EditIcon style={{ margin: '0 0.5rem 0 0', fontSize: 20 }} className={classes.headings} />
              Payment:
            </Grid>
            <Grid item xs={4}>
              {profile?.preferedPayment}
            </Grid>
          </Grid>
        </Section>
      </MyProfile>
    </Layout>
  );
};
