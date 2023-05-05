import { DateTime } from "../../@types";
import { silaeRestApi } from "./_restApi";

type EtatDeclarationsBody = {
  typeDeclaration: "DECLARATION" | "DADSU" | "DUE" | "DN-AC-AE" | "DSIJ";
  periode: DateTime;
  numeroDossier: string;
};

type EtatDeclarationsProps = EtatDeclarationsBody;

type EtatDeclarationRetour = {
  date: DateTime;
  nature: string;
  etat: string;
};

type EtatDeclaration = {
  numeroADS: string;
  date: DateTime;
  typeDeclaration: string;
  nomInterneEtablissement: string;
  destinataire: string;
  obsolete: boolean;
  test: boolean;
  retour: EtatDeclarationRetour[];
};

type EtatDeclarationsResult = {
  etatDeclarations: EtatDeclaration[];
};

type GetEtatDeclarations = (
  props: EtatDeclarationsProps
) => Promise<EtatDeclarationsResult>;

const ENDPOINT_URL = "/v1/EtatDeclaration/EtatDeclarations";

export const getEtatDeclarations: GetEtatDeclarations = async (props) => {
  const body: EtatDeclarationsBody = {
    typeDeclaration: props.typeDeclaration,
    periode: props.periode,
    numeroDossier: props.numeroDossier,
  };

  const etatDeclarations = await silaeRestApi<
    typeof body,
    EtatDeclarationsResult
  >({
    endpoint: ENDPOINT_URL,
    body,
    dossier: "",
  });

  return etatDeclarations;
};
