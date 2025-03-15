import { Button } from "@/components/ui/button";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";

type Props = {
  onChange: (str: string) => void;
  label: string;
  lines: number;
  value: string;
  help?: string[];
};

export default function AnswerTextAreaInput({
  label,
  onChange,
  lines,
  help,
  value,
}: Props) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-row justify-between items-center w-full">
        <Label>{label}</Label>{" "}
        {help && (
          <Button
            onClick={() =>
              onChange(help[Math.floor(Math.random() * help.length)])
            }
            variant={"ghost"}
            className="text-gray-500"
          >
            help
          </Button>
        )}
      </div>
      <Textarea
        onChange={(e) => onChange(e.target.value)}
        rows={lines}
        value={value}
      />
    </div>
  );
}
