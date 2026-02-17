import React from 'react';
import { Player } from '@remotion/player';
import { N8nWorkflowComposition } from './N8nWorkflowComposition';
import { useTheme } from '../../context/ThemeContext';

/**
 * Embeds the Remotion N8N workflow animation inside the hero section.
 * Reads the current theme from ThemeContext and passes it as inputProps
 * so the animation adapts to dark/light mode automatically.
 */
const N8nWorkflowPlayer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Player
      component={N8nWorkflowComposition}
      durationInFrames={180}
      fps={30}
      compositionWidth={640}
      compositionHeight={360}
      style={{ width: '100%', height: '100%', display: 'block' }}
      loop
      autoPlay
      controls={false}
      inputProps={{ isDark: theme === 'dark' }}
    />
  );
};

export default N8nWorkflowPlayer;
