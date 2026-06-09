import { CheckCircle2, EyeClosed, X, Eye } from "lucide-react";
import { forwardRef, useState } from "react";
import { Input } from "@/src/components/ui/input.tsx";
import { Label } from "@/src/components/ui/label.tsx";
import { Button } from "@/src/components/ui/button.tsx";

type InputRealTimeValidationDemoProps = {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  name?: string;
  error?: boolean;
};

const InputRealTimeValidationDemo = forwardRef<
    HTMLInputElement,
    InputRealTimeValidationDemoProps
>(({ value = "", onChange, onBlur, name, error }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const validations = [
    { text: "At least 8 characters", valid: value.length >= 8 },
    { text: "Contains a number", valid: /\d/.test(value) },
    { text: "Contains uppercase letter", valid: /[A-Z]/.test(value) },
  ];

  const strength = validations.filter((v) => v.valid).length;

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-muted";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    return "bg-teal-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "";
    if (score <= 1) return "Weak";
    if (score <= 2) return "Moderate";
    return "Very Strong";
  };

  const getStrengthTextColor = (score: number) => {
    if (score === 0) return "text-muted-foreground";
    if (score <= 1) return "text-red-500";
    if (score <= 2) return "text-orange-500";
    return "text-teal-500";
  };

  return (
      <div className="w-full max-w-sm space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password-realtime" className="gap-1">
            Password
            <span className="text-destructive">*</span>
          </Label>

          <div className="relative">
            <Input
                ref={ref}
                name={name}
                className="bg-transparent"
                id="password-realtime"
                onChange={onChange}
                onBlur={onBlur}
                placeholder="********"
                type={showPassword ? "text" : "password"}
                value={value}
                aria-invalid={error}
                autoComplete="new-password"
            />

            <Button
                className="absolute top-0 right-0 h-full px-3 hover:bg-transparent cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
                size="icon"
                type="button"
                variant="ghost"
            >
              {showPassword ? (
                  <Eye className="h-4 w-4 text-muted-foreground" />
              ) : (
                  <EyeClosed className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
            <div
                className={`h-full transition-all duration-500 ease-out ${getStrengthColor(
                    strength
                )}`}
                style={{ width: `${(strength / 3) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-muted-foreground">Password must contain</span>
            <span className={getStrengthTextColor(strength)}>
            {getStrengthText(strength)}
          </span>
          </div>
        </div>

        <div className="space-y-1.5 pt-1">
          {validations.map((validation, index) => (
              <div
                  className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
                      validation.valid
                          ? "text-teal-400 dark:text-teal-400"
                          : "text-muted-foreground"
                  }`}
                  key={index}
              >
                {validation.valid ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                    <X className="h-3.5 w-3.5" />
                )}

                <span className="text-[13px]">{validation.text}</span>
              </div>
          ))}
        </div>
      </div>
  );
});

InputRealTimeValidationDemo.displayName = "InputRealTimeValidationDemo";

export default InputRealTimeValidationDemo;