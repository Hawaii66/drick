import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {
  question: string;
};

export default function GroupQuestion({ question }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Group Question</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{question}</p>
      </CardContent>
    </Card>
  );
}
