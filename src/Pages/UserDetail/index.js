import { useQuery, gql } from "@apollo/client";
import { Avatar, Chip, Container, Grid, IconButton, Paper, Skeleton, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Organizations from "./Organizations";
import Repositories from "./Repositories";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const UserDetail = () => {
  let { login } = useParams();
  const [value, setValue] = useState(0);
  let navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const goTo = () => {
    navigate(`/`, { replace: true });
  }
  const { loading, error, data } = useQuery(USER, { variables: { login } });
  if (loading) return (
    <Container maxWidth="md" >
      <Paper sx={{ marginTop: 7 }} >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Skeleton sx={{ margin: 3 }} variant="circular" width={200} height={200} />
          </Grid>
          <Grid item xs={8}>
            <Skeleton sx={{ marginTop: 7, }} variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
  if (error) return (
    <Container maxWidth="md" >
      <IconButton onClick={goTo} sx={{ p: '10px' }} aria-label="clear">
        <ArrowBackIcon />
      </IconButton>
      <Paper sx={{ padding: 5 }} >
        Ha ocurrido un error, intenta recargar la página nuevamente.
      </Paper>
    </Container>
  );



  const { user } = data;
  return (
    <Container maxWidth="md" >
      <IconButton onClick={goTo} sx={{ p: '10px' }} aria-label="clear">
        <ArrowBackIcon />
      </IconButton>
      <Paper sx={{ marginTop: 7 }} >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Avatar
              alt={user?.name}
              src={user?.avatarUrl}
              sx={{ width: 200, height: 200, margin: 3 }}
            />
          </Grid>
          <Grid sx={{ height: 250 }} item xs={8}>
            <Typography sx={{ marginTop: 4 }} variant="overline" component="div" color="text.secondary">
              {user?.login || "Sin contenido"}
            </Typography>
            <Typography variant="overline" component="div" color="text.secondary">
              {user?.name || "Sin contenido"}
            </Typography>
            <Typography variant="overline" component="div" color="text.secondary">
              {user?.email || "Sin contenido"}
            </Typography>
            <Typography variant="overline" component="div" color="text.secondary">
              {user?.bio || "Sin contenido"}
            </Typography>
            <Typography variant="overline" component="div" color="text.secondary">
              {user?.company || "Sin contenido"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Box sx={{ width: '100%', typography: 'body1', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} >
          <Tab label={(
            <span>
              Organizaciones
              <Chip size="small" sx={{ marginLeft: 1 }} label={user?.organizations?.edges?.length || 0} color="primary" />
            </span>
          )} />
          <Tab label={(
            <span>
              Repositorios
              <Chip size="small" sx={{ marginLeft: 1 }} label={user?.repositories?.edges?.length || 0} color="primary" />
            </span>
          )} />
        </Tabs>
      </Box>
      <Paper sx={{ padding: 4 }}>
        {value === 0 && <Organizations data={user?.organizations?.edges} />}
        {value === 1 && <Repositories data={user?.repositories?.edges} />}
      </Paper>
    </Container >
  );
}

const USER = gql`
query($login: String!){
  user(login: $login) {
    id
    bio
    name
    login
    email
    company
    avatarUrl
    organizations(first: 50) {
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
      edges {
        cursor
        node {
          id
          name
          url
          avatarUrl
          description
        }
      }
    }
    repositories(first: 50) {
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
      edges {
        cursor
        node {
          id
          name
          url
          description
        }
      }
    }
  }
}
`

export default UserDetail;