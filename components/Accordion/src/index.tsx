/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";

export interface AccordionCompositionProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  /** Class to apply when selected */
  activeClassName?: string;
  /** ID to assign to accordion item */
  id: string;
}

export interface AccordionProps {
  /** Children of accordion wrapper */
  children?: React.ReactNode[];
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
    /* @ts-ignore */
    <AccordionContext.Provider value={{ selectedId, setSelectedId, onChange }}>
      <div className={accordionWrapperClassName} {...rest}>
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
  const { selectedId, setSelectedId, onChange } = React.useContext(
    AccordionContext
  );

  return (
    <div
      className={`${className} ${
        selectedId === id
          ? `${activeClassName} expanded-title`
          : "collapsed-title"
      }`}
      style={{
        padding: "16px 0",
        cursor: "pointer",
      }}
      id={`${id}-title`}
      role="button"
      tabIndex={0}
      onClick={() => {
        setSelectedId((prev) => {
          const selected = prev === id ? null : id;
          onChange?.(selected);
          return selected;
        });
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "Space") {
          e.preventDefault();
          setSelectedId((prev) => {
            const selected = prev === id ? null : id;
            onChange?.(selected);
            return selected;
          });
        }
      }}
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
      className={`${className} ${
        selectedId === id ? `${activeClassName} expanded` : "collapsed"
      }`}
      style={{
        boxSizing: "content-box",
        transition: "height 0.2s ease-in-out, padding 0.2s ease-in-out",
        overflow: "hidden",
        height: isSelected ? panelRef.current?.scrollHeight : "0px",
      }}
      id={`${id}-panel`}
      aria-hidden={!isSelected}
    >
      {children}
    </div>
  );
};

Accordion.Title = Title;
Accordion.Panel = Panel;
