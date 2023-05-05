import { GetDsnEveUseCase } from "./getDsnEve.api";
import { GetDsnEvePort } from "./getDsnEve.spi";
import { DataRowWithId } from "gnos/lib/interfaces";

const ID_DOSSIER = "id_dossier";

const TYPE_DECLARATION = ["DUE", "DN-AC-AE", "DSIJ"];
const ETAT_DECLARATION_OK = 0;

export const getDsnEveUseCase: GetDsnEveUseCase =
  (adapter: GetDsnEvePort) => async () => {
    const sheetId = adapter.dotenv.SHEET_ID;
    if (!sheetId) throw new Error("process.env.SHEET_ID undefined");

    const tabData = await adapter.getTabData({
      sheetId,
      tabName: "dossier",
    });

    const id_dossiers = tabData.map((row) => row[ID_DOSSIER]) as string[];

    const dossiersWithPeriode = await Promise.all(
      id_dossiers.map(async (numeroDossier) => ({
        numeroDossier,
        periodeEnCours: (
          await adapter.getDossierRecupererPeriodeEnCours({
            numeroDossier,
          })
        ).periodeEnCours,
      }))
    );

    const etatDeclaration = 6;

    const dossiersWithEve = await Promise.all(
      dossiersWithPeriode.map(async (dossier) => {
        const periode = dossier.periodeEnCours;
        const numeroDossier = dossier.numeroDossier;

        const rechercheDeclarationEvenementielle =
          await adapter.getRechercheDeclarationEvenementielle({
            etatDeclaration,
            periode,
            numeroDossier,
          });

        return {
          ...dossier,
          ...rechercheDeclarationEvenementielle,
        };
      })
    );

    const today = adapter.newDate();
    const periode =
      today.getFullYear() + (today.getMonth() + 1).toString().padStart(2, "0");

    const data: DataRowWithId[] = id_dossiers
      .map((id_dossier) => {
        const filteredDossiersWithEve = dossiersWithEve
          .filter(
            (dossierWithEve) => dossierWithEve.numeroDossier === id_dossier
          )[0]
          .listeDeclarationEvenementielle.filter((eve) =>
            TYPE_DECLARATION.includes(eve.typeDeclaration)
          );

        return TYPE_DECLARATION.map((type) => {
          const { dsn_eve, erreur_dsn_eve } = filteredDossiersWithEve
            .filter((eve) => eve.typeDeclaration === type)
            .reduce(
              (acc, val) => {
                if (val.etatDeclaration === ETAT_DECLARATION_OK)
                  return { ...acc, dsn_eve: acc.dsn_eve + 1 };
                return { ...acc, erreur_dsn_eve: acc.erreur_dsn_eve + 1 };
              },
              { dsn_eve: 0, erreur_dsn_eve: 0 }
            );

          const id = id_dossier + "_" + periode + "_" + type;

          return { id, id_dossier, periode, dsn_eve, erreur_dsn_eve };
        });
      })
      .flat();

    await adapter.appendToSheet({
      sheetId,
      tabName: "tableau de bord",
      data,
    });

    return data;
  };
