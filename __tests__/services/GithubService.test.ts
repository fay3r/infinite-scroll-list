import GithubService from '../../src/services/GithubService';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

describe('Github Service', function () {
  const mock = new MockAdapter(axios);

  beforeAll(() => {
    mock
      .onGet(
        new RegExp(/https:\/\/api.github.com\/events\?page=\d+&per_page=\d+/g),
      )
      .reply(config => {
        const queryParams = config.url
          ?.split('?')[1]
          .split('&')
          .map(item => item.split('=')[1]);

        if (queryParams) {
          if (+queryParams[0] > 5) {
            return [];
          }
          return new Array(queryParams[1]).map((_, index) => index + 1);
        }
        return [];
      });
  });

  it('should return array with 20 items per page', () => {
    GithubService.getGithubEvents({itemsPerPage: 20, page: 2}).then(items => {
      expect(items.length).toEqual(20);
    });
  });

  it('should return array with 5 items per page', () => {
    GithubService.getGithubEvents({itemsPerPage: 5, page: 8}).then(items => {
      expect(items.length).toEqual(5);
    });
  });

  it('should return array with 0 items - page greater than 5', () => {
    GithubService.getGithubEvents({itemsPerPage: 0, page: 8}).then(items => {
      expect(items.length).toEqual(0);
    });
  });
});
