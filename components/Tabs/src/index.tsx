import React, { useEffect } from "react";
import styles from "./Tabs.css";

interface TabsProps {
  /** Children of tabs wrapper */
  children: React.ReactChild[];
}

interface TabProps {
  /** ID of tab (ties tab content to tab title)  */
  id: string;
  /** What to render in title */
  children: React.ReactNode;
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
  /** Content to render in tab panel */
  content?: React.ReactNode;
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
            >
              {tab.title}
            </div>
          ))}
        </div>
        <div className={styles["tab-panel"]}>
          {Object.entries(tabs)
            .filter(([id]) => id === selectedId)
            .map(([, tab]) => {
              return tab.content;
            })}
        </div>
      </div>
    </>
  );
};

/** Add a title to a tab */
const Title = ({ id, children, ...rest }: TabProps) => {
  const { setTabs } = React.useContext(TabsContext);

  React.useEffect(() => {
    if (id) {
      setTabs((prev: Record<string | number, Tab>) => {
        // If this tab already exists, append to the existing object
        if (prev[id]) {
          return {
            ...prev,
            [id]: { ...prev[id], title: children },
          };
        }

        // Otherwise, create a new object with this ID
        return {
          ...prev,
          [id]: { title: children },
        };
      });
    }
  }, [id, children, setTabs]);

  return null;
};

/** Add some content to a tab */
const Content = ({ id, children, ...rest }: TabProps) => {
  const { setTabs } = React.useContext(TabsContext);

  React.useEffect(() => {
    if (id) {
      setTabs((prev: Record<string | number, Tab>) => {
        // If this tab already exists, append to the existing object
        if (prev[id]) {
          return {
            ...prev,
            [id]: { ...prev[id], content: children },
          };
        }

        // Otherwise, create a new object with this ID
        return {
          ...prev,
          [id]: { content: children },
        };
      });
    }
  }, [id, children, setTabs]);

  return null;
};

Tabs.Title = Title;
Tabs.Content = Content;
