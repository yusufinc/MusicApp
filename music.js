class Music {
  constructor(title, singer, img, file) {
    this.title = title;
    this.singer = singer;
    this.img = img;
    this.file = file;
  }

  getName() {
    return `${this.title} - ${this.singer}`;
  }
}

const musicList = [
  new Music(
    "In my head",
    "Bedroom",
    "./img/bedroom-in-my-head.jpg",
    "./mp3/bedroom-in-my-head.mp3"
  ),
  new Music(
    "Wicked Game",
    "Chris Isaak",
    "./img/wicked-game.jpg",
    "./mp3/chris-isaak-wicked-game-s.mp3"
  ),
  new Music(
    "Nightcall Drive",
    "Kavinsky",
    "./img/nigthcall-drive.jpg",
    "./mp3/kavinsky-nightcall-drive-original-movie-soundtrack.mp3"
  ),
  new Music(
    "Bad Habit",
    "Steve Lacy",
    "./img/bad-habbit.jpg",
    "./mp3/steve-lacy-bad-habit.mp3"
  ),
  new Music(
    "Dark Red",
    "Steve Lacy",
    "./img/dark-red.jpg",
    "./mp3/steve-lacy-dark-red.mp3"
  ),
  new Music(
    "Everybody Wants to Rule the World",
    "Tears for Fears",
    "./img/every-body-want-to-rules-of-the-world.jpg",
    "./mp3/tears-for-fears-everybody-wants-to-rule-the-world.mp3"
  ),
  new Music(
    "Notion",
    "The Rare Occasions",
    "./img/notion-rare.jpg",
    "./mp3/the-rare-occasions-notion.mp3"
  ),
];
