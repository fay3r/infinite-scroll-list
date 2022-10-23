import axios from 'axios';
import {AUTH_TOKEN} from '../utils/config';
import {
  AppGithubEventType,
  RawGithubEventType,
} from '../@types/GithubEventType';

export const getGithubEvents = async ({
  itemsPerPage,
  page,
}: {
  itemsPerPage: number;
  page: number;
}): Promise<AppGithubEventType[]> => {
  const url = `https://api.github.com/events?page=${page}&per_page=${itemsPerPage}`;
  const {data} = await axios.get<RawGithubEventType[]>(url, {
    headers: {
      Authorization: AUTH_TOKEN,
      Accept: 'application/vnd.github+json',
    },
  });
  const mappedEventArray: AppGithubEventType[] = [];
  if (data) {
    data.forEach(item => {
      mappedEventArray.push({
        id: item.id,
        login: item.actor.display_login,
        repoName: item.repo.name,
        avatarUrl: item.actor.avatar_url,
      });
    });
  }
  return mappedEventArray;
};
