# Audio Controller with Labels, Independent Volume Control, and Zustand State Management

This audio system provides comprehensive sound management with labels, independent volume control, JSON-based configuration with Zod validation, and Zustand state management with localStorage persistence.

## Features

- **Labels**: Each sound has a descriptive label for better identification
- **Independent Volume Control**: Control volume for each sound individually
- **Master Volume Control**: Global volume control that affects all sounds
- **JSON Configuration**: Define sounds in JSON format with validation
- **Zod Validation**: Automatic validation of audio configurations
- **Zustand State Management**: Centralized state management with persistence
- **localStorage Persistence**: Audio settings automatically saved and restored
- **TypeScript Support**: Full type safety with TypeScript
- **React Hook**: Easy integration with React components
- **Backward Compatibility**: Existing code continues to work

## Files Overview

### Core Files

- `src/audio/soundManager.ts` - Enhanced SoundManager with labels and independent volume control
- `src/audio/sound.ts` - Sound definitions and helper functions
- `src/audio/audioConfig.ts` - JSON configuration schema and utilities
- `src/audio/audioConfig.json` - Example JSON configuration
- `src/stores/audioStore.ts` - Zustand store with localStorage persistence
- `src/hooks/useAudioController.tsx` - Original React hook for audio management
- `src/hooks/useEnhancedAudioController.tsx` - Enhanced hook with Zustand integration
- `src/components/AudioInitializer.tsx` - Component for initializing audio on app load
- `src/components/AudioControllerExample.tsx` - Example component demonstrating usage
- `src/components/AudioAppExample.tsx` - Complete integration example

## Usage

### Using Enhanced React Hook with Zustand

```typescript
import { useEnhancedAudioController } from '../hooks/useEnhancedAudioController';

const MyComponent = () => {
    const {
        masterVolume,
        isMuted,
        sounds,
        setMasterVolume,
        toggleMute,
        setSoundVolume,
        playSound,
        resetToDefaults,
    } = useEnhancedAudioController();

    return (
        <div>
            <button onClick={() => playSound('click')}>Play Click</button>
            <input
                type="range"
                min="0"
                max="1"
                value={masterVolume}
                onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
            />
            <button onClick={toggleMute}>{isMuted ? 'Unmute' : 'Mute'}</button>
            <button onClick={resetToDefaults}>Reset to Defaults</button>
        </div>
    );
};
```

### App Integration with AudioInitializer

```typescript
import React from 'react';
import { AudioInitializer } from './components/AudioInitializer';
import { App } from './App';

// Wrap your entire app with AudioInitializer
const RootApp = () => (
    <AudioInitializer>
        <App />
    </AudioInitializer>
);

export default RootApp;
```

### Basic Usage

```typescript
import { playSound, setSoundVolume, setMasterVolume } from '../audio/sound';

// Play a sound
playSound('click');

// Set individual sound volume (0-1)
setSoundVolume('click', 0.5);

// Set master volume (0-1)
setMasterVolume(0.7);
```

### Using the React Hook

```typescript
import { useAudioController } from '../hooks/useAudioController';

const MyComponent = () => {
    const {
        masterVolume,
        isMuted,
        sounds,
        setMasterVolume,
        toggleMute,
        setSoundVolume,
        playSound,
    } = useAudioController();

    return (
        <div>
            <button onClick={() => playSound('click')}>Play Click</button>
            <input
                type="range"
                min="0"
                max="1"
                value={masterVolume}
                onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
            />
        </div>
    );
};
```

### JSON Configuration

```json
{
    "masterVolume": 0.5,
    "sounds": {
        "click": {
            "label": "Click Sound",
            "src": ["/sfx/click.ogg", "/sfx/click.mp3"],
            "volume": 0.25,
            "loop": false,
            "autoplay": false,
            "preload": true,
            "html5": false,
            "pool": 5
        }
    }
}
```

### Validation with Zod

```typescript
import { AudioConfigManager } from '../audio/audioConfig';

// Validate a configuration
const config = AudioConfigManager.validateConfig(jsonData);

// Create config from JSON string
const config = AudioConfigManager.createConfigFromJSON(jsonString);

// Merge configurations
const merged = AudioConfigManager.mergeConfigs(baseConfig, override);
```

## AudioConfig Schema

```typescript
interface AudioConfig {
    label: string; // Human-readable label
    src: string[]; // Array of audio file paths
    volume: number; // Volume (0-1)
    loop?: boolean; // Whether to loop the sound
    autoplay?: boolean; // Whether to autoplay
    preload?: boolean; // Whether to preload
    html5?: boolean; // Whether to use HTML5 audio
    pool?: number; // Number of audio instances
}
```

## API Reference

### SoundManager Methods

-   `createSound(id: string, config: AudioConfig): Howl` - Create a new sound
-   `setMasterVolume(volume: number): void` - Set master volume
-   `getMasterVolume(): number` - Get master volume
-   `setIndividualVolume(id: string, volume: number): void` - Set individual sound volume
-   `getIndividualVolume(id: string): number` - Get individual sound volume
-   `getSoundLabel(id: string): string` - Get sound label
-   `getSoundConfig(id: string): AudioConfig | undefined` - Get sound configuration
-   `getAllSounds(): Array<{id, config, individualVolume}>` - Get all sounds
-   `mute(): void` - Mute all sounds
-   `unmute(): void` - Unmute all sounds
-   `toggleMute(): void` - Toggle mute state

### Helper Functions

-   `playSound(id: string): void` - Play a sound
-   `setSoundVolume(id: string, volume: number): void` - Set sound volume
-   `getSoundVolume(id: string): number` - Get sound volume
-   `getSoundLabel(id: string): string` - Get sound label
-   `getSoundConfig(id: string): AudioConfig | undefined` - Get sound config
-   `getAllSounds(): SoundInfo[]` - Get all sounds
-   `setMasterVolume(volume: number): void` - Set master volume
-   `getMasterVolume(): number` - Get master volume
-   `toggleMute(): void` - Toggle mute
-   `isMuted(): boolean` - Check if muted

## Migration from Old System

The new system is backward compatible. Existing code using `sounds.click.play()` will continue to work.

### Old Code

```typescript
import { sounds } from '../audio/sound';
sounds.click.play();
```

### New Code

```typescript
import { playSound } from '../audio/sound';
playSound('click');
```

## Example Component

See `src/components/AudioControllerExample.tsx` for a complete example showing:

-   Master volume control
-   Individual sound volume controls
-   Sound playback
-   Real-time volume display
-   Debug information

## Validation

All audio configurations are validated using Zod schemas. Invalid configurations will throw descriptive errors.

```typescript
// This will throw an error if invalid
const config = AudioConfigManager.validateConfig({
    masterVolume: 1.5, // Error: Volume must be at most 1
    sounds: {},
});
```

## Performance Considerations

-   Sounds are preloaded by default for better performance
-   Web Audio API is used by default for lower latency
-   Pool size can be configured for rapid succession sounds
-   Individual volume calculations are optimized

## Browser Support

-   Modern browsers with Web Audio API support
-   Falls back to HTML5 audio when needed
-   Multiple audio formats supported (OGG, MP3, etc.)
