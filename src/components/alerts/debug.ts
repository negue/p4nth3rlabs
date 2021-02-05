import { AlertNames, CheerAlert, FollowAlert, RaidAlert, SubAlert } from "./types";

export const debugCheerAlert: CheerAlert = {
  type: AlertNames.Cheer,
  id: Date.now().toString(),
  data: {
    cheererName: 'Mystery cheerer',
    logoUrl:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/69ade2a2-82e1-477c-afc6-43582bf2844c-profile_image-300x300.png',
    bitCount: 1000,
  },
};

export const debugFollowAlert: FollowAlert = {
  type: AlertNames.Follow,
  id: Date.now().toString(),
  data: {
    logoUrl:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/69ade2a2-82e1-477c-afc6-43582bf2844c-profile_image-300x300.png',
    followerUserId: '123',
    followerName: 'Test follower',
  },
};

export const debugRaidAlert: RaidAlert = {
  type: AlertNames.Raid,
  id: Date.now().toString(),
  data: {
    logoUrl:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/69ade2a2-82e1-477c-afc6-43582bf2844c-profile_image-300x300.png',
    raiderCount: 1000,
    raider: 'Mystery raider',
  },
};


export const debugSubAlert: SubAlert = {
  type: AlertNames.Sub,
  id: Date.now().toString(),
  data: {
    logoUrl:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/69ade2a2-82e1-477c-afc6-43582bf2844c-profile_image-300x300.png',
    subscriberUsername: 'Mystery subscriber',
    subTier: '3',
    message: 'Test message',
    months: 1000,
  },
};
