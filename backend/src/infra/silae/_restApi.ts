import axios from "axios";
import { getToken } from "./getToken";

type Body = {
  [key: string]: string | number | string[] | number[] | undefined | Body;
};

type SilaeRestApiProps<T extends Body> = {
  endpoint: string;
  body: T;
  dossier: string;
};

type SilaeRestApi = <T extends Body, U>(
  props: SilaeRestApiProps<T>
) => Promise<U>;

const SILAE_BASE_URL = "https://payroll-api.silae.fr/payroll/";
let token = "";
let tokenExpirationTime = 0;

const refreshToken = async () => {
  if (!token || tokenExpirationTime < new Date().getTime() + 10_000) {
    const newToken = await getToken();
    token = newToken.access_token;
    tokenExpirationTime = newToken.expires_on;
  }
};

const apiCall = async (props: SilaeRestApiProps<Body>) => {
  const subscriptionKey = process.env.SILAE_SUBSCRIPTION_KEY || "";

  return (
    await axios.post(SILAE_BASE_URL + props.endpoint, props.body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Ocp-Apim-Subscription-Key": `${subscriptionKey}`,
        dossiers: `${props.dossier}`,
      },
    })
  ).data;
};

export const silaeRestApi: SilaeRestApi = async (props) => {
  await refreshToken();

  const payload = await apiCall(props);

  return payload;
};
