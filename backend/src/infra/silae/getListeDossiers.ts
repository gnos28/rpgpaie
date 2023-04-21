import { silaeRestApi } from "./_restApi";

type ListeDossiersProps = Record<string, never>;

type ProprietesDossier = {
  numero: string;
  raisonSociale: string;
  siret: string;
  groupe: string;
};

type ListeDossiersResult = {
  listeDossiers: ProprietesDossier[];
};

const LISTE_DOSSIERS_URL = "v1/InfosTechniquesDossiers/ListeDossiers";

export const getListeDossiers = async (_props?: ListeDossiersProps) => {
  const body = {
    typeDossiers: 1,
  };

  const dossiers = await silaeRestApi<ListeDossiersResult>({
    endpoint: LISTE_DOSSIERS_URL,
    body,
    dossier: "",
  });

  return dossiers;
};
