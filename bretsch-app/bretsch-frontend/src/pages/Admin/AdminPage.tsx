import { Layout } from '../../components/Layout';
import React from 'react';
import {makeStyles} from "@material-ui/core";
import styled from "styled-components";
import { DataGrid, FilterModel } from '@material-ui/data-grid';
import {MyProfile} from "../Profile/ProfilePage";

// TODO Object destruction -> concret Table
const useStyles = makeStyles((theme) => ({
    headings: {
        color: theme.palette.primary.main,
    },
}));

export const MyAdmin = styled.div`
  margin: 5% 10%;
`;

const riceFilterModel: FilterModel = {
    items: [{ columnField: 'commodity', operatorValue: 'contains', value: 'rice' }],
};

export function BasicToolbarFilteringGrid() {
    const { data } = ""
    });

export const AdminPage = () => {
    const classes = useStyles();

    return(
    <Layout title="Admin">
        <MyAdmin>
            <div className={classes.headings}>Test</div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid {...data} filterModel={riceFilterModel} showToolbar />
            </div>
        </MyAdmin>
    </Layout>);
};
