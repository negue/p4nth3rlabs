import React from 'react';
import {
  ChatMessage,
  DisplayName,
  MessageText,
  AvatarContainer,
  MessageContainer,
} from './index.style';

import { processChat } from './utils';
import type { ChatMessageEvent } from '../types';

interface MessageProps {
  message: ChatMessageEvent;
}

export default function Message(props: MessageProps) {
  const { message } = props;
  const {
    displayName,
    logoUrl,
    isMod,
    isVip,
    isSubscriber,
    isBroadcaster,
    isTeamMember,
    isMyFavoriteStreamer,
    teamMemberIconUrl,
  } = message;

  const processedChat = processChat(message);
  const startsWithTag = processedChat.message.startsWith('<span class="tag">');
  const isAction: boolean = processedChat.type === 'action';

  const isDefault = !isVip && !isBroadcaster && !isSubscriber;

  return (
    <ChatMessage
      isSubscriber={isSubscriber}
      isBroadcaster={isBroadcaster}
      isVip={isVip}
      isMod={isMod}
      isTeamMember={isTeamMember}
      isMyFavoriteStreamer={isMyFavoriteStreamer}
      teamMemberIconUrl={teamMemberIconUrl}
    >
      <AvatarContainer backgroundImage={logoUrl} />
      <MessageContainer>
        <DisplayName
          className={!isDefault ? `background-clip-text-hack` : ``}
          isSubscriber={isSubscriber}
          isBroadcaster={isBroadcaster}
          isVip={isVip}
          isMod={isMod}
          isTeamMember={isTeamMember}
          isMyFavoriteStreamer={isMyFavoriteStreamer}
          teamMemberIconUrl={teamMemberIconUrl}
        >
          @{displayName}
        </DisplayName>
        <MessageText
          isAction={isAction}
          startsWithTag={startsWithTag}
          dangerouslySetInnerHTML={{ __html: processedChat.message }}
        ></MessageText>
      </MessageContainer>
    </ChatMessage>
  );
}
