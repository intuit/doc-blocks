/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { DesignSpec } from "@doc-blocks/design-spec";
import { Row } from "@doc-blocks/row";
import { Shield } from "@doc-blocks/shield";
import { ShieldRow } from "@doc-blocks/shield-row";
import { Story, Canvas } from "@storybook/addon-docs/blocks";
import styled from "@emotion/styled";
import LinkTo from "@storybook/addon-links/dist/esm/react";
import Markdown from "markdown-to-jsx";
import { css } from "emotion";
import useLayoutEffect from "use-isomorphic-layout-effect";

import { StorybookReference } from "./story-reference";
import { ComponentSpec } from "./types";

export const StoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;

  a {
    background-color: #eceef1;
    border-radius: 4px;
    color: #393a3d;
    margin-bottom: 12px;
    margin-right: 12px;
    padding: 6px 8px;
    text-decoration: none;

    &:hover,
    &:focus {
      background-color: #e3e5e8;
    }
  }
`;

let stories: Kind[];

interface Story {
  /** The name of a story */
  name: string;
}

interface Kind {
  /** The kind of story */
  kind: string;
  /** the stories in the kind */
  stories: Story[];
}

/** Get all the stories in the storybook */
const getStories = () => {
  if (!stories) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-underscore-dangle
    stories = (window as any).__STORYBOOK_CLIENT_API__.getStorybook();
  }

  return stories;
};

interface StoryInclusionProps {
  /** Story to make the component title link to */
  titleStory?: string;
  /** Story name to include as the story in the gallery */
  includedStoryNames?: string[];
  /** Story name to not include as the story in the gallery */
  excludedStoryNames?: string[];
  /** Storybook folder path that matched stories should live in. */
  matchPath?: string;
}

interface GalleryItemProps extends Exclude<StoryInclusionProps, "matchPath"> {
  /** The name of the component to display a gallery for */
  name: string;
  /** The kind to display a gallery item for */
  kind: Kind;
}

/** A component showcase */
export const GalleryItem = ({
  name,
  includedStoryNames = ["Basic"],
  excludedStoryNames = [],
  kind,
  titleStory,
}: GalleryItemProps) => {
  const firstStory =
    kind.stories.find((s) => includedStoryNames.includes(s.name)) ||
    kind.stories.find((s) => !excludedStoryNames.includes(s.name)) ||
    kind.stories[0];

  const firstStoryId = `${kind.kind
    .replace(/\//g, "-")
    .replace(/\s+-\s+/g, "-")
    .replace(/\s/g, "-")
    .toLowerCase()}--${firstStory.name.replace(/[\s\\/]/g, "-").toLowerCase()}`;

  const designSpec = ((process.env
    .DESIGN_SPECS as any) as ComponentSpec[]).find(
    (spec) => spec.name === name
  );
  const category = kind.kind.split("/")[0];
  const renderShieldRow =
    (designSpec?.type && designSpec.url) ||
    category === "Utilities" ||
    category === "Experimental";

  return (
    <Row
      className={css`
        grid-template-columns: initial;
        align-items: flex-start;

        @media (min-width: 768px) {
          grid-template-columns: 1fr 2fr;
        }
      `}
    >
      <div>
        <h2 className={name[0]}>
          <StorybookReference
            kind={`${category} - ${name}`}
            story={titleStory || firstStory.name}
            style={{ color: "#393a3d" }}
          >
            {name}
          </StorybookReference>
        </h2>

        {renderShieldRow && (
          <ShieldRow>
            {designSpec?.type && designSpec.url && (
              <DesignSpec type={designSpec.type} url={designSpec.url} />
            )}
            {category === "Utilities" && (
              <Shield color="#0077c5" label="Type" message="Utility" />
            )}
            {category === "Experimental" && (
              <Shield color="#ff6a00" label="Type" message="Experimental" />
            )}
          </ShieldRow>
        )}

        {designSpec?.description && (
          <p>
            <Markdown>{designSpec.description}</Markdown>
          </p>
        )}
        <StoryWrapper>
          {kind.stories.map((story) => (
            <LinkTo
              key={`${kind.kind}-${story.name}`}
              kind={kind.kind}
              story={story.name}
            >
              {story.name}
            </LinkTo>
          ))}
        </StoryWrapper>
      </div>

      <Canvas>
        <Story id={firstStoryId} />
      </Canvas>
    </Row>
  );
};

export const Alphabet = styled.div`
  position: sticky;
  top: 24px;
  max-height: calc(100vh - 50px);
  overflow-y: auto;
  margin-top: 40px;
  padding-right: 8px;
`;

interface CharacterProps {
  /** Whether the character is disabled */
  disabled: boolean;
}

export const Character = styled.div`
  box-sizing: content-box;
  color: #6b6c72;
  display: grid;
  grid-gap: 8px;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 1rem;
  padding: 4px;
  line-height: 1.4rem;
  height: 1.4rem;
  font-size: 1rem;
  cursor: pointer;
  transition: font-size 0.1s ease-in;

  ${(props: CharacterProps) =>
    props.disabled
      ? `cursor: not-allowed;
      opacity: .4;
      `
      : `
        &:hover,
        &:focus {
          color: #1e1e1e;
          font-size: 1.3rem;
        }
      `}
`;

interface AlphabetNavigationProps {
  /** All the stories in the gallery */
  stories: Kind[];
}

/** Jump between gallery items */
const AlphabetNavigation = (props: AlphabetNavigationProps) => {
  const chars = React.useMemo(() => {
    const usedCharacters = new Set(
      props.stories.map((story) => {
        return story.kind.split("/")[1][0];
      })
    );
    const items: React.ReactNode[] = [];

    for (let charCode = 65; charCode <= 90; charCode++) {
      const char = String.fromCharCode(charCode);

      items.push(
        <Character
          key={char}
          disabled={!usedCharacters.has(char)}
          onClick={() =>
            document
              .querySelector(`.${char}`)
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {char}
        </Character>
      );
    }

    return items;
  }, [props.stories]);

  return (
    <div>
      <Alphabet>{chars}</Alphabet>
    </div>
  );
};

interface GalleryProps extends StoryInclusionProps {
  /** Components to not include in the gallery */
  excludedComponents?: string[];
}

/** Show all possible gallery items */
export const Gallery = ({
  excludedComponents = [],
  excludedStoryNames,
  includedStoryNames,
  matchPath = "",
  titleStory,
}: GalleryProps) => {
  const [allStories, setAllStories] = React.useState<Kind[]>([]);
  const items = React.useMemo(() => {
    return allStories
      .sort((a, b) => a.kind.split("/")[1].localeCompare(b.kind.split("/")[1]))
      .map((component) => {
        const name = component.kind.split("/")[1];
        return (
          <GalleryItem
            key={name}
            name={name}
            kind={component}
            titleStory={titleStory}
            excludedStoryNames={excludedStoryNames}
            includedStoryNames={includedStoryNames}
          />
        );
      });
  }, [allStories, includedStoryNames, excludedStoryNames, titleStory]);

  useLayoutEffect(() => {
    setAllStories(
      getStories().filter(
        (item) =>
          (item.kind.endsWith(matchPath) ||
            item.kind.match(new RegExp(matchPath))) &&
          !excludedComponents.some((i) => item.kind.includes(i))
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={css`
        display: grid;
        grid-gap: 60px;
        grid-template-columns: 1fr auto;
      `}
    >
      <div>{items}</div>
      <AlphabetNavigation stories={allStories} />
    </div>
  );
};
