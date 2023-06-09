import { DataRowWithId } from "gnos/lib/interfaces";
import { DateTime } from "../../@types";
import { DeclarationEvenementielle } from "../../infra/silae/getRechercheDeclarationEvenementielle";
import { getDsnEveUseCase } from "./getDsnEve.core";
import { DotEnv, GetDsnEvePort } from "./getDsnEve.spi";

const event = (type: "DUE" | "DN-AC-AE" | "DSIJ", etat: "OK" | "ERROR") =>
  ({
    typeDeclaration: type,
    etatDeclaration: etat === "OK" ? 0 : 1,
    etatEnvoi: 1,
    libelleEtat: "string",
    matricule: "string",
    nomSalarie: "string",
    dateDebut: "2023-05-05T10:00:00",
    dateFin: "2023-05-05T10:00:00",
    codeAbsence: "string",
    libelleAbsence: "string",
  } as DeclarationEvenementielle);

describe("Feature : getDsnEve useCase", () => {
  let fixture: Fixture;

  beforeEach(() => {
    fixture = createFixture();
  });

  describe("Rule : for a given period & given dossier_ids return for all combinations of type_declarations sum of events OK and in error in a row format ready to be appended to a google sheet", () => {
    test("for a single dossier_id with 1 event", async () => {
      fixture.givenNowIs("2023-05-05");
      fixture.givenTokenIs("access_token");
      fixture.givenDotenvIs({
        SHEET_ID: "SHEET_ID",
      });
      fixture.givenDossierIdsAre(["1234"]);
      fixture.givenDossierPeriodeEnCoursIs("2023-05-05T10:00:00");
      fixture.givenEvenementielFor("1234").is([event("DUE", "OK")]);
      await fixture.thenThisShouldBeAppended([
        {
          id: "1234_202305_DUE",
          id_dossier: "1234",
          periode: "202305",
          dsn_eve: 1,
          erreur_dsn_eve: 0,
        },
        {
          id: "1234_202305_DN-AC-AE",
          id_dossier: "1234",
          periode: "202305",
          dsn_eve: 0,
          erreur_dsn_eve: 0,
        },
        {
          id: "1234_202305_DSIJ",
          id_dossier: "1234",
          periode: "202305",
          dsn_eve: 0,
          erreur_dsn_eve: 0,
        },
      ]);
    });
    test("for a single dossier_id with 2 events", async () => {
      fixture.givenNowIs("2023-05-05");
      fixture.givenTokenIs("access_token");
      fixture.givenDotenvIs({
        SHEET_ID: "SHEET_ID",
      });
      fixture.givenDossierIdsAre(["1234"]);
      fixture.givenDossierPeriodeEnCoursIs("2023-05-05T10:00:00");
      fixture
        .givenEvenementielFor("1234")
        .is([event("DUE", "OK"), event("DUE", "ERROR")]);
      await fixture.thenThisShouldBeAppended([
        {
          id: "1234_202305_DUE",
          id_dossier: "1234",
          periode: "202305",
          dsn_eve: 1,
          erreur_dsn_eve: 1,
        },
        {
          id: "1234_202305_DN-AC-AE",
          id_dossier: "1234",
          periode: "202305",
          dsn_eve: 0,
          erreur_dsn_eve: 0,
        },
        {
          id: "1234_202305_DSIJ",
          id_dossier: "1234",
          periode: "202305",
          dsn_eve: 0,
          erreur_dsn_eve: 0,
        },
      ]);
    });
    test("for a multiples dossier_id with many events", async () => {
      fixture.givenNowIs("2023-05-05");
      fixture.givenTokenIs("access_token");
      fixture.givenDotenvIs({
        SHEET_ID: "SHEET_ID",
      });
      fixture.givenDossierIdsAre(["1234", "5678"]);
      fixture.givenDossierPeriodeEnCoursIs("2023-05-05T10:00:00");
      fixture
        .givenEvenementielFor("1234")
        .is([event("DUE", "OK"), event("DUE", "ERROR")]);
      fixture
        .givenEvenementielFor("5678")
        .is([event("DSIJ", "ERROR"), event("DUE", "ERROR")]);
      await fixture.thenThisShouldBeAppended([
        {
          id: "1234_202305_DUE",
          id_dossier: "1234",
          periode: "202305",
          dsn_eve: 1,
          erreur_dsn_eve: 1,
        },
        {
          id: "1234_202305_DN-AC-AE",
          id_dossier: "1234",
          periode: "202305",
          dsn_eve: 0,
          erreur_dsn_eve: 0,
        },
        {
          id: "1234_202305_DSIJ",
          id_dossier: "1234",
          periode: "202305",
          dsn_eve: 0,
          erreur_dsn_eve: 0,
        },
        {
          id: "5678_202305_DUE",
          id_dossier: "5678",
          periode: "202305",
          dsn_eve: 0,
          erreur_dsn_eve: 1,
        },
        {
          id: "5678_202305_DN-AC-AE",
          id_dossier: "5678",
          periode: "202305",
          dsn_eve: 0,
          erreur_dsn_eve: 0,
        },
        {
          id: "5678_202305_DSIJ",
          id_dossier: "5678",
          periode: "202305",
          dsn_eve: 0,
          erreur_dsn_eve: 1,
        },
      ]);
    });
  });
});

