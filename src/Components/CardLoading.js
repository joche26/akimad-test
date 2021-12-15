import { Card, CardContent, Skeleton, Stack } from "@mui/material";
import React from "react";

const CardLoading = ({ total = 3 }) => {
  return [...Array(total)].map((v, k) => (
    <Card key={k} sx={{ marginTop: 5, }}>
      <CardContent>
        <Stack spacing={1}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Stack>
      </CardContent>
    </Card>
  ));
}

export default CardLoading;