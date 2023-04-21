import axios from "axios";

type GetTokenProps = {
  clientId: string;
  clientSecret: string;
};

type GetTokenResult = {
  access_token: string;
  token_type: string;
  not_before: number;
  expires_in: number;
  expires_on: number;
  resource: string;
};

const GET_TOKEN_URL = "https://payroll-api-auth.silae.fr/oauth2/v2.0/token";

export const getToken = async (props?: GetTokenProps) => {
  const client_id = props?.clientId || process.env.SILAE_CLIENT_ID;
  const client_secret = props?.clientSecret || process.env.SILAE_CLIENT_SECRET;

  const tokenBody = (
    await axios.post(
      GET_TOKEN_URL,
      {
        grant_type: "client_credentials",
        client_id,
        client_secret,
        scope:
          "https://silaecloudb2c.onmicrosoft.com/36658aca-9556-41b7-9e48-77e90b006f34/.default",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
  ).data as GetTokenResult;

  return tokenBody;
};
