import { Layout } from '../../components/Layout';
import React, { useContext } from 'react';
import { Booking, VehicleType } from '../../util/EntityInterfaces';
import { authContext } from '../../contexts/AuthenticationContext';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { PricesItem } from './components/PricesComponents';

export const PricesDiv = styled.div`
  margin: 5rem 5rem 10rem 10rem;
`;

export const Heading = styled.div`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 2rem;
`;
export const PricePage = () => {
  const history = useHistory();
  const [vehicleType, setVehicleType] = React.useState<VehicleType[]>([]);
  const {
    actions: { getTokenData },
  } = useContext(authContext);

  const fetchVehicleType = async () => {
    const vehicleTypeRequest = await fetch(`api/vehicletype/`, {
      headers: { 'content-type': 'application/json' },
      method: 'GET',
    });
    if (vehicleTypeRequest.status === 200) {
      const taskJSON = await vehicleTypeRequest.json();
      setVehicleType(taskJSON.data);
    }
  };

  React.useEffect(() => {
    fetchVehicleType();
  }, []);

  if (vehicleType.length) {
    return (
      <Layout title="Prices">
        {vehicleType.map((vehicleType: VehicleType) => (
          <PricesItem key={vehicleType.vehicleTypeId} vehicleType={vehicleType} />
        ))}
      </Layout>
    );
  } else {
    return (
      <Layout title="My Bookings">
        <PricesDiv>
          <Heading>
            <p>No previous bookings!</p>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                history.push('/');
              }}
            >
              Start bretsching now!
            </Button>
          </Heading>
        </PricesDiv>
      </Layout>
    );
  }
};
