import { GetTokenPort } from "./getToken.spi";

export const getTokenService = (getTokenAdapter: GetTokenPort) => async () =>
  (await getTokenAdapter()).access_token;
