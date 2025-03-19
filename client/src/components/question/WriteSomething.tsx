import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {
  text: string;
};

export default function WriteSomething({ text }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Write something</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{text}</p>
      </CardContent>
    </Card>
  );
}
