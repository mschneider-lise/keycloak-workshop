import {
  type AnimalType,
  useGetAnimalRequest,
} from "@/api/useGetAnimalRequest.tsx";
import { Suspense } from "react";
import { AnimalImage } from "@/components/AnimalImage.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";

type AnimalCardProps = {
  type: AnimalType;
};

export function AnimalCard({ type }: AnimalCardProps) {
  const animalRequest = useGetAnimalRequest({ type });

  return (
    <Suspense fallback="loading...">
      <Card className="bg-slate-50">
        <CardContent>
          <AnimalImage animalRequest={animalRequest()} />
        </CardContent>
      </Card>
    </Suspense>
  );
}
