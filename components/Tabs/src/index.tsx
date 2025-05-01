/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect } from "react";

import styles from "./Tabs.module.css";

export interface TabsProps {
  /** Default active tab */
  active?: string;
  /** Children of tabs wrapper */
  children?: React.ReactNode[];
  /** Classes to apply to tab title wrapper **/
  className?: string;
  /** Callback after a tab is selected */
  onChange?: (selectedId: string) => void;
}

export interface TabProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  /** ID of tab (ties tab content to tab title)  */
  id: string;
  /** Class to apply to selected tab title */
  activeClassName?: string;
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
  titleProps?: React.HTMLAttributes<HTMLDivElement> &
    React.AriaAttributes &
    TabProps;
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
export const Tabs = ({
  active,
  children,
  className: tabsWrapperClassName,
  onChange,
}: TabsProps) => {
  const [tabs, setTabs] = React.useState<Record<string, Tab>>({});
  const [selectedId, setSelectedId] = React.useState<string>();
  const providerState = React.useMemo(() => ({ tabs, setTabs }), [tabs]);

  useEffect(() => {
    const tabKeys = Object.keys(tabs);
    if (tabKeys.length > 1) {
      const tabIndex = active ? tabKeys.indexOf(active) : 0;
      setSelectedId(tabKeys[tabIndex]);
    }
  }, [tabs, active]);

  return (
    <>
      {/* @ts-ignore */}
      <TabsContext.Provider value={providerState}>
        {children}
      </TabsContext.Provider>
      <div className={styles.container}>
        <div className={`${styles.tabsRow} ${tabsWrapperClassName || ""}`}>
          {Object.entries(tabs).map(([id, tab]) => {
            if (tab.titleProps) {
              const {
                className,
                activeClassName,
                ...titleProps
              } = tab.titleProps;

              return (
                <div
                  key={id}
                  className={`${styles.tabTitle} ${
                    id === selectedId ? styles.activeTab : ""
                  } ${className || ""} ${
                    id === selectedId ? activeClassName || "" : ""
                  }`}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    onChange?.(id);
                    setSelectedId(id);
                  }}
                  onKeyDown={(e) => e.key !== "Tab" && setSelectedId(id)}
                  {...titleProps}
                >
                  {tab.title}
                </div>
              );
            }

            return "No Title";
          })}
        </div>
        {Object.entries(tabs)
          .filter(([id]) => id === selectedId)
          .map(([id, tab]) => (
            <div
              key={`${id}-content`}
              className={styles.tabContent}
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
const Title = ({ id, children, activeClassName, ...rest }: TabProps) => {
  const { setTabs } = React.useContext(TabsContext);
  const { current: otherProps } = React.useRef(rest);

  React.useEffect(() => {
    if (id) {
      setTabs((prev: Record<string, Tab>) => {
        // If this tab already exists, append to the existing object
        if (prev[id]) {
          return {
            ...prev,
            [id]: {
              ...prev[id],
              title: children,
              titleProps: { ...otherProps, id, activeClassName },
            },
          };
        }

        // Otherwise, create a new object with this ID
        return {
          ...prev,
          [id]: {
            title: children,
            titleProps: { ...otherProps, id, activeClassName },
          },
        };
      });
    }
  }, [id, children, setTabs, otherProps, activeClassName]);

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
