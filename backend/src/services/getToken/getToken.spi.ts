import { getToken, GetTokenProps } from "../../infra/silae/getToken";

type GetTokenPort = (props?: GetTokenProps) => ReturnType<typeof getToken>;

type GetTokenAdapter = {
  [key: string]: GetTokenPort;
};

const getTokenAdapter: GetTokenAdapter = {
  silaeRest: async (props?: GetTokenProps) => await getToken(props),
};

export { getTokenAdapter, GetTokenPort };
