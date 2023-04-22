import { GetTokenPort } from "./getToken.spi";

export type GetTokenServiceProps = {
  client_id: string;
  client_secret: string;
};

export const getTokenService =
  (getTokenAdapter: GetTokenPort) => async (props?: GetTokenServiceProps) =>
    (await getTokenAdapter(props)).access_token;
