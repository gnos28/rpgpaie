import { silaeRestApi } from "./_restApi";

type AjouteCompteRenduEdi94Body = {
  numeroADS: string;
  adsacsars: "ADS" | "ACS" | "ARS";
  statutDeclaration: "OK" | "KO" | "ANO";
  statutTelepaiement: "OK" | "KO" | "ANO" | undefined;
  typeMessage: "TXT" | "EML";
  messageTexte: string;
  messageBa: string; // Tableau de Byte encodé en base64 représentant un flux EML explicatif du compte-rendu
  crm94NomFichier: string;
  crm94Xml: string; // contenu du fichier CRM94 en XML encodé en base64
};

type AjouteCompteRenduEdi94Props = AjouteCompteRenduEdi94Body;

type AjouteCompteRenduEdi94Result = {
  nbSalariesPresentsXML: number;
  nbSalariesTrouves: number;
  nbTauxSalariesCrees: number;
  nbTauxSalariesMisAJour: number;
};

type GetAjouteCompteRenduEdi94 = (
  props: AjouteCompteRenduEdi94Props
) => Promise<AjouteCompteRenduEdi94Result>;

const ENDPOINT_URL = "/v1/CompteRenduDSN/AjouteCompteRenduEdi94";

export const getAjouteCompteRenduEdi94: GetAjouteCompteRenduEdi94 = async (
  props
) => {
  const body: AjouteCompteRenduEdi94Body = {
    numeroADS: props.numeroADS,
    adsacsars: props.adsacsars,
    statutDeclaration: props.statutDeclaration,
    statutTelepaiement: props.statutTelepaiement,
    typeMessage: props.typeMessage,
    messageTexte: props.messageTexte,
    messageBa: props.messageBa,
    crm94NomFichier: props.crm94NomFichier,
    crm94Xml: props.crm94Xml,
  };

  const AjouteCompteRenduEdi94 = await silaeRestApi<
    typeof body,
    AjouteCompteRenduEdi94Result
  >({
    endpoint: ENDPOINT_URL,
    body,
    dossier: "",
  });

  return AjouteCompteRenduEdi94;
};
