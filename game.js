// import kaboom from './kaboom'

// make kaboom functions global
kaboom.global();

// init kaboom context
init({ fullscreen: true });

loadSprite("tank-blue", "tank-blue.png");
loadSprite("tank-red", "tank-red.png");
loadSprite("missile", "missile.png")

// define a scene
scene("main", () => {

  const walll = add([
    "wall",
    rect(10, height()),
    pos(0, 0),
    color(0, 0, 1),
    solid()
  ]);

  const wallr = add([
    "wall",
    rect(10, height()),
    pos(width() - 10, 0),
    color(0, 0, 1),
    solid()
  ]);

  const wallu = add([
    "wall",
    rect(width() - 20, 10),
    pos(10, 0),
    color(1, 0, 0),
    solid()
  ]);

  const walld = add([
    "wall",
    rect(width() - 20, 10),
    pos(10, height() - 10),
    color(1, 0, 0),
    solid()
  ]);

  const blue = add([
    sprite("tank-blue"),
    pos(50, 50),
    scale(0.3),
    rotate(0),
    origin("center"),
  ])

  blue.action(() => {
    blue.resolve()
  })

  const red = add([
    sprite("tank-red"),
    pos(600, 600),
    scale(0.3),
    rotate(Math.PI),
    origin("center")
  ])

  red.action(() => {
    red.resolve()
  })

  keyDown("a", () => {
    red.angle += dt() * 3
  })

  keyDown("s", () => {
    red.move(100 * Math.cos(red.angle), -100 * Math.sin(red.angle))
  })

  keyDown("d", () => {
    red.angle -= dt() * 3
  })

  keyDown("4", () => {
    blue.angle += dt() * 3
  })

  keyDown("6", () => {
    blue.angle -= dt() * 3
  })

  keyDown("5", () => {
    blue.move(100 * Math.cos(blue.angle), -100 * Math.sin(blue.angle))
  })

  keyPress("8", () => {
    add([
      sprite("missile"),
      pos(blue.pos),
      scale(0.1),
      rotate(blue.angle),
      origin("center"),
      color(0.3, 0.3, 1),
      "missile",
    ])
  })

  action("missile", (obj) => {
    obj.move(200 * Math.cos(obj.angle), -200 * Math.sin(obj.angle));
  });

  keyPress("w", () => {
    add([
      sprite("missile"),
      pos(red.pos),
      scale(0.1),
      rotate(red.angle),
      origin("center"),
      color(1, 0.3, 0.3),
      "missile",
    ])
  })
});


// start the game
start("main");