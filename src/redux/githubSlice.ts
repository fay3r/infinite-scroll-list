import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {AppGithubEventType} from '../@types/GithubEventType';
import {getGithubEvents} from '../services/GithubService';
import {RootState} from './store';

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
}

const initialState: GithubState = {
  githubEvents: [],
  nextPage: 1,
  status: ApiStatus.IDLE,
  isEndReached: false,
  error: null,
};

export const fetchEvents = createAsyncThunk<
  AppGithubEventType[],
  void,
  {state: RootState}
>(
  'github/getEvents',
  async (_, API) => {
    try {
      const {nextPage} = API.getState().github;
      console.log(nextPage);
      return getGithubEvents({itemsPerPage: 20, page: nextPage});
    } catch (e) {
      return API.rejectWithValue(e);
    }
  },
  {
    condition: (_, {getState}) => {
      const {status, isEndReached} = getState().github;
      if (status === ApiStatus.LOADING || isEndReached) {
        console.log('cant do it yet');
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
      if (payload.length % 20) {
        state.isEndReached = true;
      }
      state.githubEvents.push(...payload);
      state.status = ApiStatus.IDLE;
      state.nextPage += 1;
    });
    builder.addCase(fetchEvents.rejected, (state, payload) => {
      state.status = ApiStatus.IDLE;
    });
  },
});

// Action creators are generated for each case reducer function

export const selectGithub = (state: RootState) => state.github;

export default githubSlice.reducer;
