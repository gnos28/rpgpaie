import { sheetAPI } from "gnos";
import { date } from "../../infra/date";
import { getToken } from "../../infra/silae/getToken";
import { getDossierRecupererPeriodeEnCours } from "../../infra/silae/getDossierRecupererPeriodeEnCours";
import { getRechercheDeclarationEvenementielle } from "../../infra/silae/getRechercheDeclarationEvenementielle";

type GetTabDataProps = { sheetId: string; tabName: string };

type TabDataItem = {
  [key: string]: string;
} & {
  rowIndex: number;
  a1Range: string;
};

type GetTokenResult = {
  access_token: string;
};

type DotEnv = { [key: string]: string | undefined };

type DotEnvKeys = "SHEET_ID";

// type GetDsnEveProps = {
//   client_id: string;
//   client_secret: string;
// };

// type GetDsnEveResult = {
//   access_token: string;
//   token_type: string;
//   not_before: number;
//   expires_in: number;
//   expires_on: number;
//   resource: string;
// };

// type GetDsnEvePort = (props?: GetDsnEveProps) => Promise<GetDsnEveResult>;

export type GetDsnEvePort = {
  getToken: () => Promise<GetTokenResult>;
  newDate: () => Date;
  dotenv: DotEnv | { [key in DotEnvKeys]: string | undefined };
  getTabData: (props: GetTabDataProps) => Promise<TabDataItem[]>;
  getDossierRecupererPeriodeEnCours: typeof getDossierRecupererPeriodeEnCours;
  getRechercheDeclarationEvenementielle: typeof getRechercheDeclarationEvenementielle;
};

export const getDsnEveAdapter: GetDsnEvePort = {
  getToken: async () => await getToken(),
  newDate: () => date.new(),
  dotenv: process.env,
  getTabData: sheetAPI.getTabData,
  getDossierRecupererPeriodeEnCours: getDossierRecupererPeriodeEnCours,
  getRechercheDeclarationEvenementielle: getRechercheDeclarationEvenementielle,
};
