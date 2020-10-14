import React from 'react';
import makeClass from 'clsx';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { Source } from '@storybook/addon-docs/blocks';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const devices = ['iPad', 'iPhone', 'mac'] as const;
type Device = typeof devices[number];

interface DeviceProp {
  /** The device to render the story in */
  device?: 'iPad' | 'iPhone' | 'mac' | 'choose';
}

interface IsLandscape {
  /** Display the device in landscape mode */
  isLandscape?: boolean;
}

const DeviceSelect = styled.select`
  cursor: pointer;
  color: rgb(51, 51, 51);
  text-align: center;
  appearance: none;
  font-size: 12px;
  line-height: 16px;
  font-family: 'Nunito Sans', -apple-system, '.SFNSText-Regular',
    'San Francisco', BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Helvetica,
    Arial, sans-serif;
  font-weight: 700;
  padding: 4px 10px;
  background: rgb(255, 255, 255);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin: 20px 0;
  text-align-last: center;
`;

const InfoBar = styled.div`
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 25px 0 34px;
  font-size: 14px;
`;

const IframeLabel = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-top: 14px;

  > *:not(:last-child) {
    margin-right: 10px;
  }
`;

const ShowCodeButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: rgb(51, 51, 51);
  font-size: 12px;
  line-height: 16px;
  font-family: 'Nunito Sans', -apple-system, '.SFNSText-Regular',
    'San Francisco', BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Helvetica,
    Arial, sans-serif;
  font-weight: 700;
  margin-left: -1px;
  padding: 4px 10px;
  background: rgb(255, 255, 255);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

const ResponsiveStoryWrapper = styled.div`
  margin: 30px auto;
  display: flex;
  flex-direction: column;
`;

const Iframe = styled.iframe<IsLandscape & DeviceProp>`
  border: none;
  width: 100%;
  height: 100%;
  margin: auto;
  display: block;

  ${({ device, isLandscape }) => css`
    ${device === 'iPhone' &&
      isLandscape &&
      css`
        padding-left: 30px;
        box-sizing: border-box;
      `}

    ${device === 'mac' &&
      css`
        width: 1200px;
        height: 750px;
        transform: scale(0.8);
        transform-origin: 0 0;
      `}
  `}
`;

type DeviceProps = IsLandscape & {
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
  headerText
}: DeviceProps) => {
  const time = new Date(Date.now());

  return (
    <div
      className={makeClass(
        'marvel-device iphone-x',
        isLandscape && 'landscape'
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
          <InfoBar style={{ background: headerColor, color: headerText }}>
            <span>{`${time.getHours() % 12}:${time.getMinutes()}`}</span>
          </InfoBar>
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
      'marvel-device ipad silver',
      isLandscape && 'landscape'
    )}
  >
    <div className="camera" />
    <div className="screen">{children}</div>
    <div className="home" />
  </div>
);

/** A mock mac */
const Mac = ({ children }: DeviceProps) => (
  <div className="marvel-device macbook" style={{ transform: 'scale(0.88)' }}>
    <div className="top-bar" />
    <div className="camera" />
    <div className="screen">{children}</div>
    <div className="bottom-bar" />
  </div>
);

/** Show only a portion of the device */
function useTopOrBottom(top: number | undefined, bottom: number | undefined) {
  if (top) {
    return { height: top, overflowY: 'hidden' } as const;
  }

  if (bottom) {
    return {
      height: bottom,
      display: 'flex',
      alignItems: 'flex-end',
      overflowY: 'hidden'
    } as const;
  }

  return {};
}

const deviceMap: Record<Device, (props: DeviceProps) => JSX.Element> = {
  iPhone: IPhone,
  iPad: IPad,
  mac: Mac
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
    align?: 'start' | 'center' | 'end';
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

type ResponsiveStoryProps = ResponsiveStoryBaseProps | TopProps | BottomProps;

/** Render a story in an iframe so it's responsive */
export const ResponsiveStory = ({
  id,
  label,
  device = 'iPhone',
  isLandscape,
  align = 'start',
  headerColor,
  headerText,
  screenStyles = {},
  ...rest
}: ResponsiveStoryProps) => {
  const [open, setOpen] = React.useState(false);
  const [currentDevice, setCurrentDevice] = React.useState<Device>(
    device === 'choose' ? 'mac' : device
  );

  const Device = deviceMap[currentDevice];
  const top = 'top' in rest ? rest.top : undefined;
  const bottom = 'bottom' in rest ? rest.bottom : undefined;

  // TODO: should scale the device instead of scrolling?
  return (
    <ResponsiveStoryWrapper
      style={{
        alignItems: align === 'center' ? align : `flex-${align}`
      }}
    >
      <div>
        <div
          style={{
            overflowX:
              currentDevice === 'iPhone' && !isLandscape ? undefined : 'auto',
            padding: 10,
            maxWidth: '100vw',
            ...useTopOrBottom(top, bottom)
          }}
        >
          <Device
            isLandscape={isLandscape}
            headerColor={headerColor}
            headerText={headerText}
          >
            <Iframe
              title="Responsive preview"
              src={`${window.location.origin}${window.location.pathname.replace(
                'index.html',
                'iframe.html'
              )}?id=${id}`}
              isLandscape={isLandscape}
              device={currentDevice}
              style={screenStyles}
            />
          </Device>
        </div>

        <IframeLabel>
          {label && <i>{label}</i>}
          {device === 'choose' && (
            <DeviceSelect
              value={currentDevice}
              onChange={e => {
                setCurrentDevice(e.target.value as Device);
              }}
            >
              {devices.map(d => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </DeviceSelect>
          )}
          <ShowCodeButton type="button" onClick={() => setOpen(!open)}>
            {open ? 'Hide' : 'Show'} Code
          </ShowCodeButton>
        </IframeLabel>
      </div>
      {open && <Source id={id} />}
    </ResponsiveStoryWrapper>
  );
};

export default ResponsiveStory;
