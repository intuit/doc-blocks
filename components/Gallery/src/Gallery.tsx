/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { DesignSpec } from '@doc-blocks/design-spec';
import { Row } from '@doc-blocks/row';
import { Shield } from '@doc-blocks/shield';
import { ShieldRow } from '@doc-blocks/shield-row';
import { Story, Canvas } from '@storybook/addon-docs/blocks';
import styled from '@emotion/styled';
import LinkTo from '@storybook/addon-links/dist/react';
import Markdown from 'markdown-to-jsx';
import { css } from 'emotion';
import useLayoutEffect from 'use-isomorphic-layout-effect';

import { StorybookReference } from './story-reference';
import { ComponentSpec } from './types';

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
  /** Story name to include as the story in the gallery */
  includedStoryNames?: string[];
  /** Story name to not include as the story in the gallery */
  excludedStoryNames?: string[];
  /** Storybook folder path that matched stories should live in. */
  matchPath?: string;
}

interface GalleryItemProps extends StoryInclusionProps {
  /** The name of the component to display a gallery for */
  name: string;
}

/** A component showcase */
export const GalleryItem = ({
  name,
  includedStoryNames = ['Basic'],
  excludedStoryNames = [],
  matchPath = '',
}: GalleryItemProps) => {
  const allStories = getStories();
  const features = allStories.filter((item) =>
    item.kind.includes(`/${name}${matchPath}`)
  )[0];

  if (!features) {
    return null;
  }

  const firstStory =
    features.stories.find((s) => includedStoryNames.includes(s.name)) ||
    features.stories.find((s) => !excludedStoryNames.includes(s.name)) ||
    features.stories[0];

  const firstStoryId = `${features.kind
    .replace(/\//g, '-')
    .replace(/\s+-\s+/g, '-')
    .replace(/\s/g, '-')
    .toLowerCase()}--${firstStory.name.replace(/[\s\\/]/g, '-').toLowerCase()}`;

  const designSpec = ((process.env
    .DESIGN_SPECS as any) as ComponentSpec[]).find(
    (spec) => spec.name === name
  );
  const category = features.kind.split('/')[0];
  const renderShieldRow =
    (designSpec?.type && designSpec.url) ||
    category === 'Utilities' ||
    category === 'Experimental';

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
            story="Overview"
            style={{ color: '#393a3d' }}
          >
            {name}
          </StorybookReference>
        </h2>

        {renderShieldRow && (
          <ShieldRow>
            {designSpec?.type && designSpec.url && (
              <DesignSpec type={designSpec.type} url={designSpec.url} />
            )}
            {category === 'Utilities' && (
              <Shield color="#0077c5" label="Type" message="Utility" />
            )}
            {category === 'Experimental' && (
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
          {features.stories.map((story) => (
            <LinkTo
              key={`${features.kind}-${story.name}`}
              kind={features.kind}
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
  position: fixed;
  right: 64px;
  top: 50%;
  transform: translateY(-50%);
`;

interface CharacterProps {
  /** Whether the character is disabled */
  disabled: boolean;
}

export const Character = styled.div`
  color: #8d9096;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  padding: 4px 0;
  height: 1rem;
  font-size: 1rem;
  transition: font-size 0.3s ease-in-out, height 0.2s linear;
  cursor: pointer;

  ${(props: CharacterProps) =>
    props.disabled
      ? 'cursor: no-drop;'
      : `
        &:hover,
        &:focus {
          color: #6b6c72;
          font-size: 2rem;
          height: 2rem;
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
        return story.kind.split('/')[1][0];
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
              ?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          {char}
        </Character>
      );
    }

    return items;
  }, [props.stories]);

  return <Alphabet>{chars}</Alphabet>;
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
  matchPath = '',
}: GalleryProps) => {
  const [allStories, setAllStories] = React.useState<Kind[]>([]);
  const items = React.useMemo(() => {
    return allStories
      .sort((a, b) => a.kind.split('/')[1].localeCompare(b.kind.split('/')[1]))
      .map((component) => {
        const name = component.kind.split('/')[1];
        return (
          <GalleryItem
            key={name}
            name={name}
            matchPath={matchPath}
            excludedStoryNames={excludedStoryNames}
            includedStoryNames={includedStoryNames}
          />
        );
      });
  }, [allStories, includedStoryNames, excludedStoryNames, matchPath]);

  useLayoutEffect(() => {
    setAllStories(
      getStories().filter(
        (item) =>
          item.kind.endsWith(matchPath) &&
          !excludedComponents.some((i) => item.kind.includes(i))
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <AlphabetNavigation stories={allStories} />
      {items}
    </div>
  );
};
