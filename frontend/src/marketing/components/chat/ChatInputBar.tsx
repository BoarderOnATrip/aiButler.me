import { Send } from "lucide-react";
import { FormEvent, KeyboardEvent, useState } from "react";

type ChatInputBarProps = {
  placeholder?: string;
  onSend: (value: string) => void;
  disabled?: boolean;
};

export function ChatInputBar({
  placeholder = "Ask Mira anything...",
  onSend,
  disabled,
}: ChatInputBarProps) {
  const [value, setValue] = useState("");

  function submit() {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submit();
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  }

  return (
    <form className="mira-input" onSubmit={onSubmit}>
      <textarea
        className="mira-input__field"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        rows={1}
      />
      <button className="mira-input__button" type="submit" disabled={disabled || !value.trim()}>
        <Send size={14} />
        Send
      </button>
    </form>
  );
}
