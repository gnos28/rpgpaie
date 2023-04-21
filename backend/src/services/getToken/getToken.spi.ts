import { getToken } from "../../infra/silae/getToken";

type GetTokenPort = {
  getToken: () => ReturnType<typeof getToken>;
};

const getTokenAdapter: GetTokenPort = {
  getToken: async () => await getToken(),
};

export { getTokenAdapter, GetTokenPort };
