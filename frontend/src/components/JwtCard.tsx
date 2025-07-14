import type { JwtHeader, JwtPayload } from "jwt-decode";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import JSONPretty from "react-json-pretty";

type JwtCardProps = {
  title: string;
  content: JwtHeader | JwtPayload;
};

export function JwtCard({ title, content }: JwtCardProps) {
  return (
    <Card className="bg-slate-50 overflow-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <JSONPretty data={content} />
      </CardContent>
    </Card>
  );
}
