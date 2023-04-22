import { GetTokenUseCase } from "./getToken.api";

export const getTokenUseCase: GetTokenUseCase =
  (getTokenAdapter) => async (props) =>
    (await getTokenAdapter(props)).access_token;
