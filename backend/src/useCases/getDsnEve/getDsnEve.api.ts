import { DataRowWithId } from "gnos/lib/interfaces";
import { GetDsnEvePort } from "./getDsnEve.spi";

export type GetDsnEveUseCase = (
  adapter: GetDsnEvePort
) => () => Promise<DataRowWithId[]>;
