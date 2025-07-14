import { useCallback } from "react";

export interface RequestResponse {
  readonly status: string;
  readonly json?: string;
}

interface GetRequestProps {
  readonly path: string;
  readonly token?: string;
}

export default function useGetRequest({
  path,
  token,
}: GetRequestProps): () => Promise<RequestResponse> {
  return useCallback(
    () =>
      fetch(path, {
        method: "get",
        headers: token
          ? new Headers({
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            })
          : undefined,
      }).then(async (response): Promise<RequestResponse> => {
        return response.ok
          ? {
              status: `${response.status} ${response.statusText}`,
              json: await response.json(),
            }
          : { status: `${response.status} ${response.statusText}` };
      }),
    [path, token],
  );
}
