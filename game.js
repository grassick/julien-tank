// import kaboom from './kaboom'

// make kaboom functions global
kaboom.global();

// init kaboom context
init({ fullscreen: true });

loadSprite("tank-blue", "tank-blue.png")
loadSprite("tank-red", "tank-red.png")
loadSprite("missile", "missile.png")
loadSprite("explosion", "exp2_0.png", {
  sliceX: 4,
  sliceY: 4,
  anims: {
    boom: [0, 15]
  }
})


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
    "tankblue",
    sprite("tank-blue"),
    pos(50, 50),
    scale(0.3),
    rotate(0),
    origin("center"),
    solid()
  ])

  blue.action(() => {
    blue.resolve()
  })

  const red = add([
    "tankred",
    sprite("tank-red"),
    pos(600, 600),
    scale(0.3),
    rotate(Math.PI),
    origin("center"),
    solid()
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

  keyDown("x", () => {
    red.move(-100 * Math.cos(red.angle), +100 * Math.sin(red.angle))
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

  keyDown("2", () => {
    blue.move(-100 * Math.cos(blue.angle), +100 * Math.sin(blue.angle))
  })

  keyPress("8", () => {
    if (blue.exists()) {
      add([
        sprite("missile"),
        pos(blue.pos),
        scale(0.1),
        rotate(blue.angle),
        origin("center"),
        color(0.3, 0.3, 1),
        "missile",
        "missileblue"
      ])
    }

  })

  action("missile", (obj) => {
    obj.move(200 * Math.cos(obj.angle), -200 * Math.sin(obj.angle));
  });

  keyPress("w", () => {
    if (red.exists()) {
      add([
        sprite("missile"),
        pos(red.pos),
        scale(0.1),
        rotate(red.angle),
        origin("center"),
        color(1, 0.3, 0.3),
        "missile",
        "missilered",
      ])
    }
  })

  collides("missilered", "tankblue", (missile, tank) => {
    // remove both the bullet and the thing bullet hit with tag "killable" from scene
    destroy(missile)
    destroy(tank)
    const explosion = add([
      sprite("explosion"),
      pos(missile.pos),
      origin("center")
    ])
    explosion.play("boom")

    wait(1, () => {
      destroy(explosion)
    });

  });

  collides("missileblue", "tankred", (missile, tank) => {
    // remove both the bullet and the thing bullet hit with tag "killable" from scene
    destroy(missile);
    destroy(tank);
    const explosion = add([
      sprite("explosion"),
      pos(missile.pos),
      origin("center")
    ])
    explosion.play("boom")

    wait(1, () => {
      destroy(explosion)
    });
  });

  collides("missile", "wall", (missile, wall) => {
    // remove both the bullet and the thing bullet hit with tag "killable" from scene
    destroy(missile)

    const explosion = add([
      sprite("explosion"),
      pos(missile.pos),
      origin("center")
    ])
    explosion.play("boom")

    wait(1, () => {
      destroy(explosion)
    });

  });

  collides("missile", "missile", (missile1, missile2) => {
    // remove both the bullet and the thing bullet hit with tag "killable" from scene
    destroy(missile1)
    destroy(missile2)
    const explosion = add([
      sprite("explosion"),
      pos(missile1.pos),
      origin("center")
    ])
    explosion.play("boom")

    wait(1, () => {
      destroy(explosion)
    });

  });

});


// start the game
start("main");