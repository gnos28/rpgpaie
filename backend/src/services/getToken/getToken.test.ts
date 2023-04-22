import { getTokenService } from "./getToken.core";
import { GetTokenPort } from "./getToken.spi";

const access_token = "token";

const getTokenApiMock: GetTokenPort = async () => ({
  access_token,
  token_type: "token_type",
  not_before: 0,
  expires_in: 0,
  expires_on: 0,
  resource: "a",
});

describe("getTokenService", () => {
  test("no props provided", async () => {
    const token = await getTokenService(getTokenApiMock)();

    expect(token).toBe(access_token);
  });
  test("props provided", async () => {
    const token = await getTokenService(getTokenApiMock)({
      clientId: "azeaze",
      clientSecret: "azeaze",
    });

    expect(token).toBe(access_token);
  });
});
