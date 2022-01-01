import { CollectionService, CollectionState, Fetcher, Query, useForm, useService } from 'onekijs';
import { FormSelect, SelectItem, useSelectDataSource } from 'onekijs-ui';
import React, { useCallback } from 'react';
import { User, userAdapter, users, userSearcher } from '../data/users';

export const SelectPage = () => {
  const [, service] = useService<CollectionState<User, SelectItem<User>>, CollectionService<User, SelectItem<User>, CollectionState<User, SelectItem<User>>>>(CollectionService, {
    dataSource: users,
    adapter: userAdapter,
    searcher: userSearcher
  } as CollectionState<User, SelectItem<User>>)

  const fetcher: Fetcher = useCallback(
    async (url, method, body, options) => {
      await new Promise((r) => setTimeout(r, 1000 + Math.floor(Math.random() * Math.floor(300))));
      const query = body as Query;
      if (service.getSearch() !== body.search) {
        query.search = body.search || '';
        query.offset = 0;
      }

      service.query(query);
      const items = service.items ? service.items.slice(query.offset || 0, (query.offset || 0) + (query.limit || service.items.length)).map(item => item?.data) : [];

      return {
        'data': items,
        'total': service.items ? service.items.length : 0,
      };
    },
    [service],
  );

  const collection = useSelectDataSource<User>('http://localhost', {
    adapter: userAdapter,
    fetcher
  });

  const collection2 = useSelectDataSource<User>('http://localhost', {
    adapter: userAdapter,
    fetcher
  });

  // const [value, setValue] = useState(users[1]);
  // const [value2, setValue2] = useState([users[2],users[1]]);
  const { Form, } = useForm(() => {});

  return (
    <Form>
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div style={{width: '800px', padding: '10px'}}>

          <FormSelect label="Simple select" size="medium" layout="vertical" description="Only one entry is permitted" placeholder="Search by position" dataSource={collection} name="simple" required /><br/>
          {/* <FormSelect label="Simple select" size="small" layout="vertical" description="Only one entry is permitted" placeholder="Search by position" items={collection} name="simple" required /><br/>
          <FormSelect label="Simple select" help="this is the help" size="medium" layout="vertical" description="Only one entry is permitted" placeholder="Search by position" items={collection} name="simple" required /><br/>
          <FormSelect label="Simple select" size="large" layout="vertical" description="Only one entry is permitted" placeholder="Search by position" items={collection} name="simple" required /><br/>
          <FormSelect label="Simple select" size="xlarge" layout="vertical" description="Only one entry is permitted" placeholder="Search by position" items={collection} name="simple" required /><br/> */}

      </div>
      <div style={{width: '800px', padding: '10px'}}>
          <FormSelect label="Multi select" help={<>this is the help<br/><a href="https://www.google.fr">Second Line</a></>} layout='horizontal' size="medium" description="Multiple entries are permitted" multiple={true} placeholder="Search..." dataSource={collection2} name="multi" required /><br/>
          {/* <FormSelect label="Multi select" layout='horizontal' size="xsmall" description="Multiple entries are permitted" multiple={true} placeholder="Search..." items={collection2} name="multi" /><br/>
          <FormSelect label="Multi select" layout='horizontal' size="small" description="Multiple entries are permitted" multiple={true} placeholder="Search..." items={collection2} name="multi" /><br/>
          <FormSelect label="Multi select" help={<>this is the help<br/><a href="https://www.google.fr">Second Line</a></>} layout='horizontal' size="medium" description="Multiple entries are permitted" multiple={true} placeholder="Search..." items={collection2} name="multi" required /><br/>
          <FormSelect label="Multi select" layout='horizontal' size="large" description="Multiple entries are permitted" multiple={true} placeholder="Search..." items={collection2} name="multi" /><br/>
          <FormSelect label="Multi select" layout='horizontal' size="xlarge" description="Multiple entries are permitted" multiple={true} placeholder="Search..." items={collection2} name="multi" /><br/> */}

      </div>
    </div>
    </Form>
  );
};
