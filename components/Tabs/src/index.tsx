import React, { useEffect } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

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
      <div
        css={css`
          width: 100%;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
          `}
        >
          {Object.entries(tabs).map(([id, tab]) => (
            <div
              key={id}
              css={css`
                padding: 8px 16px;
                cursor: pointer;
                ${id === selectedId
                  ? "border-bottom: 1px solid #000000;"
                  : `&:hover {
                      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
                  }`}
              `}
              role="button"
              tabIndex={0}
              className={`${tab.titleProps?.className} ${
                id === selectedId ? tab.titleProps?.activeClassName : ""
              }`}
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
              css={css`
                padding: 16px 32px;
              `}
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
            [id]: {
              ...prev[id],
              title: children,
              titleProps: { ...otherProps, id },
            },
          };
        }

        // Otherwise, create a new object with this ID
        return {
          ...prev,
          [id]: { title: children, titleProps: { ...otherProps, id } },
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
