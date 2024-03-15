"use client"

export function SoundButton() {
  const playSound = () => {
    console.log("Playing sound");

    const audio = new Audio("/completedTaskSound.mp3");
    audio.play();
  };

  return (
    <button className="btn btn-primary" onClick={playSound}>
      Primary
    </button>
  );
}
