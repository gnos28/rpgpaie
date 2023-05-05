import { DateTime } from "../../@types";
import { silaeRestApi } from "./_restApi";

type RechercheDeclarationEvenementielleBody = {
  etatDeclaration: number;
  periode: DateTime;
  numeroDossier: string;
};

type RechercheDeclarationEvenementielleProps =
  RechercheDeclarationEvenementielleBody;

type DeclarationEvenementielle = {
  typeDeclaration: string;
  etatDeclaration: number;
  etatEnvoi: number;
  libelleEtat: string;
  matricule: string;
  nomSalarie: string;
  dateDebut: DateTime;
  dateFin: DateTime;
  codeAbsence: string;
  libelleAbsence: string;
};

type RechercheDeclarationEvenementielleResult = {
  listeDeclarationEvenementielle: DeclarationEvenementielle[];
};

type GetRechercheDeclarationEvenementielle = (
  props: RechercheDeclarationEvenementielleProps
) => Promise<RechercheDeclarationEvenementielleResult>;

const ENDPOINT_URL = "/v1/InfosDeclaration/RechercheDeclarationEvenementielle";

export const getRechercheDeclarationEvenementielle: GetRechercheDeclarationEvenementielle =
  async (props) => {
    const body: RechercheDeclarationEvenementielleBody = {
      etatDeclaration: props.etatDeclaration,
      periode: props.periode,
      numeroDossier: props.numeroDossier,
    };

    const rechercheDeclarationEvenementielle = await silaeRestApi<
      typeof body,
      RechercheDeclarationEvenementielleResult
    >({
      endpoint: ENDPOINT_URL,
      body,
      dossier: "",
    });

    return rechercheDeclarationEvenementielle;
  };
