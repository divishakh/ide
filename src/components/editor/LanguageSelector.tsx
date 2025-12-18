import { Code2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SUPPORTED_LANGUAGES, getLanguageDisplayName } from '@/services/codeExecution';

interface LanguageSelectorProps {
  value: string;
  onChange: (language: string) => void;
  disabled?: boolean;
}

export function LanguageSelector({ value, onChange, disabled }: LanguageSelectorProps) {
  const languages = Object.keys(SUPPORTED_LANGUAGES);

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-[180px]">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4" />
          <SelectValue placeholder="Select language" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang} value={lang}>
            {getLanguageDisplayName(lang)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
