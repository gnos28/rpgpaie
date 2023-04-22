import axios from "axios";
import { getToken } from "./getToken";

type SilaeRestApiProps = {
  endpoint: string;
  body: { [key: string]: string | number };
  dossier: string;
};

type SilaeRestApi = <T>(props: SilaeRestApiProps) => Promise<T>;

const SILAE_BASE_URL = "https://payroll-api.silae.fr/payroll/";
let token = "";
let tokenExpirationTime = 0;

export const silaeRestApi: SilaeRestApi = async (props) => {
  const subscriptionKey = process.env.SILAE_SUBSCRIPTION_KEY || "";

  if (!token || tokenExpirationTime < new Date().getTime() + 10_000) {
    const newToken = await getToken();
    token = newToken.access_token;
    tokenExpirationTime = newToken.expires_on;
  }

  const payload = (
    await axios.post(SILAE_BASE_URL + props.endpoint, props.body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Ocp-Apim-Subscription-Key": `${subscriptionKey}`,
        dossiers: `${props.dossier}`,
      },
    })
  ).data;

  return payload;
};
