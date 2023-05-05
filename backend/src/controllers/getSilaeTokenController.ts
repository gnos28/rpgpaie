import { getTokenUseCase } from "../useCases/getToken/getToken.core";
import { getTokenAdapter } from "../useCases/getToken/getToken.spi";
import { ControllerType } from "../@types";

type BodyPayload = {
  client_id: string | undefined;
  client_secret: string | undefined;
};

const getSilaeTokenController: ControllerType = {
  getToken: async (_req, res) => {
    try {
      const token = await getTokenUseCase(getTokenAdapter.silaeRest)();

      res.send({ token });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },

  getTokenWithCredentials: async (req, res) => {
    try {
      const { client_id, client_secret }: BodyPayload = req.body;

      if (!client_id || !client_secret)
        throw new Error("missing credentials !");

      const token = await getTokenUseCase(getTokenAdapter.silaeRest)({
        client_id,
        client_secret,
      });

      res.send({ token });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },
};

export { getSilaeTokenController };
