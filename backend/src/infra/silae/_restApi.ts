import axios from "axios";
import { getToken } from "./getToken";

type SilaeRestApiProps = {
  endpoint: string;
  body: { [key: string]: string | number };
  dossier: string;
};

type SilaeRestApi = <T>(props: SilaeRestApiProps) => Promise<T>;

const SILAE_BASE_URL = "https://payroll-api.silae.fr/payroll/";
let TOKEN = "";

export const silaeRestApi: SilaeRestApi = async (props) => {
  const subscriptionKey = process.env.SILAE_SUBSCRIPTION_KEY || "";
  if (!TOKEN) TOKEN = (await getToken()).access_token;

  const payload = (
    await axios.post(SILAE_BASE_URL + props.endpoint, props.body, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Ocp-Apim-Subscription-Key": `${subscriptionKey}`,
        dossiers: `${props.dossier}`,
      },
    })
  ).data;

  return payload;
};
