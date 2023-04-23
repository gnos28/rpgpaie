import { DateTime } from "../../interfaces";
import { silaeRestApi } from "./_restApi";

type DossierRecupererPeriodeEnCoursProps = {
  numeroDossier: string;
};

type DossierRecupererPeriodeEnCoursResult = {
  periodeEnCours: DateTime;
};

type GetDossierRecupererPeriodeEnCours = (
  props: DossierRecupererPeriodeEnCoursProps
) => Promise<DossierRecupererPeriodeEnCoursResult>;

const LISTE_DOSSIERS_URL =
  "/v1/InfosTechniquesDossiers/DossierRecupererPeriodeEnCours";

export const getDossierRecupererPeriodeEnCours: GetDossierRecupererPeriodeEnCours =
  async (props) => {
    const body = {
      numeroDossier: props.numeroDossier,
    };

    const dossiers = await silaeRestApi<
      typeof body,
      DossierRecupererPeriodeEnCoursResult
    >({
      endpoint: LISTE_DOSSIERS_URL,
      body,
      dossier: props.numeroDossier,
    });

    return dossiers;
  };
