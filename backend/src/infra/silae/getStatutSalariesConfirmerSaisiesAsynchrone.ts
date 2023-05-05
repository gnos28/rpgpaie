import { silaeRestApi } from "./_restApi";

type StatutSalariesConfirmerSaisiesAsynchroneBody = {
  guidTache: string;
};

type StatutSalariesConfirmerSaisiesAsynchroneProps =
  StatutSalariesConfirmerSaisiesAsynchroneBody;

type StatutSalariesConfirmerSaisiesAsynchroneResult = {
  saisiesHeuresConfirmees: number;
  saisiesPrimesConfirmees: number;
  statut: "ETAT_TERMINEE" | "ETAT_ERREUR" | "ETAT_ENCOURS";
  messageErreur: string;
  progression: number;
  dureeExecution: string;
};

type GetStatutSalariesConfirmerSaisiesAsynchrone = (
  props: StatutSalariesConfirmerSaisiesAsynchroneProps
) => Promise<StatutSalariesConfirmerSaisiesAsynchroneResult>;

const ENDPOINT_URL =
  "/v1/ElementsVariables/StatutSalariesConfirmerSaisiesAsynchrone";

export const getStatutSalariesConfirmerSaisiesAsynchrone: GetStatutSalariesConfirmerSaisiesAsynchrone =
  async (props) => {
    const body: StatutSalariesConfirmerSaisiesAsynchroneBody = {
      guidTache: props.guidTache,
    };

    const StatutSalariesConfirmerSaisiesAsynchrone = await silaeRestApi<
      typeof body,
      StatutSalariesConfirmerSaisiesAsynchroneResult
    >({
      endpoint: ENDPOINT_URL,
      body,
      dossier: "",
    });

    return StatutSalariesConfirmerSaisiesAsynchrone;
  };
