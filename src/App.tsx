import React, { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Socket from './socket';
import AppContext, { AppState } from './AppContext';
import AppReducer from './AppReducer';
import MessageQueue from './components/chat';
import Alerts from './components/alerts';
import Overlay from './components/overlay';
import Webcam from './components/webcam';
import { GlobalStyle } from './styles';
import { MainframeEvent, ChatWebsocketEvent, AlertWebsocketEvent } from './types';
import { AlertNames } from './components/alerts/types';

interface AppProps {
  uri: string | undefined;
}

const initialState: AppState = {
  chatMessages: [],
  alerts: [],
};

function App(props: AppProps) {
  const { uri } = props;

  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    let socket: any;
    if (uri && uri.length > 0) {
      socket = new Socket(uri, {
        reconnect: true,
      });

      socket.on(MainframeEvent.chatmessage, (event: ChatWebsocketEvent) => {
        dispatch({
          type: MainframeEvent.addChatMessage,
          data: event.data,
        });
      });

      socket.on(MainframeEvent.raid, (event: AlertWebsocketEvent) => {
        dispatch({
          type: MainframeEvent.raid,
          data: {
            type: AlertNames.Raid,
            id: event.id,
            data: event.data as any, 
            // ^ those are currently the only places we need to trust the server
            // TODO maybe add type guards on future refactorings
          }
        });
      });

      socket.on(MainframeEvent.sub, (event: AlertWebsocketEvent) => {
        dispatch({
          type: MainframeEvent.sub,
          data: {
            type: AlertNames.Sub,
            id: event.id,
            data: event.data as any,
          },
        });
      });

      socket.on(MainframeEvent.cheer, (event: AlertWebsocketEvent) => {
        dispatch({
          type: MainframeEvent.cheer,
          data: {
            type: AlertNames.Cheer,
            id: event.id,
            data: event.data as any,
          }
        });
      });

      socket.on(MainframeEvent.follow, (event: AlertWebsocketEvent) => {
        dispatch({
          type: MainframeEvent.follow,
          data: {  
            type: AlertNames.Follow,  // now that actions are typed, this has also the right type ;)
            id: event.id,
            data: event.data as any,
          },
        });
      });
    }
    return () => {
      // cleanup
      if (socket) {
        socket.disconnect();
      }
    };
  }, [uri]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <GlobalStyle />

      <Router>
        <Switch>
          <Route path="/chat">
            <MessageQueue />
          </Route>
          <Route path="/alerts">
            <Alerts dispatch={dispatch} />
          </Route>
          <Route path="/overlay">
            <Overlay />
          </Route>
          <Route path="/webcam">
            <Webcam />
          </Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
