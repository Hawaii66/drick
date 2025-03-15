import { Button } from "@/components/ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

type Props = {
  value: string;
  onChange: (str: string) => void;
  label: string;
  help?: string[];
};

export default function AnswerTextInput({
  label,
  onChange,
  value,
  help,
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
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
      />
    </div>
  );
}
