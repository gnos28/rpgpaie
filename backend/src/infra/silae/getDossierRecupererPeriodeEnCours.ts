import { DateTime } from "../../@types";
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

const ENDPOINT = "/v1/InfosTechniquesDossiers/DossierRecupererPeriodeEnCours";

export const getDossierRecupererPeriodeEnCours: GetDossierRecupererPeriodeEnCours =
  async (props) => {
    const body = {
      numeroDossier: props.numeroDossier,
    };

    const dossiers = await silaeRestApi<
      typeof body,
      DossierRecupererPeriodeEnCoursResult
    >({
      endpoint: ENDPOINT,
      body,
      dossier: props.numeroDossier,
    });

    return dossiers;
  };
