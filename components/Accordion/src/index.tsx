import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

interface AccordionCompositionProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  /** ID to assign to accordion item */
  id: string;
  /** Class to apply when selected */
  activeClassName?: string;
}

interface AccordionProps {
  /** Children of accordion wrapper */
  children: React.ReactChild[];
}

interface AccordionContextProps {
  /** ID of currently selected panel  */
  selectedId: string | null;
  /** Setter method for setting selected panel */
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
}

// Setting up context with dummy values to satisfy typechecking
const AccordionContext = React.createContext<AccordionContextProps>({
  selectedId: null,
  setSelectedId: () => null,
});

/** Accordion component */
const Accordion = ({ children }: AccordionProps) => {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  return (
    <AccordionContext.Provider value={{ selectedId, setSelectedId }}>
      <div
        css={css`
          position: relative;
          margin: 14px 0;
          width: 100%;
        `}
      >
        {children}
      </div>
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
  const { selectedId, setSelectedId } = React.useContext(AccordionContext);

  return (
    <div
      className={`${className} ${selectedId === id ? activeClassName : ""}`}
      css={css`
        width: 100%;
        padding: 14px 28px;

        &:hover,
        &:focus {
          background-color: #fafafa;
          cursor: pointer;
        }
      `}
      id={`${id}-title`}
      role="button"
      tabIndex={0}
      onClick={() => setSelectedId((prev) => (prev === id ? null : id))}
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
        width: 100%;
        box-sizing: content-box;
        transition: height 0.2s ease-in-out, padding 0.2s ease-in-out;
        height: auto;
        overflow: hidden;

        ${!isSelected && `padding: 0 28px;`}

        ${isSelected && `padding: 14px 28px;`}

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

export default Accordion;
