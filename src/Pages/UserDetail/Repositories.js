import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";

const Repositories = ({ data = [] }) => {

  if (!data.length) return (
    <Typography sx={{ marginTop: 4 }} variant="overline" component="div" color="text.secondary">
      No hay datos para mostrar.
    </Typography>
  );

  return (
    <div style={{ height: 400, overflowY: 'auto' }}>
      {data?.map(repository => (
        <Card id={repository?.node?.id} key={repository?.node?.id} sx={{ marginTop: 5, }}>
          <CardHeader
            title={repository?.node?.name}
            subheader={repository?.node?.url}
          />
          <CardContent>
            {repository?.node?.description || "Sin descripción"}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Repositories;