import { ControllerType } from "../interfaces";
import { getTokenService } from "../services/getToken/getToken.core";
import { getTokenAdapter } from "../services/getToken/getToken.spi";

type BodyPayload = {
  client_id: string;
  client_secret: string;
};

const getSilaeTokenController: ControllerType = {
  getToken: async (_req, res) => {
    const token = await getTokenService(getTokenAdapter.silaeRest)();

    res.send({ token });
  },

  getTokenWithProps: async (req, res) => {
    const { client_id, client_secret }: BodyPayload = req.body;

    const token = await getTokenService(getTokenAdapter.silaeRest)({
      clientId: client_id,
      clientSecret: client_secret,
    });

    res.send({ token });
  },
};

export { getSilaeTokenController };
