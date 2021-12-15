import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";

const Organizations = ({ data = [] }) => {

  if (!data.length) return (
    <Typography sx={{ marginTop: 4 }} variant="overline" component="div" color="text.secondary">
      No hay datos para mostrar.
    </Typography>
  );

  return (
    <div style={{ height: 400, overflowY: 'auto' }}>
      {data?.map(organization => (
        <Card id={organization?.node?.id} key={organization?.node?.id} sx={{ marginTop: 5, }}>
          <CardHeader
            avatar={
              <Avatar
                alt={organization?.node?.name}
                src={organization?.node?.avatarUrl}
                sx={{ width: 70, height: 70, margin: 3 }}
              />
            }
            title={organization?.node?.name}
            subheader={organization?.node?.url}
          />
          <CardContent>
            {organization?.node?.description || "Sin descripción"}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Organizations;