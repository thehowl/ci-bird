const coreContribs = [
  53785, 92280, 94029, 894299, 1196465, 1999543, 2497668, 4681308, 5792239,
  6007578, 6023117, 6550035, 7227529, 7622257, 7917064, 8089712, 8671905,
  16712663, 17755587, 18395154, 33522493, 37345040, 37576387, 74406335,
  90544084, 91573967, 104744707, 117160070, 127941206,
];

var game = {
  data: {
    score: 0,
    steps: 0,
    start: false,
    newHiScore: false,
    muted: false,
  },

  resources: [
    // images
    { name: "bg", type: "image", src: "data/img/bg.png" },
    {
      name: "clumsy",
      type: "image",
      src:
        "https://avatars.githubusercontent.com/u/" +
        coreContribs[Math.floor(Math.random() * coreContribs.length)] +
        "?s=60&v=4",
    },
    { name: "pipe-1", type: "image", src: "data/img/pipe-1.png" },
    { name: "pipe-2", type: "image", src: "data/img/pipe-2.png" },
    { name: "pipe-3", type: "image", src: "data/img/pipe-3.png" },
    { name: "logo", type: "image", src: "data/img/logo.png" },
    { name: "ground", type: "image", src: "data/img/ground.png" },
    { name: "gameover", type: "image", src: "data/img/gameover.png" },
    { name: "gameoverbg", type: "image", src: "data/img/gameoverbg.png" },
    { name: "hit", type: "image", src: "data/img/hit.png" },
    { name: "getready", type: "image", src: "data/img/getready.png" },
    { name: "new", type: "image", src: "data/img/new.png" },
    { name: "share", type: "image", src: "data/img/share.png" },
    { name: "tweet", type: "image", src: "data/img/tweet.png" },
    // sounds
    { name: "theme", type: "audio", src: "data/bgm/" },
    { name: "hit", type: "audio", src: "data/sfx/" },
    { name: "lose", type: "audio", src: "data/sfx/" },
    { name: "wing", type: "audio", src: "data/sfx/" },
  ],

  onload: function () {
    if (
      !me.video.init(1280, 720, {
        wrapper: "screen",
        scale: "auto",
        scaleMethod: "fit",
      })
    ) {
      alert("Your browser does not support HTML5 canvas.");
      return;
    }
    me.audio.init("mp3,ogg");
    me.loader.preload(game.resources, this.loaded.bind(this));
  },

  loaded: function () {
    me.state.set(me.state.MENU, new game.TitleScreen());
    me.state.set(me.state.PLAY, new game.PlayScreen());
    me.state.set(me.state.GAME_OVER, new game.GameOverScreen());

    me.input.bindKey(me.input.KEY.SPACE, "fly", true);
    me.input.bindKey(me.input.KEY.M, "mute", true);
    me.input.bindPointer(me.input.KEY.SPACE);

    me.pool.register("clumsy", game.BirdEntity);
    me.pool.register("pipe-1", game.Pipe1Entity, true);
    me.pool.register("pipe-2", game.Pipe2Entity, true);
    me.pool.register("pipe-3", game.Pipe3Entity, true);
    me.pool.register("hit", game.HitEntity, true);
    me.pool.register("ground", game.Ground, true);

    me.state.change(me.state.MENU);
  },
};
