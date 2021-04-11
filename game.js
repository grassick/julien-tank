// make kaboom functions global
kaboom.global();

// init kaboom context
init({ fullscreen: true });

loadSprite("tank-blue", "tank-blue.png");
loadSprite("tank-red", "tank-red.png");

// define a scene
scene("main", () => {

  const wallL = add([
    "wall",
    rect(10, height()),
    pos(0, 0),
    color(0, 0, 1),
    solid()
  ]);
  const wallr = add([
    "wall",
    rect(10, height()),
    pos(width()-10, 0),
    color(0, 0, 1),
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
    rotate(0),
    origin("center")
  ])

  red.action(() => {
    red.resolve()
   })

  keyDown("a", () => {
    red.angle += dt()*3
  })
  keyDown("s", () => {
    red.move(-100 * Math.cos(red.angle), +100* Math.sin(red.angle))
  })

  keyDown("d", () => {
    red.angle -= dt()*3
  })


 keyDown("4", () => {
    blue.angle += dt()*3
  })


  keyDown("6", () => {
    blue.angle -= dt()*3
  })

  keyDown("5", () => {
    blue.move(100 * Math.cos(blue.angle), -100* Math.sin(blue.angle))
  })
});



// start the game
start("main");