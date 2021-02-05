import type { AppState } from './AppContext';
import { MaxMessageCount } from './components/chat';
import { AllActions, MainframeEvent } from './types';
import { getTeamMemberIconUrl } from './components/chat/message/utils';

export default function AppReducer(state: AppState, action: AllActions) {
  const newState = { ...state };

  switch (action.type) {
    case MainframeEvent.addChatMessage:
      action.data.teamMemberIconUrl = getTeamMemberIconUrl(action.data.isTeamMember);

      newState.chatMessages.push(action.data);

      if (newState.chatMessages.length > MaxMessageCount) {
        newState.chatMessages.shift();
      }

      return { ...newState };
    case MainframeEvent.follow:
    case MainframeEvent.raid:
    case MainframeEvent.cheer:
    case MainframeEvent.sub:
      if (!newState.alerts.some((alert) => alert.id === action.data.id)) {
        newState.alerts.push(action.data);
      }
      return { ...newState }; // << negue: this will be refactored / improved
    case 'alert_complete':
      newState.alerts.shift();
      return { ...newState };
    default:
      throw new Error(`Unrecognised action type: ${action.type}`);
  }
}
