import React, { useState } from "react";
import styled from "styled-components";
import InputBase from "@material-ui/core/InputBase";
import { Icon, InlineIcon } from '@iconify/react';
import searchIcon from '@iconify/icons-fa-solid/search';

export const SearchContainer = styled.div`
  position: relative;
  border-radius: 2px;
  background-color: rgba(255,255,255);
  '&:hover': {
    background-olor: rgba(255,255,255);
  };
  margin-right: 0;
  margin-left: 20px;
  width: 300px;
  display: flex;
  align-items: stretch;
  justify-items: space-between;
`;

export const SearchInput = styled(InputBase)`
  width: 100%;
  flex-grow: 1;
  padding-left: 5px;
  font-size: 14px;
`

export const SearchIcon = styled(Icon)`
`
export const SearchButton = styled.div`
  background-color:#1890ff;
  display: flex;
  align-items: center;
  padding: 0 10px;
  color: white;
  cursor: pointer;
`

export const Search = React.memo(props => {
  const [value, setValue] = useState('');

  return (
    <SearchContainer>
      <SearchInput
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <SearchButton>
        <SearchIcon icon={searchIcon} />
      </SearchButton>
    </SearchContainer>
  );
});
