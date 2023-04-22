import { ControllerType } from "../interfaces";
import { getTokenService } from "../services/getToken/getToken.core";
import { getTokenAdapter } from "../services/getToken/getToken.spi";

const getSilaeTokenController: ControllerType = {
  getToken: async (_req, res) => {
    const token = await getTokenService(getTokenAdapter.silaeRest)();

    res.send({ token });
  },
};

export { getSilaeTokenController };
