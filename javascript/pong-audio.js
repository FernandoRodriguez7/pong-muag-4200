// SoundFile class handles audio files with playback, stopping, and deferred loading
class soundFile {
  constructor(file, deferPlay) {
    // Create a new Tone.Player instance and connect it to the master output
    this.player = new Tone.Player({
      url: "./sounds/" + file, // Load the specified sound file
      loop: false, // Don't loop by default
      autostart: false // Don't play automatically
    }).toMaster(); // Route output to master volume
  }

  play() {
    // Check if the audio file is loaded
    if (this.player.loaded === true) {
      // Reset deferred playback and ensure the sound starts over cleanly
      this.deferPlay = false;
      this.player.stop(); // Stop if already playing
      this.player.start(); // Start playback
    } else {
      // Flag the file to play once loading finishes
      this.deferPlay = true;
    }
  }

  stop() {
    // Stop playback immediately (if it's playing)
    this.player.stop();
  }
}

// Attempt to play any deferred sounds in the array
export function playDeferredSounds() {
  for (var i = 0; i < soundArray.length; i++) {
    if (soundArray[i].deferPlay === true) {
      soundArray[i].play(); // Try playing the sound again
    }
  }
}

// Master array of all loaded sounds
export var soundArray = [];

// Wall sound (e.g., hitting the wall in the game)
export var wallSound = new soundFile("silence.mp3"); // Placeholder file
soundArray.push(wallSound); // Add to the sound list

// Paddle sound (e.g., hitting the paddle in the game)
export var paddleSound = new soundFile(
  Math.random() < 0.5 ? "Fuiftoo.mp3" : "Weien.mp3"
);
soundArray.push(paddleSound);

// Score sound (e.g., scoring a point)
export var scoreSound = new soundFile("silence.mp3");
soundArray.push(scoreSound);

// Ambient background sound, looped
export var ambientSound = new soundFile("START_Tonic.mp3");
soundArray.push(ambientSound);
ambientSound.player.loop = true; // Loop playback
ambientSound.player.volume.value = 0; // Start muted (adjust as needed)

// Adventure music, looped
export var adventureMusic = new soundFile("silence.mp3");
soundArray.push(adventureMusic);
adventureMusic.player.loop = true;
adventureMusic.player.volume.value = 1; // Normal volume level

// Village music, looped at a softer volume
export var villageMusic = new soundFile("silence.mp3");
soundArray.push(villageMusic);
villageMusic.player.loop = true;
villageMusic.player.volume.value = -16; // Lower volume for subtle background
