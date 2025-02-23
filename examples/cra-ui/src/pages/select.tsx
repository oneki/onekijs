import {
  CollectionService,
  CollectionState,
  Fetcher,
  Form,
  Query,
  useFormController,
  useI18nService,
  useService,
} from 'onekijs';
import {
  FormSelect,
  SelectItem,
  SelectItemAdapter,
  TreeSelect,
  useSelectController,
  useTreeSelectController,
} from 'onekijs-ui';
import { useCallback, useMemo, useState } from 'react';
import { generateTree, User, userAdapter, users, userSearcher } from '../data/users';
import { cp } from 'fs';

const staticAdapter: SelectItemAdapter<any> = (data) => {
  return {
    id: data.id,
    text: data.text,
    disabled: data.disabled,
  };
};

export const SelectPage = () => {
  const [, service] = useService<
    CollectionState<User, SelectItem<User>>,
    CollectionService<User, SelectItem<User>, CollectionState<User, SelectItem<User>>>
  >(CollectionService, {
    dataSource: users,
    adapter: userAdapter,
    searcher: userSearcher,
  } as CollectionState<User, SelectItem<User>>);

  const u = useMemo<User[]>(() => {
    return generateTree();
  }, []);

  const fetcher: Fetcher = useCallback(
    async (url, method, body: any, options) => {
      // await new Promise((r) => setTimeout(r, delay + Math.floor(Math.random() * Math.floor(300))));
      await new Promise((r) => setTimeout(r, 0));
      const query = body as Query;
      if (service.getSearch() !== body.search) {
        query.search = body.search || '';
        query.offset = 0;
      }

      service.query(query);
      const items = service.items
        ? service.items
            .slice(query.offset || 0, (query.offset || 0) + (query.limit || service.items.length))
            .map((item) => item?.data)
        : [];

      return {
        data: items,
        total: service.items ? service.items.length : 0,
      };
    },
    [service],
  );

  const collection = useSelectController<User>('http://localhost', {
    adapter: userAdapter,
    fetcher,
  });

  const collection2 = useSelectController<User>('http://localhost', {
    adapter: userAdapter,
    fetcher,
  });

  const treeCollection = useTreeSelectController<User>(u, {
    adapter: userAdapter,
  });

  const staticCollection = useSelectController(
    [
      {
        id: 1,
        text: 'user1',
        disabled: true,
      },
      {
        id: 2,
        text: 'user2',
        disabled: false,
      },
      {
        id: 3,
        text: 'user3',
        disabled: false,
      },
      {
        id: 4,
        text: 'user4',
        disabled: true,
      },
    ],
    {
      adapter: staticAdapter,
    },
  );

  // const treeCollection2 = useTreeController<User>(u, {
  //   adapter: userAdapter,
  // })

  // console.log('2', treeCollection2.items)

  // const [value, setValue] = useState(users[1]);
  // const [value2, setValue2] = useState([users[2],users[1]]);
  const formController = useFormController({
    multi: [
      {
        id: 1,
        text: 'user1',
        disabled: true,
      },
      {
        id: 2,
        text: 'user2',
        disabled: false,
      },
    ],
  });
  const [value, setValue] = useState<User | null>(null);

  return (
    <Form controller={formController} onSubmit={() => {}}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '800px', padding: '10px' }}>
          <FormSelect
            label="Simple select"
            help="help"
            size="xsmall"
            layout="vertical"
            description="Only one entry is permitted"
            placeholder="Search by position"
            controller={collection}
            name="simple"
            required
            nullable={true}
          />
          <br />
          {/* <FormSelect label="Simple select" help="help" size="small" layout="vertical" description="Only one entry is permitted" placeholder="Search by position" controller={collection} name="simple" required /><br/>
          <FormSelect label="Simple select" help="help" size="medium" layout="vertical" description="Only one entry is permitted" placeholder="Search by position" controller={collection} name="simple" required /><br/>
          <FormSelect label="Simple select" help="help" size="large" layout="vertical" description="Only one entry is permitted" placeholder="Search by position" controller={collection} name="simple" required /><br/>
          <FormSelect label="Simple select" help="help" size="xlarge" layout="vertical" description="Only one entry is permitted" placeholder="Search by position" controller={collection} name="simple" required /><br/> */}
        </div>
        <div style={{ width: '800px', padding: '10px' }}>
          <FormSelect
            label="Multi select"
            help={
              <>
                this is the help
                <br />
                <a href="https://www.google.fr">Second Line</a>
              </>
            }
            layout="horizontal"
            size="medium"
            description="Multiple entries are permitted"
            multiple={true}
            placeholder="Search..."
            controller={staticCollection}
            name="multi"
            required
          />
          <br />
          {/* <FormSelect label="Multi select" help={<>this is the help<br/><a href="https://www.google.fr">Second Line</a></>} layout='horizontal' size="small" description="Multiple entries are permitted" multiple={true} placeholder="Search..." controller={collection2} name="multi" required /><br/>
          <FormSelect label="Multi select" help={<>this is the help<br/><a href="https://www.google.fr">Second Line</a></>} layout='horizontal' size="medium" description="Multiple entries are permitted" multiple={true} placeholder="Search..." controller={collection2} name="multi" required /><br/>
          <FormSelect label="Multi select" help={<>this is the help<br/><a href="https://www.google.fr">Second Line</a></>} layout='horizontal' size="large" description="Multiple entries are permitted" multiple={true} placeholder="Search..." controller={collection2} name="multi" required /><br/>
          <FormSelect label="Multi select" help={<>this is the help<br/><a href="https://www.google.fr">Second Line</a></>} layout='horizontal' size="xlarge" description="Multiple entries are permitted" multiple={true} placeholder="Search..." controller={collection2} name="multi" required /><br/> */}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TreeSelect
          height={500}
          controller={treeCollection}
          value={value}
          onChange={(nextValue) => setValue(nextValue as User | null)}
        />
      </div>
    </Form>
  );
};
