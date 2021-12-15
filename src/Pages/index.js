import React, { useState } from "react";
import Users from "./Users";
import {
  Container,
  IconButton,
  InputBase,
  Paper,
  Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import IMG_GITHUB from "../assets/github.png";
import { Route, Routes } from "react-router";
import { getData, setData } from "../Utils";
import UserDetail from "./UserDetail";

const SearchComponent = () => {
  const [query, setQuery] = useState(getData("queryName") || "");
  const [queryInput, setQueryInput] = useState(getData("queryName") || "");

  const handleSearch = () => {
    setQuery(queryInput.trim());
    setData("queryName", queryInput.trim());
  }

  const handleClearSearch = () => {
    setQuery("");
    setQueryInput("");
    setData("queryName", "");
    setData("countUser", 3);
    setData("idUser", null);
  }

  return (
    <Container maxWidth="sm" >
      <Typography variant="h5" sx={{ marginTop: 6 }} color="text.secondary">
        Búsqueda de perfil en github
      </Typography>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', marginTop: 4 }}>
        {queryInput?.trim() && (
          <IconButton onClick={handleClearSearch} sx={{ p: '10px' }} aria-label="clear">
            <ClearIcon />
          </IconButton>)}
        <InputBase
          value={queryInput}
          onChange={e => setQueryInput(e?.target.value)}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Ejemplo: José Elías Barraza"
          inputProps={{ 'aria-label': 'Ejemplo: José Elías Barraza' }}
        />
        <IconButton onClick={handleSearch} sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      {query?.trim() && (<Users query={query} />)}
      {!query?.trim() && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <img width="300" height="300" src={IMG_GITHUB} alt="Github" />
        </div>
      )}
    </Container>
  );
}

const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<SearchComponent />} />
      <Route path="/user/:login" element={<UserDetail />} />
    </Routes>
  );
}

export default RouterComponent;