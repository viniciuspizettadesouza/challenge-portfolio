import { useId, useState } from "react";
import { convertToRoman } from "./logic";
import "./styles.css";

const examples = [4, 9, 42, 944, 1000];

export default function PropertiaGDemo() {
  const inputId = useId();
  const [input, setInput] = useState("42");

  const numericValue = Number(input);
  const valid =
    input.trim() !== "" &&
    Number.isInteger(numericValue) &&
    numericValue >= 1 &&
    numericValue <= 1000;
  const result = valid ? convertToRoman(numericValue) : "";

  return (
    <div className="propertiag-demo">
      <div className="calculator">
        <p className="calculator__eyebrow">Integer to Roman numeral</p>
        <h3>Translate a number</h3>
        <p className="calculator__copy">
          Enter a whole number between 1 and 1000, matching the original challenge.
        </p>

        <label htmlFor={inputId}>Number</label>
        <input
          id={inputId}
          type="number"
          min="1"
          max="1000"
          step="1"
          inputMode="numeric"
          value={input}
          aria-describedby={`${inputId}-hint`}
          onChange={(event) => setInput(event.target.value)}
        />
        <small id={`${inputId}-hint`}>Accepted range: 1–1000</small>

        <div className="examples" aria-label="Example values">
          {examples.map((example) => (
            <button key={example} type="button" onClick={() => setInput(String(example))}>
              {example}
            </button>
          ))}
        </div>

        <output aria-live="polite">
          <span>{valid ? "Roman numeral" : "Validation"}</span>
          <strong>{valid ? result : "Enter a whole number from 1 to 1000."}</strong>
        </output>
      </div>

      <aside aria-label="Conversion explanation">
        <p>How 42 is composed</p>
        <div>
          <span>40</span><strong>XL</strong>
        </div>
        <div>
          <span>2</span><strong>II</strong>
        </div>
        <div className="total">
          <span>42</span><strong>XLII</strong>
        </div>
      </aside>
    </div>
  );
}
