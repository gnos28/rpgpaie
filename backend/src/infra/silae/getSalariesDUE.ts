import { DateTime } from "../../@types";
import { silaeRestApi } from "./_restApi";

type RequeteSalariesDUE = {
  matriculesSalaries: string[];
  dateMinEmploi: DateTime;
};

type SalariesDUEBody = {
  requeteSalariesDUE: RequeteSalariesDUE;
  numeroDossier: string;
};

type SalariesDUEProps = SalariesDUEBody;

type SalariesDUEResult = {
  nbDUEEnvoyees: number;
};

type GetSalariesDUE = (props: SalariesDUEProps) => Promise<SalariesDUEResult>;

const ENDPOINT_URL = "/v1/GenerationEnvoiDUE/SalariesDUE";

export const getSalariesDUE: GetSalariesDUE = async (props) => {
  const body: SalariesDUEBody = {
    requeteSalariesDUE: props.requeteSalariesDUE,
    numeroDossier: props.numeroDossier,
  };

  const salariesDUE = await silaeRestApi<typeof body, SalariesDUEResult>({
    endpoint: ENDPOINT_URL,
    body,
    dossier: "",
  });

  return salariesDUE;
};
