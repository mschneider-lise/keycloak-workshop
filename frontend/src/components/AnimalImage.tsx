import { use } from "react";
import type { AnimalResponse } from "@/api/useGetAnimalRequest.tsx";

export function AnimalImage({
  animalRequest,
}: {
  animalRequest: Promise<AnimalResponse>;
}) {
  const animalResponse = use(animalRequest);
  return (
    <img className="rounded-md" src={animalResponse.url} alt="animal"></img>
  );
}
