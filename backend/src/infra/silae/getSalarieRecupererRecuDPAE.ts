import { silaeRestApi } from "./_restApi";

type SalarieRecupererRecuDPAEBody = {
  matriculeSalarie: string;
  numeroDossier: string;
};

type SalarieRecupererRecuDPAEProps = SalarieRecupererRecuDPAEBody;

type RecupererRecuDPAEResult = {
  idEmploi: number;
  recuDPAE: string; // ou Blob ??? (Fichier pdf du reçu de la DPAE encodé en base64)
};

type SalarieRecupererRecuDPAEResult = {
  recusDPAEParEmploi: RecupererRecuDPAEResult[];
};

type GetSalarieRecupererRecuDPAE = (
  props: SalarieRecupererRecuDPAEProps
) => Promise<SalarieRecupererRecuDPAEResult>;

const ENDPOINT_URL = "/v1/GenerationEnvoiDUE/SalarieRecupererRecuDPAE";

export const getSalarieRecupererRecuDPAE: GetSalarieRecupererRecuDPAE = async (
  props
) => {
  const body: SalarieRecupererRecuDPAEBody = {
    matriculeSalarie: props.matriculeSalarie,
    numeroDossier: props.numeroDossier,
  };

  const salarieRecupererRecuDPAE = await silaeRestApi<
    typeof body,
    SalarieRecupererRecuDPAEResult
  >({
    endpoint: ENDPOINT_URL,
    body,
    dossier: "",
  });

  return salarieRecupererRecuDPAE;
};
