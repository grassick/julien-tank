// init kaboom context
kaboom({ fullscreen: true, global: true });

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
loadSound("explosion", "explosion.wav")
loadSound("launch", "launch.mp3")

// define a scene
scene("main", () => {
  add([
    "wall",
    rect(10, height()),
    pos(0, 0),
    color(0, 0, 1),
    solid()
  ])

  for (let i = 0 ; i < 10 ; i++) {
    add([
      "wall",
      rect(100,30),
      pos(rand(100,width()-120),rand(100,height()-120)),
      color(rand(0, 1), rand(0, 1), rand(0, 1)),
      solid()
    ]);
  }

  add([
    "wall",
    rect(10, height()),
    pos(width() - 10, 0),
    color(0, 0, 1),
    solid()
  ]);

  add([
    "wall",
    rect(width() - 20, 10),
    pos(10, 0),
    color(1, 0, 0),
    solid()
  ]);

  add([
    "wall",
    rect(width() - 20, 10),
    pos(10, height() - 10),
    color(1, 0, 0),
    solid()
  ]);

  const blue = add([
    "tankblue",
    sprite("tank-blue"),
    pos(width()-50, height()-50),
    scale(0.3),
    rotate(Math.PI),
    origin("center"),
    solid()
  ])

  blue.action(() => {
    blue.resolve()
  })

  const red = add([
    "tankred",
    sprite("tank-red"),
    pos(50, 50),
    scale(0.3),
    origin("center"),
    rotate(0),
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
        color(0.5, 0.5, 1),
        "missile",
        "missileblue"
      ])
      play("launch", { volume: 0.1 })
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
      play("launch", { volume: 0.1 })
    }
  })

  collides("missilered", "tankblue", (missile, tank) => {
    destroy(missile)
    destroy(tank)

    play("explosion")

    const explosion = add([
      sprite("explosion"),
      pos(missile.pos),
      origin("center")
    ])
    explosion.play("boom")

    wait(1, () => {
      destroy(explosion)
    });

    const explosion2 = add([
      sprite("explosion"),
      pos(tank.pos),
      origin("center"),
      scale(5)
    ])
    explosion2.play("boom")

    wait(1, () => {
      destroy(explosion2)
      go("start")
    });

  });

  collides("missileblue", "tankred", (missile, tank) => {
    destroy(missile)
    destroy(tank)

    play("explosion")

    const explosion = add([
      sprite("explosion"),
      pos(missile.pos),
      origin("center")
    ])
    explosion.play("boom")

    wait(1, () => {
      destroy(explosion)
    });

    const explosion2 = add([
      sprite("explosion"),
      pos(tank.pos),
      origin("center"),
      scale(5)
    ])
    explosion2.play("boom")

    wait(1, () => {
      destroy(explosion2)
      go("start")
    });
  });

  collides("missile", "wall", (missile, wall) => {
    destroy(missile)
    play("explosion", { 
      volume: 0.1
    })

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
    return
    
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

})

scene("start", () => {
  add([
    pos(width()/2, 100),
    origin("center"),
    color(0, 0, 1),
    text(`Julien's game!`, 40),
  ])

  add([
    pos(width()/2, 300),
    origin("center"),
    color(0, 0, 1),
    text(`Enter to start

Red tank: a = left, d = right, s = forward, x = backward, w = shoot

Blue tank: 4 = left, 6 = right, 5 = forward, 2 = backward, 8 = shoot
`, 20),
  ])


  keyPress("enter", () => {
    go("main")
  })



})
// start the game
start("start");