/* eslint-disable react/no-unused-prop-types */

import React from "react";
import makeClass from "clsx";
import { Source } from "@storybook/addon-docs";

import styles from "./ResponsiveStory.module.css";
import "./devices.min.css";

const devices = ["iPad", "iPhone", "mac"] as const;
type Device = typeof devices[number];

interface DeviceProp {
  /** The device to render the story in */
  device?: "iPad" | "iPhone" | "mac" | "choose";
}

interface IsLandscape {
  /** Display the device in landscape mode */
  isLandscape?: boolean;
}

export type DeviceProps = IsLandscape & {
  /** The content to display in the device screen */
  children: React.ReactNode;
  /** Color to make iOS header */
  headerColor?: string;
  /** Color to make iOS header text */
  headerText?: string;
};

/** A mock iPhone */
const IPhone = ({
  children,
  isLandscape,
  headerColor,
  headerText,
}: DeviceProps) => {
  const time = new Date(Date.now());

  return (
    <div
      className={makeClass(
        "marvel-device iphone-x",
        isLandscape && "landscape"
      )}
    >
      <div className="notch">
        <div className="camera" />
        <div className="speaker" />
      </div>
      <div className="top-bar" />
      <div className="sleep" />
      <div className="bottom-bar" />
      <div className="volume" />
      <div className="overflow">
        <div className="shadow shadow--tr" />
        <div className="shadow shadow--tl" />
        <div className="shadow shadow--br" />
        <div className="shadow shadow--bl" />
      </div>
      <div className="inner-shadow" />
      <div className="screen">
        {!isLandscape && (
          <div
            className={styles.infoBar}
            style={{ background: headerColor, color: headerText }}
          >
            <span>{`${time.getHours() % 12}:${time.getMinutes()}`}</span>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

/** A mock iPad */
const IPad = ({ children, isLandscape }: DeviceProps) => (
  <div
    className={makeClass(
      "marvel-device ipad silver",
      isLandscape && "landscape"
    )}
  >
    <div className="camera" />
    <div className="screen">{children}</div>
    <div className="home" />
  </div>
);

/** A mock mac */
const Mac = ({ children }: DeviceProps) => (
  <div className="marvel-device macbook" style={{ transform: "scale(0.88)" }}>
    <div className="top-bar" />
    <div className="camera" />
    <div className="screen">{children}</div>
    <div className="bottom-bar" />
  </div>
);

/** Show only a portion of the device */
function useTopOrBottom(top: number | undefined, bottom: number | undefined) {
  if (top) {
    return { height: top, overflowY: "hidden" } as const;
  }

  if (bottom) {
    return {
      height: bottom,
      display: "flex",
      alignItems: "flex-end",
      overflowY: "hidden",
    } as const;
  }

  return {};
}

const deviceMap: Record<Device, (props: DeviceProps) => JSX.Element> = {
  iPhone: IPhone,
  iPad: IPad,
  mac: Mac,
};

type ResponsiveStoryBaseProps = IsLandscape &
  DeviceProp & {
    /** The id of the story to render */
    id: string;
    /** An optional label to put below the story */
    label?: string;
    /** Display the device in landscape mode */
    isLandscape?: boolean;
    /** How to align the story */
    align?: "start" | "center" | "end";
    /** Color to make iOS header */
    headerColor?: string;
    /** Color to make iOS header text */
    headerText?: string;
    /** Styles to add to the device wrapper. */
    screenStyles?: React.CSSProperties;
  };

interface TopProps extends ResponsiveStoryBaseProps {
  /** A number x between 1-100 to show only the top x% of the device  */
  top: number;
}

interface BottomProps extends ResponsiveStoryBaseProps {
  /** A number x between 1-100 to show only the top x% of the device  */
  bottom: number;
}

export type ResponsiveStoryProps =
  | ResponsiveStoryBaseProps
  | TopProps
  | BottomProps;

/** Render a story in an iframe so it's responsive */
export const ResponsiveStory = ({
  id,
  label,
  device = "iPhone",
  isLandscape,
  align = "start",
  headerColor,
  headerText,
  screenStyles = {},
  ...rest
}: ResponsiveStoryProps) => {
  const [open, setOpen] = React.useState(false);
  const [currentDevice, setCurrentDevice] = React.useState<Device>(
    device === "choose" ? "mac" : device
  );

  const DeviceComponent = deviceMap[currentDevice];
  const top = "top" in rest ? rest.top : undefined;
  const bottom = "bottom" in rest ? rest.bottom : undefined;

  const iframeClasses = makeClass(
    styles.iframe,
    currentDevice === "iPhone" && isLandscape && styles.iframeIphoneLandscape,
    currentDevice === "mac" && styles.iframeMac
  );

  return (
    <div
      className={styles.responsiveStoryWrapper}
      style={{
        alignItems: align === "center" ? align : `flex-${align}`,
      }}
    >
      <div>
        <div
          style={{
            overflowX:
              currentDevice === "iPhone" && !isLandscape ? undefined : "auto",
            padding: 10,
            maxWidth: "100vw",
            ...useTopOrBottom(top, bottom),
          }}
        >
          <DeviceComponent
            isLandscape={isLandscape}
            headerColor={headerColor}
            headerText={headerText}
          >
            <iframe
              className={iframeClasses}
              title="Responsive preview"
              src={`${window.location.origin}${window.location.pathname.replace(
                "index.html",
                "iframe.html"
              )}?id=${id}`}
              style={screenStyles}
            />
          </DeviceComponent>
        </div>

        <div className={styles.iframeLabel}>
          {label && <i>{label}</i>}
          {device === "choose" && (
            <select
              className={styles.deviceSelect}
              value={currentDevice}
              onChange={(e) => {
                setCurrentDevice(e.target.value as Device);
              }}
            >
              {devices.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          )}
          <button
            className={styles.showCodeButton}
            type="button"
            onClick={() => setOpen(!open)}
          >
            {open ? "Hide" : "Show"} Code
          </button>
        </div>
      </div>
      {open && <Source of={id} />}
    </div>
  );
};
