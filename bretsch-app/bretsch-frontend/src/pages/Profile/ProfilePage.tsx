import { Layout } from '../../components/Layout';
import React, { useEffect, useState } from 'react';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import styled from 'styled-components';
import { User } from '../../util/EntityInterfaces';
import { Divider } from '@material-ui/core';
import Box from '@material-ui/core/Box';

export const MyProfile = styled.div`
  margin: 5rem 5rem 10rem 10rem;
`;

export const ProfileName = styled.div`
  font-size: 3rem;
  margin: -5.5rem 0 0 10rem;
`;

export const ProfilePage = () => {
  const [profile, setProfile] = useState<User>();

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
        <AccountCircleTwoToneIcon style={{ fontSize: 100, color: '#5CE533' }} />
        <ProfileName>
          {profile?.firstName} {profile?.lastName}
        </ProfileName>
        <Box mt={2}>
          <Divider />
        </Box>
      </MyProfile>
    </Layout>
  );
};
