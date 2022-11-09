import { SALEOR_AUTHORIZATION_BEARER_HEADER, SALEOR_DOMAIN_HEADER } from "@saleor/app-sdk/const";
import { SettingsApiResponse } from "../../pages/api/settings";
import { CMSProvider } from "./providers";
import { strapiClient } from "./strapi";
import { contentfulClient } from "./contentful";

// todo: use settings to decide on the cms provider
// todo: add support for multiple

export const createCmsClient = async ({
  domain,
  token,
  host,
}: {
  domain: string;
  token: string;
  host: string;
}) => {
  const response = await fetch(`https://${host}/api/settings`, {
    headers: [
      ["content-type", "application/json"],
      [SALEOR_DOMAIN_HEADER, domain],
      [SALEOR_AUTHORIZATION_BEARER_HEADER, token],
    ],
  });

  const result = (await response.json()) as SettingsApiResponse;

  if (!result.success) {
    throw new Error("The provider was not recognized.");
  }

  const provider: CMSProvider | string | undefined = result.data?.find(
    (setting) => setting.value === "true"
  )?.key;

  switch (provider) {
    case "strapi": {
      return strapiClient;
    }

    case "contentful": {
      return contentfulClient;
    }

    default: {
      throw new Error("The provider was not recognized.");
    }
  }
};
