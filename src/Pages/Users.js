import { useQuery, gql } from "@apollo/client";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Chip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardLoading from "../Components/CardLoading";
import AddIcon from '@mui/icons-material/Add';
import { getData, setData } from "../Utils";
import { useNavigate } from "react-router";
const Users = ({ query }) => {
  let navigate = useNavigate();
  const [first] = useState(getData("countUser") || 3);
  const { loading, error, data, fetchMore } = useQuery(USERS, {
    variables: { query, first },
    fetchPolicy: "network-only"
  });

  useEffect(() => {
    const idUser = getData("idUser");
    if (document.getElementById(idUser)) {
      document.getElementById(idUser).scrollIntoView();
    }
  })


  if (loading) return <CardLoading />;
  if (error) return (
    <Typography sx={{ marginTop: 5 }} variant="body1" color="text.secondary">
      Lo sentimos ha ocurrido un error, intenten recargar página nuevamente.
    </Typography>
  );


  const onLoadMore = async () => {
    if (data?.search?.pageInfo?.hasNextPage) {
      const res = await fetchMore({
        variables: {
          after: data?.search?.pageInfo?.endCursor,
        },
      });
      setData("countUser", first + (res?.data?.search?.edges?.length || 0));
    }
  }

  const goTo = user => () => {
    setData("idUser", user?.id);
    navigate(`/user/${user?.login}`);
  }


  return (
    <div>
      {data?.search?.edges.map(value => (
        <Card id={value?.node?.id} key={value?.node?.id} sx={{ marginTop: 5, }}>
          <CardHeader
            avatar={
              <Avatar
                alt="Remy Sharp"
                src={value?.node?.avatarUrl}
                sx={{ width: 56, height: 56 }}
              />
            }
            title={value?.node?.name}
            subheader={value?.node?.email}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {value?.node?.bio || "Sin contenido"}
            </Typography>
          </CardContent>
          <CardActions>
            <div>
              <Chip sx={{ marginRight: 1 }} color="primary" label={`Repositorios: ${value?.node?.repositories?.totalCount}`} />
              <Chip color="info" label={`Organizaciones: ${value?.node?.organizations?.totalCount}`} />
            </div>
            <Button onClick={goTo(value?.node)} size="small" sx={{ marginLeft: 'auto' }} variant="contained" >
              Ver detalle
            </Button>
          </CardActions>
        </Card>
      ))}
      {data?.search?.pageInfo?.hasNextPage && (
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <Button onClick={onLoadMore} variant="contained" startIcon={<AddIcon />}>
            Ver más
          </Button>
        </div>
      )}
    </div>
  );
}

export default Users;

const USERS = gql`
query ($query: String! $after: String $first: Int!) {
  search(type: USER, query: $query, first: $first after: $after) {
    userCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
    }
    edges {
      cursor
      node {
        __typename
        ... on User {
          id
          email
          name
          bio
          login
          repositories {
            totalCount
          }
          organizations {
            totalCount
          }
          avatarUrl
          company
        }
      }
    }
  }
}
`;