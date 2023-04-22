import { getToken } from "../../infra/silae/getToken";

type GetTokenProps = {
  client_id: string;
  client_secret: string;
};

type GetTokenResult = {
  access_token: string;
  token_type: string;
  not_before: number;
  expires_in: number;
  expires_on: number;
  resource: string;
};

type GetTokenPort = (props?: GetTokenProps) => Promise<GetTokenResult>;

type GetTokenAdapter = {
  [key: string]: GetTokenPort;
};

const getTokenAdapter: GetTokenAdapter = {
  silaeRest: async (props) => await getToken(props),
};

export { getTokenAdapter, GetTokenPort };
