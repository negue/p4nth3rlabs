import { ChatMessageEvent } from './components/chat/types';
import { AlertQueueEvent, AllAlerts } from './components/alerts/types';
export interface SocketOptions {
  reconnect: boolean;
}

// eslint-disable-next-line no-shadow
export enum MainframeEvent {
  sub = 'sub',
  raid = 'raid',
  cheer = 'cheer',
  specialuserjoin = 'specialuserjoin',
  teammemberjoin = 'teammember',
  chatmessage = 'chatmessage',
  follow = 'follow',
  alert_complete = 'alert_complete',

  addChatMessage = 'addChatMessage'
}

// TODO split / cleanup WebSocket and App Events / Payload Types

export interface ChatWebsocketEvent {
  broadcaster: string;
  event: MainframeEvent;
  id: string;
  data: ChatMessageEvent;
}

// Usually each Action would be typed with its own type
// but here each type has the same data type so we'll just use a union type here
// ALL except addChatMessage for now
export type AlertEventTypes = Exclude<MainframeEvent, MainframeEvent.addChatMessage>;


export interface AlertWebsocketEvent {
  broadcaster: string;
  event: MainframeEvent;
  id: string;
  data: AlertQueueEvent;
}

export interface AppAction {
  type: MainframeEvent;
}

export interface ChatMessageAction extends AppAction {
  type: MainframeEvent.addChatMessage;
  data: ChatMessageEvent;
}

export interface AlertAction extends AppAction {
  type: AlertEventTypes;
  data: AllAlerts
}

export type AllActions = ChatMessageAction | AlertAction;

// eslint-disable-next-line no-unused-vars
export type Callback = (data: any) => void;

export type TrustedEventMap = {
  raw: Set<Callback>;
  open: Set<Callback>;
  close: Set<Callback>;
  error: Set<Callback>;
  sub: Set<Callback>;
  giftsub: Set<Callback>;
  join: Set<Callback>;
  message: Set<Callback>;
  raid: Set<Callback>;
  cheer: Set<Callback>;
  specialuserjoin: Set<Callback>;
  teammemberjoin: Set<Callback>;
  chatmessage: Set<Callback>;
  follow: Set<Callback>;
};

export type TrustedEvent = keyof TrustedEventMap;
