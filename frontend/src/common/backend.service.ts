import { Env } from "./env";

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT", 
}

interface RequestConfig {
  method?: HttpMethod;
  timeout?: number;
  headers?: Record<string, any>;
  params?: Record<string, string>;
  data?: any;
}

export default class BackendService {
  protected accessToken?: string = "";

  constructor(
    config: {
      accessToken?: string;
    } = {}
  ) {
    this.accessToken = config.accessToken;
  }

  async request(
    url: string, // URL that you want to request
    config: RequestConfig = {} // Configuration object
  ): Promise<any> {
    const {
      method = HttpMethod.GET, // Default method is GET
      timeout, // Timeout for the request
      headers = {}, // Additional headers
      params, // URL search parameters
      data, // Request body data
    } = config;

    // Base URL for the requests
    const baseURL = Env.backendUrl + "/api";

    // Construct the full URL with parameters
    const fullURL = new URL(baseURL + url);

    if (params) {
      Object.keys(params).forEach((key) =>
        fullURL.searchParams.append(key, params[key])
      );
    }

    
    // Request options
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`, // Replace with your access token
        ...headers, // Merge with additional headers
      },
    };

    // Include the body data for POST, PUT, PATCH requests
    if (data) {
      options.body = JSON.stringify(data);
    }

    // Function to handle fetch with timeout
    const fetchWithTimeout = (
      resource: RequestInfo,
      options: RequestInit
    ): Promise<Response> => {
      const controller = new AbortController();
      const { signal } = controller;
      options.signal = signal;

      const fetchPromise = fetch(resource, options);
      const timeoutPromise = new Promise<Response>((_, reject) =>
        setTimeout(() => {
          controller.abort();
          reject(new Error("Request timed out"));
        }, timeout)
      );

      return Promise.race([fetchPromise, timeoutPromise]);
    };

    try {
      // Make the fetch request
      const response = timeout
        ? await fetchWithTimeout(fullURL.toString(), options)
        : await fetch(fullURL.toString(), options);

      // Check if the request was successful

      if (!response.ok) {
        let errorMessage = JSON.parse(await response.text())?.detail
        throw new Error(
          errorMessage ? errorMessage : "Unknown Error, please try again or contact us"
        );
      }

      // Parse the JSON response
      return await response.json();
    } catch (error) {
      
      throw error;
    }
  }


  async login(config: any) {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "");
    urlencoded.append("username", config?.data?.username);
    urlencoded.append("password", config?.data?.password);
    urlencoded.append("scope", "");
    urlencoded.append("client_id", "");
    urlencoded.append("client_secret", "");

    const requestOptions: RequestInit = {
      method: config?.method ? config?.method : HttpMethod.GET,
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    };

    const results = await fetch(Env.backendUrl + "/api/v1/users/login", requestOptions)
      .then((response) => response.text())
      .then((result) => { return JSON.parse(result) })
      .catch((error) => { 
        throw new Error(error)})

    return results
  }


  // async updateVerificationStatus(verificationToken: any) {
  //   const verificationConfig = {
  //     method: HttpMethod.GET,
  //   };
  //   return await this.request(`verify/${verificationToken}`, verificationConfig)
  // }
}
