import { App, Link, Route, Switch, AnonymousObject } from 'onekijs';
import React from 'react';
import ReactDOM from 'react-dom';
import { UserForm } from './components/UserForm';
import { produce } from 'immer';

const item = {
  id: 1,
  text: 'item1',
};

const item2 = {
  id: 2,
  text: 'item2',
};

const db = [item, item2];
let state: AnonymousObject<any> = {};

state = produce(state, (draftState) => {
  draftState.db = db;
  draftState.items = db.filter((i) => i.text === 'item1');
});

state = produce(state, (draftState) => {
  draftState.db[0].text = 'item1-bis';
  draftState.items[0].text = 'item1-bis';
});

console.log(state.db[0] === state.items[0], state.db[0].text, state.items[0].text);

ReactDOM.render(
  <App>
    <div style={{ backgroundColor: '#EEE', padding: '10px', marginBottom: '10px' }}>
      <Link href="/">Home</Link> | <Link href="/users">Users</Link>
    </div>
    <Switch>
      <Route path="/users">
        <div>This is the user page</div>
      </Route>
      <Route>
        <div>
          <span>This is the main page</span>
          <UserForm />
        </div>
      </Route>
    </Switch>
  </App>,
  document.getElementById('root'),
);
