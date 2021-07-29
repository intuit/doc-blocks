import React, { useEffect } from "react";
import styles from "./Tabs.css";

interface TabsProps {
  /** Children of tabs wrapper */
  children: React.ReactChild[];
}

interface TabProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  /** ID of tab (ties tab content to tab title)  */
  id: string;
}

interface TabsContextProps {
  /** Array of tabs to render  */
  tabs?: Record<string, Tab>;
  /** Setter method for tabs */
  setTabs: React.Dispatch<React.SetStateAction<Record<string, Tab>>>;
}

interface Tab {
  /** Title to render in tab */
  title?: React.ReactNode;
  /** Props to spread to tab title element */
  titleProps?: React.DOMAttributes<HTMLDivElement> & React.AriaAttributes;
  /** Content to render in tab panel */
  content?: React.ReactNode;
  /** Props to spread to tab content element */
  contentProps?: React.DOMAttributes<HTMLDivElement> & React.AriaAttributes;
}

// Setting up context with dummy values to satisfy typechecking
const TabsContext = React.createContext<TabsContextProps>({
  tabs: {},
  setTabs: () => null,
});

/** Tabbed interface to show consumer and contributor docs  */
export const Tabs = ({ children }: TabsProps) => {
  const [tabs, setTabs] = React.useState<Record<string, Tab>>({});
  const [selectedId, setSelectedId] = React.useState<string>();
  const providerState = React.useMemo(() => ({ tabs, setTabs }), [tabs]);

  useEffect(() => {
    const tabKeys = Object.keys(tabs);
    if (tabKeys.length > 1) {
      setSelectedId(tabKeys[0]);
    }
  }, [tabs]);

  return (
    <>
      <TabsContext.Provider value={providerState}>
        {children}
      </TabsContext.Provider>
      <div className={styles["tab-container"]}>
        <div className={styles["tab-titles"]}>
          {Object.entries(tabs).map(([id, tab]) => (
            <div
              key={id}
              className={`${styles.tab} ${
                id === selectedId ? styles.selected : ""
              }`}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedId(id)}
              onKeyDown={(e) => e.key !== "Tab" && setSelectedId(id)}
              {...tab.titleProps}
            >
              {tab.title}
            </div>
          ))}
        </div>
        {Object.entries(tabs)
          .filter(([id]) => id === selectedId)
          .map(([id, tab]) => (
            <div
              key={`${id}-content`}
              className={styles["tab-panel"]}
              {...tab.contentProps}
            >
              {tab.content}
            </div>
          ))}
      </div>
    </>
  );
};

/** Add a title to a tab */
const Title = ({ id, children, ...rest }: TabProps) => {
  const { setTabs } = React.useContext(TabsContext);
  const { current: otherProps } = React.useRef(rest);

  React.useEffect(() => {
    if (id) {
      setTabs((prev: Record<string, Tab>) => {
        // If this tab already exists, append to the existing object
        if (prev[id]) {
          return {
            ...prev,
            [id]: { ...prev[id], title: children, titleProps: otherProps },
          };
        }

        // Otherwise, create a new object with this ID
        return {
          ...prev,
          [id]: { title: children, titleProps: otherProps },
        };
      });
    }
  }, [id, children, setTabs, otherProps]);

  return null;
};

/** Add some content to a tab */
const Content = ({ id, children, ...rest }: TabProps) => {
  const { setTabs } = React.useContext(TabsContext);
  const { current: otherProps } = React.useRef(rest);

  React.useEffect(() => {
    if (id) {
      setTabs((prev: Record<string, Tab>) => {
        // If this tab already exists, append to the existing object
        if (prev[id]) {
          return {
            ...prev,
            [id]: { ...prev[id], content: children, contentProps: otherProps },
          };
        }

        // Otherwise, create a new object with this ID
        return {
          ...prev,
          [id]: { content: children, contentProps: otherProps },
        };
      });
    }
  }, [id, children, setTabs, otherProps]);

  return null;
};

Tabs.Title = Title;
Tabs.Content = Content;
