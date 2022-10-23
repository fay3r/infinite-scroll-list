export type AppGithubEventType = {
  id: string;
  avatarUrl: string;
  login: string;
  repoName: string;
};

export type RawGithubEventType = {
  id: string;
  actor: {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
};
