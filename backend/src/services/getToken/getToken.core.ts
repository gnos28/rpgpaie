import { GetTokenPort } from "./getToken.spi";

export type GetTokenServiceProps = {
  clientId: string;
  clientSecret: string;
};

export const getTokenService =
  (getTokenAdapter: GetTokenPort) => async (props?: GetTokenServiceProps) =>
    (await getTokenAdapter(props)).access_token;
