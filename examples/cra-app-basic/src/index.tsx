import { App, Link, Route, Switch } from 'onekijs';
import React from 'react';
import ReactDOM from 'react-dom';
import { UserForm } from './components/UserForm';
import { produce } from 'immer';

const item = {
  id: 5,
  text: 'toto',
};

const db = [item];

const db2 = produce(db, (draftDb) => {
  const stateItem = draftDb.find((i) => i.id === 5);
  if (stateItem) {
    stateItem.text = 'toto2';
  }
});

console.log('db === db2', db === db2, db2[0].text, db[0].text, item.text);

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
