import { silaeRestApi } from "./_restApi";

type ListeDossiersProps = Record<string, never>;

type ProprietesDossierBody = {
  typeDossiers: number;
};

type ProprietesDossier = {
  numero: string;
  raisonSociale: string;
  siret: string;
  groupe: string;
};

type ListeDossiersResult = {
  listeDossiers: ProprietesDossier[];
};

type GetListeDossiers = (
  props?: ListeDossiersProps
) => Promise<ListeDossiersResult>;

const LISTE_DOSSIERS_URL = "v1/InfosTechniquesDossiers/ListeDossiers";

export const getListeDossiers: GetListeDossiers = async (_props) => {
  const body: ProprietesDossierBody = {
    typeDossiers: 1,
  };

  const dossiers = await silaeRestApi<typeof body, ListeDossiersResult>({
    endpoint: LISTE_DOSSIERS_URL,
    body,
    dossier: "",
  });

  return dossiers;
};
