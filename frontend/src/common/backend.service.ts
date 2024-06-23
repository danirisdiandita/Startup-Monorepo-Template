import { Env } from "./env";

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response
      return await response.json();
    } catch (error) {
      // Handle errors
      throw error;
    }
  }
}
