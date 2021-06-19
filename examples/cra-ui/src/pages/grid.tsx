import { useCollection } from "onekijs-core";
import { Grid } from 'onekijs-ui';
import React from 'react';
import { users } from "../data/users";


export const GridPage = () => {
  const collection = useCollection(users);
  const columns = [{
    key: 'firstname'
  }, {
    key: 'lastname'
  }]
  return (
    <Grid items={collection} columns={columns} />
  )
}