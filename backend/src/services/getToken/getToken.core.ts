import { GetTokenPort } from "./getToken.spi";

export const getToken = (getTokenAdapter: GetTokenPort) => async () =>
  (await getTokenAdapter.getToken()).access_token;
