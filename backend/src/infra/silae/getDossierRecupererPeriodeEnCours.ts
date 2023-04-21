import { DateTime } from "../../interfaces";
import { silaeRestApi } from "./_restApi";

type DossierRecupererPeriodeEnCoursProps = {
  numeroDossier: string;
};

type DossierRecupererPeriodeEnCoursResult = {
  periodeEnCours: DateTime;
};

const LISTE_DOSSIERS_URL =
  "/v1/InfosTechniquesDossiers/DossierRecupererPeriodeEnCours";

export const getDossierRecupererPeriodeEnCoursR = async (
  props: DossierRecupererPeriodeEnCoursProps
) => {
  const body = {
    numeroDossier: props.numeroDossier,
  };

  const dossiers = await silaeRestApi<DossierRecupererPeriodeEnCoursResult>({
    endpoint: LISTE_DOSSIERS_URL,
    body,
    dossier: props.numeroDossier,
  });

  return dossiers;
};
