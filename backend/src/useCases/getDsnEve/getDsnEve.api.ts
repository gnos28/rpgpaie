import { GetDsnEvePort } from "./getDsnEve.spi";

export type GetDsnEveUseCase = (adapter: GetDsnEvePort) => () => Promise<void>;