type DossierEvents = {
  id_dossier: string;
  events: DeclarationEvenementielle[];
};

const createFixture = () => {
  let now: Date;
  let token = "";
  let dotenvObj: DotEnv = {};
  let dossier_ids: string[] = [];
  let periodeEnCours: DateTime | undefined = undefined;
  let dossierEvents: DossierEvents[] = [];

  const newDate: GetDsnEvePort["newDate"] = () => now;
  const getToken: GetDsnEvePort["getToken"] = () =>
    Promise.resolve({
      access_token: token,
    });
  const dotenv: () => GetDsnEvePort["dotenv"] = () => dotenvObj;
  const getTabData: GetDsnEvePort["getTabData"] = (_props) =>
    Promise.resolve(
      dossier_ids.map((id_dossier, rowIndex) => ({
        id_dossier,
        rowIndex,
        a1Range: "coucou",
      }))
    );

  const getDossierRecupererPeriodeEnCours: GetDsnEvePort["getDossierRecupererPeriodeEnCours"] =
    (_props) =>
      Promise.resolve({
        periodeEnCours: periodeEnCours as DateTime,
      });

  const getRechercheDeclarationEvenementielle: GetDsnEvePort["getRechercheDeclarationEvenementielle"] =
    ({ numeroDossier }) =>
      Promise.resolve({
        listeDeclarationEvenementielle: dossierEvents.filter(
          (dossier) => dossier.id_dossier === numeroDossier
        )[0].events,
      });

  const appendToSheet: GetDsnEvePort["appendToSheet"] = (_props) =>
    Promise.resolve();

  return {
    givenNowIs: (date: string) => {
      now = new Date(date);
    },
    givenTokenIs: (newToken: string) => {
      token = newToken;
    },
    givenDotenvIs: (newDotenv: DotEnv) => {
      dotenvObj = newDotenv;
    },
    givenDossierIdsAre: (newDossier_ids: string[]) => {
      dossier_ids = newDossier_ids;
    },
    givenDossierPeriodeEnCoursIs: (newPeriodeEnCours: DateTime) => {
      periodeEnCours = newPeriodeEnCours;
    },
    givenEvenementielFor: (id_dossier: string) => ({
      is: (events: DeclarationEvenementielle[]) => {
        dossierEvents = [
          ...dossierEvents,
          {
            id_dossier,
            events,
          },
        ];
      },
    }),
    thenThisShouldBeAppended: async (expectedData: DataRowWithId[]) => {
      const mockedAdapter: GetDsnEvePort = {
        getToken,
        newDate,
        dotenv: dotenv(),
        getTabData,
        appendToSheet,
        getDossierRecupererPeriodeEnCours,
        getRechercheDeclarationEvenementielle,
      };
      const resultData = await getDsnEveUseCase(mockedAdapter)();

      expect(resultData).toEqual(expectedData);
    },
  };
};

type Fixture = ReturnType<typeof createFixture>;
