import { getToken } from "../../infra/silae/getToken";

type GetTokenPort = () => ReturnType<typeof getToken>;

type GetTokenAdapter = {
  [key: string]: GetTokenPort;
};

const getTokenAdapter: GetTokenAdapter = {
  silaeRest: async () => await getToken(),
};

export { getTokenAdapter, GetTokenPort };
