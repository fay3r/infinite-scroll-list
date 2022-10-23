import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {AppGithubEventType} from '../@types/GithubEventType';
import {getGithubEvents} from '../services/GithubService';
import {RootState} from './store';
import {ToastAndroid} from 'react-native';
import {ITEMS_PER_PAGE} from '../utils/config';

export enum ApiStatus {
  LOADING,
  IDLE,
}

export interface GithubState {
  githubEvents: AppGithubEventType[];
  nextPage: number;
  status: ApiStatus;
  isEndReached: boolean;
  error: string | null;
  initialLoading: boolean;
}

const initialState: GithubState = {
  githubEvents: [],
  nextPage: 1,
  status: ApiStatus.IDLE,
  isEndReached: false,
  error: null,
  initialLoading: true,
};

export const fetchEvents = createAsyncThunk<
  AppGithubEventType[],
  void,
  {state: RootState}
>(
  'github/getEvents',
  (_, API) => {
    const {nextPage} = API.getState().github;
    return getGithubEvents({itemsPerPage: ITEMS_PER_PAGE, page: nextPage});
  },
  {
    condition: (_, {getState}) => {
      const {status, isEndReached} = getState().github;
      if (status === ApiStatus.LOADING || isEndReached) {
        return false;
      }
    },
  },
);

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchEvents.pending, state => {
      state.status = ApiStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchEvents.fulfilled, (state, {payload}) => {
      state.initialLoading = false;
      if (payload.length > 0) {
        state.githubEvents.push(...payload);
        state.nextPage += 1;
      } else if (payload.length === 0) {
        state.isEndReached = true;
      }
      state.status = ApiStatus.IDLE;
    });
    builder.addCase(fetchEvents.rejected, state => {
      state.initialLoading = false;
      state.status = ApiStatus.IDLE;
      ToastAndroid.showWithGravity(
        'Error while reading new items',
        2000,
        ToastAndroid.TOP,
      );
      state.error = 'Error while reading new items';
    });
  },
});

// Action creators are generated for each case reducer function

export const selectGithub = (state: RootState) => state.github;

export default githubSlice.reducer;
