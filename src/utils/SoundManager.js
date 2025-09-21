/**
 * Sound Management Utility
 * Centralizes sound loading, playing, and cleanup
 */

export class SoundManager {
  constructor() {
    this.sounds = new Map();
    this.volume = 1.0;
    this.muted = false;
  }

  /**
   * Create a new Howl sound instance
   */
  createSound(id, src, options = {}) {
    const defaultOptions = {
      preload: true,
      volume: this.volume,
      loop: false,
      autoplay: false,
      onload: () => console.log(`Sound ${id} loaded successfully`),
      onloaderror: (soundId, error) => console.error(`Failed to load sound ${id}:`, error)
    };

    const sound = new Howl({
      src: Array.isArray(src) ? src : [src],
      ...defaultOptions,
      ...options
    });

    this.sounds.set(id, sound);
    return sound;
  }

  /**
   * Create a simple Audio element sound
   */
  createAudioSound(id, src) {
    const audio = new Audio(src);
    audio.volume = this.volume;

    this.sounds.set(id, audio);
    return audio;
  }

  /**
   * Play a sound by ID
   */
  play(id, options = {}) {
    if (this.muted) return;

    const sound = this.sounds.get(id);
    if (!sound) {
      console.warn(`Sound ${id} not found`);
      return;
    }

    try {
      if (sound instanceof Howl) {
        // Reset position if needed
        if (options.restart) {
          sound.seek(0);
        }
        sound.play();
      } else if (sound instanceof Audio) {
        if (options.restart) {
          sound.currentTime = 0;
        }
        sound.play();
      }
    } catch (error) {
      console.error(`Failed to play sound ${id}:`, error);
    }
  }

  /**
   * Stop a sound by ID
   */
  stop(id) {
    const sound = this.sounds.get(id);
    if (sound) {
      try {
        if (sound instanceof Howl) {
          sound.stop();
        } else if (sound instanceof Audio) {
          sound.pause();
          sound.currentTime = 0;
        }
      } catch (error) {
        console.error(`Failed to stop sound ${id}:`, error);
      }
    }
  }

  /**
   * Set volume for all sounds
   */
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));

    this.sounds.forEach((sound, id) => {
      try {
        if (sound instanceof Howl) {
          sound.volume(this.volume);
        } else if (sound instanceof Audio) {
          sound.volume = this.volume;
        }
      } catch (error) {
        console.error(`Failed to set volume for sound ${id}:`, error);
      }
    });
  }

  /**
   * Mute/unmute all sounds
   */
  setMuted(muted) {
    this.muted = muted;

    this.sounds.forEach((sound, id) => {
      try {
        if (sound instanceof Howl) {
          sound.mute(muted);
        } else if (sound instanceof Audio) {
          sound.muted = muted;
        }
      } catch (error) {
        console.error(`Failed to ${muted ? 'mute' : 'unmute'} sound ${id}:`, error);
      }
    });
  }

  /**
   * Remove a sound and cleanup
   */
  removeSound(id) {
    const sound = this.sounds.get(id);
    if (sound) {
      try {
        if (sound instanceof Howl) {
          sound.unload();
        } else if (sound instanceof Audio) {
          sound.pause();
          sound.src = '';
        }
        this.sounds.delete(id);
      } catch (error) {
        console.error(`Failed to remove sound ${id}:`, error);
      }
    }
  }

  /**
   * Cleanup all sounds
   */
  cleanup() {
    this.sounds.forEach((sound, id) => {
      this.removeSound(id);
    });
    this.sounds.clear();
  }

  /**
   * Get all loaded sound IDs
   */
  getSoundIds() {
    return Array.from(this.sounds.keys());
  }

  /**
   * Check if a sound is loaded
   */
  hasSound(id) {
    return this.sounds.has(id);
  }

  /**
   * Preload multiple sounds
   */
  async preloadSounds(soundConfigs) {
    const promises = soundConfigs.map(config => {
      return new Promise((resolve, reject) => {
        const sound = this.createSound(config.id, config.src, {
          ...config.options,
          onload: () => resolve(config.id),
          onloaderror: () => reject(new Error(`Failed to load ${config.id}`))
        });
      });
    });

    try {
      await Promise.allSettled(promises);
    } catch (error) {
      console.warn('Some sounds failed to preload:', error);
    }
  }
}

// Create singleton instance
export const soundManager = new SoundManager();