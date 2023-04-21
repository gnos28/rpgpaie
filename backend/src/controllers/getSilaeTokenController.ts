import { ControllerType } from "../interfaces";
import { getToken } from "../services/getToken/getToken.core";
import { getTokenAdapter } from "../services/getToken/getToken.spi";

const getSilaeTokenController: ControllerType = {
  getToken: async (req, res) => {
    const token = await getToken(getTokenAdapter)();

    res.send({ token });
  },
};

export { getSilaeTokenController };
