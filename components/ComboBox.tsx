// components/ComboBox.tsx
"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ComboBoxProps {
  onSelect: (value: string) => void;
}

const ComboBox: React.FC<ComboBoxProps> = ({ onSelect }) => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchOptions = async (query: string = "") => {
    setLoading(true);
    try {
      const response = await fetch(`/api/physicians?name=${query}`);
      const data = await response.json();
      if (data.success) {
        setOptions(data.data.map((physician: { _id: string; name: string }) => ({
          value: physician._id,
          label: physician.name,
        })));
      } else {
        console.error('Failed to fetch options:', data.error);
      }
    } catch (error) {
      console.error('Error fetching options:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchOptions(inputValue);
  }, [inputValue]);

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === inputValue ? "" : currentValue;
    setInputValue(newValue);
    setOpen(false);
    onSelect(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          disabled={loading}
        >
          {inputValue || "Select physician..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search physician..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <CommandEmpty>No physician found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.label)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      inputValue === option.label ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboBox;
