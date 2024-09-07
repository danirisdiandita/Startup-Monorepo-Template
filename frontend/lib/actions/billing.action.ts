"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";
import BackendService, {
  RequestConfig,
  HttpMethod,
} from "@/common/backend.service";
import { Env } from "@/common/env";

export const generateSubscriptionInfo = async () => {
  const session = await getServerSession(authOptions);

  const config: RequestConfig = {
    method: HttpMethod.GET,
    data: {},
  };

  try {
    const checkoutEndpointUrl = Env.lemonSqueezyApiUrl + "/checkouts";

    const response = await fetch(checkoutEndpointUrl, {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${Env.lemonSqueezyApiKey}`,
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              custom: {
                user_email: session?.user?.email,
              },
            },
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: Env.lemonSqueezyStoreId,
              },
            },
            variant: {
              data: {
                type: "variants",
                id: Env.lemonSqueezyVariantId,
              },
            },
          },
        },
      }),
    });

    const data = await response.json();
    const checkoutUrl = data.data.attributes.url;
    return { checkoutUrl };
  } catch (error) {
    console.error(error);
  }
};
