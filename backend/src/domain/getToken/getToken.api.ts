import { GetTokenPort } from "./getToken.spi";

type GetTokenUseCaseProps = {
  client_id: string;
  client_secret: string;
};

export type GetTokenUseCase = (
  getTokenAdapter: GetTokenPort
) => (props?: GetTokenUseCaseProps) => Promise<string>;
