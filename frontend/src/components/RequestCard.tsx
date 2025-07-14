import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import useGetRequest, { type RequestResponse } from "@/api/useGetRequest.tsx";
import { useCallback, useState } from "react";
import JSONPretty from "react-json-pretty";

type RequestCardProps = {
  type: "public" | "secured";
  token?: string;
};

export function RequestCard({ type, token }: RequestCardProps) {
  const [response, setResponse] = useState<RequestResponse>();

  const request = useGetRequest({
    path: `http://localhost:8080/${type}`,
    token: token,
  });

  const handleClick = useCallback(async () => {
    const response = await request();
    setResponse(response);
  }, [request]);

  return (
    <Card className="bg-slate-50 overflow-auto">
      <CardHeader>
        <Button onClick={handleClick}>
          {type === "public" ? "Public" : "Secured"} Request
        </Button>
      </CardHeader>
      <CardContent>
        {response && (
          <div className="flex flex-col gap-4">
            <span className="font-medium">Status Code: {response.status}</span>
            <JSONPretty data={response.json} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
