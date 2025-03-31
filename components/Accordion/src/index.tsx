import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

interface AccordionCompositionProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  /** Class to apply when selected */
  activeClassName?: string;
  /** ID to assign to accordion item */
  id: string;
}

interface AccordionProps {
  /** Children of accordion wrapper */
  children: React.ReactChild[];
  /** Classes to apply to accordion wrapper **/
  className?: string;
  /** Callback after an accordion panel is expanded */
  onChange?: (selectedId: string | null) => void;
}

interface AccordionContextProps {
  /** ID of currently selected panel  */
  selectedId: string | null;
  /** Setter method for setting selected panel */
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
  /** Callback after an accordion panel is expanded (derived from AccordionProps) */
  onChange?: (selectedId: string | null) => void;
}

// Setting up context with dummy values to satisfy typechecking
const AccordionContext = React.createContext<AccordionContextProps>({
  selectedId: null,
  setSelectedId: () => null,
  onChange: () => null,
});

/** Accordion component */
export const Accordion = ({
  className: accordionWrapperClassName,
  children,
  onChange,
  ...rest
}: AccordionProps) => {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  return (
    <AccordionContext.Provider value={{ selectedId, setSelectedId, onChange }}>
      <div className={accordionWrapperClassName}>{children}</div>
    </AccordionContext.Provider>
  );
};

/** Renders the accordion title */
const Title = ({
  id,
  children,
  className,
  activeClassName,
}: AccordionCompositionProps) => {
  const { selectedId, setSelectedId, onChange } = React.useContext(
    AccordionContext
  );

  return (
    <div
      className={`${className} ${selectedId === id ? activeClassName : ""}`}
      css={css`
        padding: 16px 0;
        cursor: pointer;
      `}
      id={`${id}-title`}
      role="button"
      tabIndex={0}
      onClick={() => {
        setSelectedId((prev) => {
          const selected = prev === id ? null : id;
          onChange && onChange(selected);
          return selected;
        });
      }}
      onKeyPress={() => setSelectedId((prev) => (prev === id ? null : id))}
    >
      {children}
    </div>
  );
};

/** Renders the accordion content panel */
const Panel = ({
  id,
  children,
  className,
  activeClassName,
}: AccordionCompositionProps) => {
  const { selectedId } = React.useContext(AccordionContext);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const isSelected = selectedId === id;

  return (
    <div
      ref={panelRef}
      className={`${className} ${selectedId === id ? activeClassName : ""}`}
      css={css`
        box-sizing: content-box;
        transition: height 0.2s ease-in-out, padding 0.2s ease-in-out;
        height: auto;
        overflow: hidden;

        @media (prefers-reduced-motion) {
          transition: none;
        }
      `}
      id={`${id}-panel`}
      aria-hidden={!isSelected}
      style={{
        height: isSelected ? panelRef.current?.scrollHeight : "0px",
      }}
    >
      {children}
    </div>
  );
};

Accordion.Title = Title;
Accordion.Panel = Panel;
