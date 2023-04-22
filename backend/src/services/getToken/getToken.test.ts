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
  test("retrieve a token", async () => {
    const token = await getTokenService(getTokenApiMock)();

    expect(token).toBe("token");
  });
});
