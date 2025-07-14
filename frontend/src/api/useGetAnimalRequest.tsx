import useGetRequest from "@/api/useGetRequest.tsx";
import { useCallback } from "react";

export type AnimalType = "cat" | "dog";

type GetAnimalRequestProps = {
  type: AnimalType;
};

export type AnimalResponse = {
  url: string;
};

export function useGetAnimalRequest({ type }: GetAnimalRequestProps) {
  const animalRequest = useGetRequest({
    path: `https://api.the${type === "cat" ? "cat" : "dog"}api.com/v1/images/search?limit=1&size=small`,
  });

  return useCallback(
    () =>
      animalRequest().then(
        (response) => (response.json as unknown as AnimalResponse[])[0],
      ),
    [animalRequest],
  );
}
