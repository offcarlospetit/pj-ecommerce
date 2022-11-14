import React from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './store';
import NavigationApp from './App';
import {PersistGate} from 'redux-persist/integration/react';

type Props = {};

const RootApp = (props: Props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationApp />
      </PersistGate>
    </Provider>
  );
};

export default RootApp;
