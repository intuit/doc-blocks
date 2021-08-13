import React from "react";

import styles from "./Accordion.css";

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
      <div className={styles.accordion}>{children}</div>
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
      className={`${styles.title} ${className} ${
        selectedId === id ? activeClassName : ""
      }`}
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
      className={`${styles.panel} ${
        isSelected ? styles.expanded : styles.collapsed
      } ${className} ${selectedId === id ? activeClassName : ""}`}
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
