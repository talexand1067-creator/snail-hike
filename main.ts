namespace SpriteKind {
    export const HudStoredObject = SpriteKind.create()
    export const Scenery = SpriteKind.create()
    export const HudBarTop = SpriteKind.create()
    export const Snail = SpriteKind.create()
    export const TheSnailExit = SpriteKind.create()
    export const SnailEntrance = SpriteKind.create()
    export const Item = SpriteKind.create()
    export const TheTNT = SpriteKind.create()
    export const Explosion = SpriteKind.create()
    export const TNTWorld = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Item, function (sprite, otherSprite) {
    otherSprite.destroy()
    PowerUp = "Apple"
    itemCount = 5
    StoredItemSpace.setImage(img`
        1 1 1 1 . . . . 1 1 1 1 
        1 . . . . . . . . . . 1 
        1 . . . . 1 . . . . . 1 
        1 . . . . . 1 . . . . 1 
        . . . . 2 2 1 4 . . . . 
        . . . 2 2 4 2 4 4 . . . 
        . . . 2 4 4 4 4 4 . . . 
        . . . 2 4 4 4 4 3 . . . 
        1 . . 2 4 4 4 3 3 . . 1 
        1 . . . 2 3 3 3 . . . 1 
        1 . . . . . . . . . . 1 
        1 1 1 1 . . . . 1 1 1 1 
        `)
})
function ClearLevel () {
    for (let value of sprites.allOfKind(SpriteKind.HudStoredObject)) {
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.HudBarTop)) {
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.Scenery)) {
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.Snail)) {
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.TheSnailExit)) {
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.SnailEntrance)) {
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.SnailEntrance)) {
        value.destroy()
    }
    PowerUp = ""
    itemCount = 0
    BlockStore = 0
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.TNTWorld, function (sprite, otherSprite) {
    otherSprite.destroy()
    PowerUp = "TNT"
    itemCount = 1
    StoredItemSpace.setImage(img`
        1 1 1 1 . . . . 1 1 1 1 
        1 . 3 3 3 3 3 3 3 3 . 1 
        1 3 4 4 4 4 4 4 4 4 3 1 
        1 3 4 4 4 4 4 4 4 4 3 1 
        . 3 2 2 2 2 2 2 2 2 3 . 
        . 3 1 1 1 4 4 1 1 1 3 . 
        . 3 4 1 4 1 1 4 1 4 3 . 
        . 3 4 1 4 1 4 4 1 4 3 . 
        1 3 2 2 2 2 2 2 2 2 3 1 
        1 3 4 4 4 4 4 4 4 4 3 1 
        1 . 3 3 3 3 3 3 3 3 . 1 
        1 1 1 1 . . . . 1 1 1 1 
        `)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (PowerUp == "Apple" && itemCount > 0) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . 1 . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . 4 1 4 . . . . . . . 
            . . . . . 3 4 4 4 4 . . . . . . 
            . . . . . 3 3 3 4 4 . . . . . . 
            . . . . . 3 3 3 4 2 . . . . . . 
            . . . . . . 3 3 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, thePlayer, 110 * Right, -44)
        projectile.ay = 150
        itemCount += -1
    }
    if (PowerUp == "TNT" && (thePlayer.isHittingTile(CollisionDirection.Bottom) && itemCount > 0)) {
        TNT = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 2 2 2 2 2 2 2 2 2 2 2 2 2 2 1 
            1 2 4 3 2 4 3 2 4 3 2 4 3 2 2 1 
            1 2 4 3 2 4 3 2 4 3 2 4 3 2 2 1 
            1 2 2 3 2 2 3 2 2 3 2 2 3 2 2 1 
            1 4 1 1 1 4 1 4 4 1 4 1 1 1 4 1 
            1 4 4 1 4 4 1 1 4 1 4 4 1 4 4 1 
            1 4 4 1 4 4 1 4 1 1 4 4 1 4 4 1 
            1 4 4 1 4 4 1 4 4 1 4 4 1 4 4 1 
            1 2 2 3 2 2 3 2 2 3 2 2 3 2 2 1 
            1 2 4 3 2 4 3 2 4 3 2 4 3 2 2 1 
            1 2 4 3 2 4 3 2 4 3 2 4 3 2 2 1 
            1 2 2 2 2 2 2 2 2 2 2 2 2 2 2 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            `, SpriteKind.TheTNT)
        itemCount += -1
    }
})
sprites.onCreated(SpriteKind.TheTNT, function (sprite) {
    sprite.setPosition(thePlayer.x, thePlayer.y + 2)
    sprite.lifespan = 5000
    TNTx = sprite.x
    TNTy = sprite.y
    for (let index = 0; index < 2; index++) {
        pause(500)
        sprite.setFlag(SpriteFlag.Invisible, true)
        pause(100)
        sprite.setFlag(SpriteFlag.Invisible, false)
        pause(500)
    }
    for (let index = 0; index < 3; index++) {
        pause(200)
        sprite.setFlag(SpriteFlag.Invisible, true)
        pause(100)
        sprite.setFlag(SpriteFlag.Invisible, false)
        pause(200)
    }
    for (let index = 0; index < 8; index++) {
        pause(50)
        sprite.setFlag(SpriteFlag.Invisible, true)
        pause(25)
        sprite.setFlag(SpriteFlag.Invisible, false)
        pause(50)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(controller.down.isPressed())) {
        if (jumpsRemaining > 0) {
            if (jumpsRemaining == 2) {
                thePlayer.vy = -120
            }
            if (jumpsRemaining == 1) {
                thePlayer.vy = -140
            }
            pause(200)
            jumpsRemaining += -1
        }
    }
})
function ChangeLevel () {
    ClearLevel()
    if (Level == 1) {
        LevelWidth = 26
        SnailsRemaining = 10
        SnailsSpawned = 0
        tiles.setTilemap(tilemap`level1`)
    }
    if (Level == 2) {
        LevelWidth = 36
        SnailsRemaining = 10
        SnailsSpawned = 0
        tiles.setTilemap(tilemap`level2`)
    }
    if (Level == 3) {
        LevelWidth = 36
        SnailsRemaining = 10
        SnailsSpawned = 0
        tiles.setTilemap(tilemap`level3`)
    }
    if (Level == 4) {
        LevelWidth = 36
        SnailsRemaining = 10
        SnailsSpawned = 0
        tiles.setTilemap(tilemap`level4`)
    }
    if (Level == 5) {
        game.over(true, color.FadeToWhite)
    }
    AddScenery()
}
sprites.onDestroyed(SpriteKind.TheTNT, function (sprite) {
    TNTExplode = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Explosion)
    TNTExplode.setPosition(TNTx, TNTy)
    TNTExplode.lifespan = 500
    animation.runImageAnimation(
    TNTExplode,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . 3 3 3 3 3 3 . . . . . 
        . . . . 3 4 4 4 4 4 4 3 . . . . 
        . . . 3 4 4 4 4 4 4 4 4 3 . . . 
        . . 3 4 4 4 4 4 4 4 4 4 4 3 . . 
        . 3 4 4 4 4 4 4 4 4 4 4 4 4 3 . 
        . 3 4 4 4 4 4 4 4 4 4 4 4 4 3 . 
        . 3 4 4 4 4 4 4 4 4 4 4 4 4 3 . 
        . 3 4 4 4 4 4 4 4 4 4 4 4 4 3 . 
        . 3 4 4 4 4 4 4 4 4 4 4 4 4 3 . 
        . 3 4 4 4 4 4 4 4 4 4 4 4 4 3 . 
        . . 3 4 4 4 4 4 4 4 4 4 4 3 . . 
        . . . 3 4 4 4 4 4 4 4 4 3 . . . 
        . . . . 3 4 4 4 4 4 4 3 . . . . 
        . . . . . 3 3 3 3 3 3 . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . 3 3 3 3 3 3 3 3 . . . . 
        . . . 3 3 4 4 4 4 4 4 3 3 . . . 
        . . 3 3 4 4 4 4 4 4 4 4 3 3 . . 
        . 3 3 4 4 4 4 4 4 4 4 4 4 3 3 . 
        3 3 4 4 4 4 4 4 4 4 4 4 4 4 3 3 
        3 4 4 4 4 4 . . . . 4 4 4 4 4 3 
        3 4 4 4 4 . . . . . . 4 4 4 4 3 
        3 4 4 4 4 . . . . . . 4 4 4 4 3 
        3 4 4 4 4 . . . . . . 4 4 4 4 3 
        3 4 4 4 4 . . . . . . 4 4 4 4 3 
        3 4 4 4 4 4 . . . . 4 4 4 4 4 3 
        3 3 4 4 4 4 4 4 4 4 4 4 4 4 3 3 
        . 3 3 4 4 4 4 4 4 4 4 4 4 3 3 . 
        . . 3 3 4 4 4 4 4 4 4 4 3 3 . . 
        . . . 3 3 4 4 4 4 4 4 3 3 . . . 
        . . . . 3 3 3 3 3 3 3 3 . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . 4 . . 3 . . . 4 . . . 4 . . 
        . . . 4 . . . . . . . . 3 . . 4 
        . . 4 . . . 4 . . . . 4 . . . . 
        . . . . 4 . . . . 2 . . . . . . 
        4 . . . . . 2 4 . . . 4 . 2 . . 
        . . . . . . . . 4 . . . . . . . 
        . . 3 . 2 . 2 . . 4 . 2 . . 3 . 
        . . . . . . . 4 . . . . . . . . 
        . . . 4 . . . . . . . 4 . . . . 
        . 4 . . . 3 . 2 . 4 . . . 2 . . 
        . . . 4 . . . . . . . 3 . . . . 
        . 4 . . . . . . . . . . . 4 . . 
        . . . . 2 . . 4 . 2 . . 4 . 4 . 
        . . 4 . . . . . . . 4 . . . . . 
        . 4 . . . . . . . . . . 4 . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    100,
    false
    )
})
sprites.onOverlap(SpriteKind.Snail, SpriteKind.TheSnailExit, function (sprite, otherSprite) {
    SnailsRemaining += -1
    sprite.destroy()
    animation.runImageAnimation(
    otherSprite,
    [img`
        . . . . . 2 2 2 2 2 . . . . . 
        . . . . 2 4 4 4 4 4 3 . . . . 
        . . . 2 4 4 4 4 4 4 4 3 . . . 
        . . 2 4 4 4 4 4 4 4 4 4 3 . . 
        . . 2 4 4 4 4 4 4 4 4 4 3 . . 
        . 2 4 4 4 4 4 4 4 4 4 4 4 3 . 
        . 2 4 4 4 4 4 4 4 4 4 4 4 3 . 
        . 2 4 4 4 4 4 4 4 4 4 4 4 3 . 
        2 4 4 4 4 4 4 4 4 4 4 4 4 4 3 
        1 4 1 4 4 4 4 4 4 4 4 4 4 4 3 
        1 1 1 4 4 4 4 4 4 4 4 4 4 4 3 
        1 3 1 4 4 4 4 4 4 4 4 4 4 4 3 
        4 3 1 4 4 4 4 4 4 4 4 4 4 4 3 
        4 1 4 4 4 4 4 4 4 4 4 4 4 4 3 
        4 1 4 4 4 4 4 4 4 4 4 4 4 4 3 
        1 4 4 4 4 4 4 4 4 4 4 4 4 4 3 
        `,img`
        . . . . . 2 2 2 2 2 . . . . . 
        . . . . 2 4 4 4 4 4 3 . . . . 
        . . . 2 4 4 4 4 4 4 4 3 . . . 
        . . 2 4 4 4 4 4 4 4 4 4 3 . . 
        . . 2 4 4 4 4 4 4 4 4 4 3 . . 
        . 2 4 4 4 4 4 4 4 4 4 4 4 3 . 
        . 2 4 4 4 4 4 4 4 4 4 4 4 3 . 
        . 2 4 4 4 4 4 4 4 4 4 4 4 3 . 
        2 4 4 4 4 4 4 4 4 4 4 4 4 4 3 
        1 4 4 1 4 1 4 4 4 4 4 4 4 4 3 
        3 1 4 1 1 1 4 4 4 4 4 4 4 4 3 
        3 1 4 1 3 1 4 4 4 4 4 4 4 4 3 
        3 1 1 3 3 1 4 4 4 4 4 4 4 4 3 
        3 1 3 4 1 4 4 4 4 4 4 4 4 4 3 
        1 1 4 4 1 4 4 4 4 4 4 4 4 4 3 
        1 1 1 1 4 4 4 4 4 4 4 4 4 4 3 
        `,img`
        . . . . . 2 2 2 2 2 . . . . . 
        . . . . 2 4 4 4 4 4 3 . . . . 
        . . . 2 4 4 4 4 4 4 4 3 . . . 
        . . 2 4 4 4 4 4 4 4 4 4 3 . . 
        . . 2 4 4 4 4 4 4 4 4 4 3 . . 
        . 2 4 4 4 4 4 4 4 4 4 4 4 3 . 
        . 2 4 4 4 4 4 4 4 4 4 4 4 3 . 
        . 2 4 4 4 4 4 4 4 4 4 4 4 3 . 
        2 4 4 4 4 4 4 4 4 4 4 4 4 4 3 
        2 1 1 1 1 1 4 4 1 4 1 4 4 4 3 
        1 3 3 3 3 3 1 4 1 1 1 4 4 4 3 
        1 4 1 1 1 3 1 4 1 3 1 4 4 4 3 
        1 4 1 3 3 3 1 1 3 3 1 4 4 4 3 
        1 4 4 1 1 3 1 3 4 1 4 4 4 4 3 
        1 4 4 4 4 1 1 4 4 1 4 4 4 4 3 
        1 1 1 1 1 1 1 1 1 4 4 4 4 4 3 
        `,img`
        . . . . . 2 2 2 2 2 . . . . . 
        . . . . 2 4 4 4 4 4 3 . . . . 
        . . . 2 4 4 4 4 4 4 4 3 . . . 
        . . 2 4 4 4 4 4 4 4 4 4 3 . . 
        . . 2 4 4 4 4 4 4 4 4 4 3 . . 
        . 2 4 4 4 4 4 4 4 4 4 4 4 3 . 
        . 2 4 4 4 4 4 4 4 4 4 4 4 3 . 
        . 2 4 4 4 4 4 4 4 4 4 4 4 3 . 
        2 4 4 4 4 4 4 4 4 4 4 4 4 4 3 
        2 4 4 1 1 1 1 1 4 4 1 4 1 4 3 
        2 4 1 3 3 3 3 3 1 4 1 1 1 4 3 
        2 4 1 4 1 1 1 3 1 4 1 3 1 4 3 
        2 4 1 4 1 3 3 3 1 1 3 3 1 4 3 
        1 1 1 4 4 1 1 3 1 3 4 1 4 4 3 
        4 3 1 4 4 4 4 1 1 4 4 1 4 4 3 
        1 1 1 1 1 1 1 1 1 1 1 4 4 4 3 
        `,img`
        . . . . . 2 2 2 2 2 . . . . . 
        . . . . 2 4 4 4 4 4 3 . . . . 
        . . . 2 4 4 4 4 4 4 4 3 . . . 
        . . 2 4 4 4 4 4 4 4 4 4 3 . . 
        . . 2 4 4 4 4 4 4 4 4 4 3 . . 
        . 2 4 4 4 4 4 4 4 4 4 4 4 3 . 
        . 2 4 4 4 4 4 4 4 4 4 4 4 3 . 
        . 2 4 4 4 4 4 4 4 4 4 4 4 3 . 
        2 4 4 4 4 4 4 4 4 4 4 4 4 4 3 
        2 4 4 4 1 1 1 1 1 4 4 1 4 1 3 
        2 4 4 1 3 3 3 3 3 1 4 1 1 1 3 
        2 4 4 1 4 1 1 1 3 1 4 1 3 1 3 
        2 4 4 1 4 1 3 3 3 1 1 3 3 1 3 
        2 1 1 1 4 4 1 1 3 1 3 4 1 4 3 
        1 4 3 1 4 4 4 4 1 1 4 4 1 4 3 
        1 1 1 1 1 1 1 1 1 1 1 1 4 4 3 
        `,img`
        . . . . . 2 2 2 2 2 . . . . . 
        . . . . 2 4 4 4 4 4 3 . . . . 
        . . . 2 4 4 4 4 4 4 4 3 . . . 
        . . 2 4 4 4 4 4 4 4 4 4 3 . . 
        . . 2 4 4 4 4 4 4 4 4 4 3 . . 
        . 2 4 4 4 4 4 4 4 4 4 4 4 3 . 
        . 2 4 4 4 4 4 4 4 4 4 4 4 3 . 
        . 2 4 4 4 4 4 4 4 4 4 4 4 3 . 
        2 4 4 4 4 4 4 4 4 4 4 4 4 4 3 
        2 4 4 4 4 4 4 4 4 4 4 4 4 4 3 
        2 4 4 4 4 4 4 4 4 4 4 4 4 4 3 
        2 4 4 4 4 4 4 4 4 4 4 4 4 4 3 
        2 4 4 4 4 4 4 4 4 4 4 4 4 4 3 
        2 4 4 4 4 4 4 4 4 4 4 4 4 4 3 
        2 4 4 4 4 4 4 4 4 4 4 4 4 4 3 
        2 4 4 4 4 4 4 4 4 4 4 4 4 4 3 
        `,img`
        . . . . . 2 2 2 2 2 . . . . . 
        . . . . 2 4 4 4 4 4 3 . . . . 
        . . . 2 4 4 4 4 4 4 4 3 . . . 
        . . 2 4 4 4 4 4 4 4 4 4 3 . . 
        . . 2 4 4 4 4 4 4 4 4 4 3 . . 
        . 2 4 4 4 4 4 4 4 4 4 4 4 3 . 
        . 2 4 4 4 4 4 4 4 4 4 4 4 3 . 
        . 2 4 4 4 4 4 4 4 4 4 4 4 3 . 
        2 4 4 4 4 4 4 4 4 4 4 4 4 4 3 
        2 4 4 4 4 4 4 4 4 4 4 4 4 4 3 
        2 4 4 4 4 4 4 4 4 4 4 4 4 4 3 
        2 4 4 4 4 4 4 4 4 4 4 4 4 4 3 
        2 4 4 4 4 4 4 4 4 4 4 4 4 4 3 
        2 4 4 4 4 4 4 4 4 4 4 4 4 4 3 
        2 4 4 4 4 4 4 4 4 4 4 4 4 4 3 
        2 4 4 4 4 4 4 4 4 4 4 4 4 4 3 
        `],
    100,
    false
    )
    if (SnailsRemaining == 0) {
        game.splash("Next Level")
        Level += 1
        pause(1000)
        ChangeLevel()
    }
})
function DrawHud () {
    ObjectStoredText = sprites.create(img`
        1 1 . . 1 . . . 1 . . . 1 1 . 1 . 1 
        1 . 1 . 1 . . 1 . 1 . 1 . . . 1 . 1 
        1 . 1 . 1 . . 1 . 1 . 1 . . . 1 . 1 
        1 1 . . 1 . . 1 . 1 . 1 . . . 1 1 . 
        1 . 1 . 1 . . 1 . 1 . 1 . . . 1 . 1 
        1 . 1 . 1 . . 1 . 1 . 1 . . . 1 . 1 
        1 1 . . 1 1 . . 1 . . . 1 1 . 1 . 1 
        `, SpriteKind.HudBarTop)
    ObjectStoredText.setPosition(69, 8)
    ObjectStoredText.setFlag(SpriteFlag.RelativeToCamera, true)
    ObjectStoredText.z = 5
    ItemStoredText = sprites.create(img`
        1 . 1 1 1 . 1 1 . 1 . . . 1 
        1 . . 1 . . 1 . . 1 1 . 1 1 
        1 . . 1 . . 1 . . 1 . 1 . 1 
        1 . . 1 . . 1 1 . 1 . 1 . 1 
        1 . . 1 . . 1 . . 1 . . . 1 
        1 . . 1 . . 1 . . 1 . . . 1 
        1 . . 1 . . 1 1 . 1 . . . 1 
        `, SpriteKind.HudBarTop)
    ItemStoredText.setPosition(10, 8)
    ItemStoredText.setFlag(SpriteFlag.RelativeToCamera, true)
    ItemStoredText.z = 5
    SnailCountHud = sprites.create(img`
        . 1 1 . 1 . . 1 . . 1 . . 1 . 1 . . . 1 1 
        1 . . . 1 1 . 1 . 1 . 1 . 1 . 1 . . 1 . . 
        1 . . . 1 1 . 1 . 1 . 1 . 1 . 1 . . 1 . . 
        . 1 . . 1 . 1 1 . 1 . 1 . 1 . 1 . . . 1 . 
        . . 1 . 1 . 1 1 . 1 1 1 . 1 . 1 . . . . 1 
        . . 1 . 1 . 1 1 . 1 . 1 . 1 . 1 . . . . 1 
        1 1 . . 1 . . 1 . 1 . 1 . 1 . 1 1 . 1 1 . 
        `, SpriteKind.HudBarTop)
    SnailCountHud.setPosition(120, 8)
    SnailCountHud.setFlag(SpriteFlag.RelativeToCamera, true)
    SnailCountHud.z = 5
    OutOf10 = sprites.create(img`
        . . . 1 . . . 1 . . . 1 . 
        . . . 1 . . 1 1 . . 1 . 1 
        . . 1 . . . . 1 . . 1 . 1 
        . . 1 . . . . 1 . . 1 . 1 
        . . 1 . . . . 1 . . 1 . 1 
        . 1 . . . . . 1 . . 1 . 1 
        . 1 . . . . 1 1 1 . . 1 . 
        `, SpriteKind.HudBarTop)
    OutOf10.setPosition(151, 8)
    OutOf10.setFlag(SpriteFlag.RelativeToCamera, true)
    OutOf10.z = 5
    SnailCounter = sprites.create(img`
        . 1 . . 
        1 . 1 . 
        1 . 1 . 
        1 . 1 . 
        1 . 1 . 
        1 . 1 . 
        . 1 . . 
        `, SpriteKind.HudBarTop)
    SnailCounter.setFlag(SpriteFlag.RelativeToCamera, true)
    SnailCounter.setPosition(143, 8)
    SnailCounter.z = 5
    ItemCounter = sprites.create(img`
        . 1 . . 
        1 . 1 . 
        1 . 1 . 
        1 . 1 . 
        1 . 1 . 
        1 . 1 . 
        . 1 . . 
        `, SpriteKind.HudBarTop)
    ItemCounter.setFlag(SpriteFlag.RelativeToCamera, true)
    ItemCounter.setPosition(42, 8)
    ItemCounter.z = 5
    ItemCounterX = sprites.create(img`
        1 . 1 
        . 1 . 
        1 . 1 
        `, SpriteKind.HudBarTop)
    ItemCounterX.setFlag(SpriteFlag.RelativeToCamera, true)
    ItemCounterX.setPosition(35, 8)
    ItemCounterX.z = 5
    HudBar = sprites.create(img`
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        `, SpriteKind.HudBarTop)
    HudBar.setPosition(80, 8)
    HudBar.setFlag(SpriteFlag.RelativeToCamera, true)
    StoredObjectSpace = sprites.create(img`
        1 1 1 1 . . . . 1 1 1 1 
        1 . . . . . . . . . . 1 
        1 . . . . . . . . . . 1 
        1 . . . . . . . . . . 1 
        . . . . . . . . . . . . 
        . . . . . . . . . . . . 
        . . . . . . . . . . . . 
        . . . . . . . . . . . . 
        1 . . . . . . . . . . 1 
        1 . . . . . . . . . . 1 
        1 . . . . . . . . . . 1 
        1 1 1 1 . . . . 1 1 1 1 
        `, SpriteKind.HudStoredObject)
    StoredObjectSpace.setPosition(87, 8)
    StoredObjectSpace.setFlag(SpriteFlag.RelativeToCamera, true)
    StoredItemSpace = sprites.create(img`
        1 1 1 1 . . . . 1 1 1 1 
        1 . . . . . . . . . . 1 
        1 . . . . . . . . . . 1 
        1 . . . . . . . . . . 1 
        . . . . . . . . . . . . 
        . . . . . . . . . . . . 
        . . . . . . . . . . . . 
        . . . . . . . . . . . . 
        1 . . . . . . . . . . 1 
        1 . . . . . . . . . . 1 
        1 . . . . . . . . . . 1 
        1 1 1 1 . . . . 1 1 1 1 
        `, SpriteKind.HudStoredObject)
    StoredItemSpace.setPosition(25, 8)
    StoredItemSpace.setFlag(SpriteFlag.RelativeToCamera, true)
    BlockStore = 0
    thePlayer.z = 5
}
sprites.onDestroyed(SpriteKind.Explosion, function (sprite) {
    if (TNTExplode.tileKindAt(TileDirection.Right, assets.tile`tile47`)) {
        for (let value of tiles.getTilesByType(assets.tile`tile47`)) {
            tiles.setTileAt(value, assets.tile`tile0`)
            tiles.setWallAt(value, false)
        }
    }
})
function AddScenery () {
    for (let value of tiles.getTilesByType(assets.tile`tile11`)) {
        tiles.placeOnRandomTile(thePlayer, assets.tile`tile11`)
        tiles.setTileAt(value, assets.tile`tile0`)
    }
    for (let value of tiles.getTilesByType(assets.tile`tile14`)) {
        smallBush = sprites.create(assets.tile`tile14`, SpriteKind.Scenery)
        tiles.placeOnTile(smallBush, value)
        tiles.setTileAt(value, assets.tile`tile0`)
    }
    for (let value of tiles.getTilesByType(assets.tile`tile15`)) {
        TreeTopLeft = sprites.create(assets.tile`tile15`, SpriteKind.Scenery)
        tiles.placeOnTile(TreeTopLeft, value)
        tiles.setTileAt(value, assets.tile`tile0`)
    }
    for (let value of tiles.getTilesByType(assets.tile`tile16`)) {
        BushLeft = sprites.create(assets.tile`tile16`, SpriteKind.Scenery)
        tiles.placeOnTile(BushLeft, value)
        tiles.setTileAt(value, assets.tile`tile0`)
    }
    for (let value of tiles.getTilesByType(assets.tile`tile16`)) {
        BushRight = sprites.create(assets.tile`tile16`, SpriteKind.Scenery)
        tiles.placeOnTile(BushRight, value)
        tiles.setTileAt(value, assets.tile`tile0`)
    }
    for (let value of tiles.getTilesByType(assets.tile`tile17`)) {
        TreeTopLeft = sprites.create(assets.tile`tile17`, SpriteKind.Scenery)
        tiles.placeOnTile(TreeTopLeft, value)
        tiles.setTileAt(value, assets.tile`tile0`)
    }
    for (let value of tiles.getTilesByType(assets.tile`tile18`)) {
        TreeTopRight = sprites.create(assets.tile`tile18`, SpriteKind.Scenery)
        tiles.placeOnTile(TreeTopRight, value)
        tiles.setTileAt(value, assets.tile`tile0`)
    }
    for (let value of tiles.getTilesByType(assets.tile`tile19`)) {
        ApplePickup = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . 1 . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . 4 1 4 . . . . . . . 
            . . . . . 4 3 4 4 4 . . . . . . 
            . . . . . 3 3 4 4 2 . . . . . . 
            . . . . . 4 4 4 4 2 . . . . . . 
            . . . . . . 4 2 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Item)
        ApplePickup.ay = 100
        tiles.placeOnTile(ApplePickup, value)
        TreeMiddleLeft = sprites.create(assets.tile`tile19`, SpriteKind.Scenery)
        tiles.placeOnTile(TreeMiddleLeft, value)
        tiles.setTileAt(value, assets.tile`tile0`)
    }
    for (let value of tiles.getTilesByType(assets.tile`tile20`)) {
        TreeMiddleRight = sprites.create(assets.tile`tile20`, SpriteKind.Scenery)
        tiles.placeOnTile(TreeMiddleRight, value)
        tiles.setTileAt(value, assets.tile`tile0`)
    }
    for (let value of tiles.getTilesByType(assets.tile`tile43`)) {
        TNTWorldObject = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . 3 3 3 3 3 3 3 3 3 3 3 3 . . 
            . 3 4 4 4 4 4 4 4 4 4 4 4 4 3 . 
            . 3 2 2 2 2 2 2 2 2 2 2 2 2 3 . 
            . 3 4 4 4 4 4 4 4 4 4 4 4 4 3 . 
            . 3 2 2 2 2 2 2 2 2 2 2 2 2 3 . 
            . 3 1 1 1 4 1 4 4 1 4 1 1 1 3 . 
            . 3 4 1 4 4 1 1 4 1 4 4 1 4 3 . 
            . 3 4 1 4 4 1 4 1 1 4 4 1 4 3 . 
            . 3 4 1 4 4 1 4 4 1 4 4 1 4 3 . 
            . 3 2 2 2 2 2 2 2 2 2 2 2 2 3 . 
            . 3 4 4 4 4 4 4 4 4 4 4 4 4 3 . 
            . 3 2 2 2 2 2 2 2 2 2 2 2 2 3 . 
            . 3 4 4 4 4 4 4 4 4 4 4 4 4 3 . 
            . . 3 3 3 3 3 3 3 3 3 3 3 3 . . 
            `, SpriteKind.TNTWorld)
        tiles.placeOnTile(TNTWorldObject, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`tile21`)) {
        TreeBottomLeft = sprites.create(assets.tile`tile21`, SpriteKind.Scenery)
        tiles.placeOnTile(TreeBottomLeft, value)
        tiles.setTileAt(value, assets.tile`tile0`)
    }
    for (let value of tiles.getTilesByType(assets.tile`tile22`)) {
        TreeBottomRight = sprites.create(assets.tile`tile22`, SpriteKind.Scenery)
        tiles.placeOnTile(TreeBottomRight, value)
        tiles.setTileAt(value, assets.tile`tile0`)
    }
    for (let value of tiles.getTilesByType(assets.tile`tile24`)) {
        gateLeft = sprites.create(assets.tile`tile24`, SpriteKind.Scenery)
        tiles.placeOnTile(gateLeft, value)
        tiles.setTileAt(value, assets.tile`tile0`)
    }
    for (let value of tiles.getTilesByType(assets.tile`tile25`)) {
        gateRight = sprites.create(assets.tile`tile25`, SpriteKind.Scenery)
        tiles.placeOnTile(gateRight, value)
        tiles.setTileAt(value, assets.tile`tile0`)
    }
    for (let value of tiles.getTilesByType(assets.tile`tile26`)) {
        SnailEntrance = sprites.create(assets.tile`tile26`, SpriteKind.SnailEntrance)
        tiles.placeOnTile(SnailEntrance, value)
        tiles.setTileAt(value, assets.tile`tile0`)
    }
    for (let value of tiles.getTilesByType(assets.tile`tile27`)) {
        SnailExit = sprites.create(assets.tile`tile27`, SpriteKind.TheSnailExit)
        tiles.placeOnTile(SnailExit, value)
        tiles.setTileAt(value, assets.tile`tile0`)
    }
    DrawHud()
}
let SnailSprite: Sprite = null
let SnailAnimFrame = 0
let playerTileColumn = 0
let playerTileRow = 0
let FlipHoriz = 0
let GlidingAnim = 0
let animationFrame = 0
let SnailExit: Sprite = null
let SnailEntrance: Sprite = null
let gateRight: Sprite = null
let gateLeft: Sprite = null
let TreeBottomRight: Sprite = null
let TreeBottomLeft: Sprite = null
let TNTWorldObject: Sprite = null
let TreeMiddleRight: Sprite = null
let TreeMiddleLeft: Sprite = null
let ApplePickup: Sprite = null
let TreeTopRight: Sprite = null
let BushRight: Sprite = null
let BushLeft: Sprite = null
let TreeTopLeft: Sprite = null
let smallBush: Sprite = null
let StoredObjectSpace: Sprite = null
let HudBar: Sprite = null
let ItemCounterX: Sprite = null
let ItemCounter: Sprite = null
let SnailCounter: Sprite = null
let OutOf10: Sprite = null
let SnailCountHud: Sprite = null
let ItemStoredText: Sprite = null
let ObjectStoredText: Sprite = null
let TNTExplode: Sprite = null
let SnailsSpawned = 0
let SnailsRemaining = 0
let LevelWidth = 0
let jumpsRemaining = 0
let TNTy = 0
let TNTx = 0
let TNT: Sprite = null
let Right = 0
let projectile: Sprite = null
let BlockStore = 0
let StoredItemSpace: Sprite = null
let itemCount = 0
let PowerUp = ""
let Level = 0
let thePlayer: Sprite = null
color.setColor(1, color.rgb(45, 27, 0))
color.setColor(2, color.rgb(30, 96, 110))
color.setColor(3, color.rgb(90, 185, 168))
color.setColor(4, color.rgb(196, 240, 194))
color.setColor(5, color.rgb(152, 183, 152))
scene.setBackgroundColor(5)
thePlayer = sprites.create(img`
    . . . . . . . . . 1 . . 1 . . . 
    . . . . . . . . 1 . . 1 . . . . 
    . . . . . . . . 4 1 1 4 . . . . 
    . . . . . . . . 4 4 4 4 . . . . 
    . . . . 2 2 2 1 4 1 4 1 . . . . 
    . . . . 1 2 2 2 4 4 4 . . . . . 
    . . . 2 2 2 1 4 3 2 3 4 . . . . 
    . . . 2 1 2 2 3 3 3 2 . . . . . 
    . . 1 2 2 2 4 4 1 4 4 1 . . . . 
    . . 2 2 1 2 4 4 1 4 4 . 1 . . . 
    . . 2 2 1 2 3 3 2 1 . . . 1 . . 
    . . . 2 2 2 4 4 4 4 1 . . . . . 
    . . . . 2 . 1 4 4 1 . . . . . . 
    . . . . . . 1 . 1 . . . . . . . 
    . . . . . 1 . . 1 . . . . . . . 
    . . . . . 1 1 . 1 1 . . . . . . 
    `, SpriteKind.Player)
scene.cameraFollowSprite(thePlayer)
Level = 1
ChangeLevel()
let SnailCountImage = [
img`
    . 1 . . 
    1 . 1 . 
    1 . 1 . 
    1 . 1 . 
    1 . 1 . 
    1 . 1 . 
    . 1 . . 
    `,
img`
    . 1 . . 
    1 1 . . 
    . 1 . . 
    . 1 . . 
    . 1 . . 
    . 1 . . 
    1 1 1 . 
    `,
img`
    . 1 . . 
    1 . 1 . 
    . . 1 . 
    . 1 . . 
    1 . . . 
    1 . . . 
    1 1 1 . 
    `,
img`
    . 1 . . 
    1 . 1 . 
    . . 1 . 
    . 1 . . 
    . . 1 . 
    1 . 1 . 
    . 1 . . 
    `,
img`
    . . 1 . 
    . 1 . . 
    . 1 . . 
    1 . . . 
    1 . 1 . 
    1 1 1 1 
    . . 1 . 
    `,
img`
    1 1 1 . 
    1 . . . 
    1 . . . 
    . 1 . . 
    . . 1 . 
    . . 1 . 
    1 1 . . 
    `,
img`
    . 1 1 . 
    1 . . . 
    1 . . . 
    1 1 1 . 
    1 . . 1 
    1 . . 1 
    . 1 1 . 
    `,
img`
    1 1 1 . 
    . . 1 . 
    . . 1 . 
    . 1 . . 
    . 1 . . 
    1 . . . 
    1 . . . 
    `,
img`
    . 1 . . 
    1 . 1 . 
    1 . 1 . 
    . 1 . . 
    1 . 1 . 
    1 . 1 . 
    . 1 . . 
    `,
img`
    . 1 . . 
    1 . 1 . 
    1 . 1 . 
    . 1 1 . 
    . . 1 . 
    . . 1 . 
    . 1 . . 
    `,
img`
    . 1 . . 1 . . 
    1 1 . 1 . 1 . 
    . 1 . 1 . 1 . 
    . 1 . 1 . 1 . 
    . 1 . 1 . 1 . 
    . 1 . 1 . 1 . 
    1 1 1 . 1 . . 
    `
]
let ItemCountImage = [
img`
    . 1 . . 
    1 . 1 . 
    1 . 1 . 
    1 . 1 . 
    1 . 1 . 
    1 . 1 . 
    . 1 . . 
    `,
img`
    . 1 . . 
    1 1 . . 
    . 1 . . 
    . 1 . . 
    . 1 . . 
    . 1 . . 
    1 1 1 . 
    `,
img`
    . 1 . . 
    1 . 1 . 
    . . 1 . 
    . 1 . . 
    1 . . . 
    1 . . . 
    1 1 1 . 
    `,
img`
    . 1 . . 
    1 . 1 . 
    . . 1 . 
    . 1 . . 
    . . 1 . 
    1 . 1 . 
    . 1 . . 
    `,
img`
    . . 1 . 
    . 1 . . 
    . 1 . . 
    1 . . . 
    1 . 1 . 
    1 1 1 1 
    . . 1 . 
    `,
img`
    1 1 1 . 
    1 . . . 
    1 . . . 
    . 1 . . 
    . . 1 . 
    . . 1 . 
    1 1 . . 
    `,
img`
    . 1 1 . 
    1 . . . 
    1 . . . 
    1 1 1 . 
    1 . . 1 
    1 . . 1 
    . 1 1 . 
    `,
img`
    1 1 1 . 
    . . 1 . 
    . . 1 . 
    . 1 . . 
    . 1 . . 
    1 . . . 
    1 . . . 
    `,
img`
    . 1 . . 
    1 . 1 . 
    1 . 1 . 
    . 1 . . 
    1 . 1 . 
    1 . 1 . 
    . 1 . . 
    `,
img`
    . 1 . . 
    1 . 1 . 
    1 . 1 . 
    . 1 1 . 
    . . 1 . 
    . . 1 . 
    . 1 . . 
    `,
img`
    . 1 . . 1 . . 
    1 1 . 1 . 1 . 
    . 1 . 1 . 1 . 
    . 1 . 1 . 1 . 
    . 1 . 1 . 1 . 
    . 1 . 1 . 1 . 
    1 1 1 . 1 . . 
    `
]
game.onUpdate(function () {
    if (controller.right.isPressed()) {
        thePlayer.vx += 23
    }
    if (controller.left.isPressed()) {
        thePlayer.vx += -23
    }
    thePlayer.vx = thePlayer.vx * 0.8
    thePlayer.vy += 8
    thePlayer.setImage(img`
        ..........1..1..
        .........1..1...
        ........12.24...
        .....2224444....
        ...222124141....
        ...112224444....
        ...112123322....
        ...22222413.....
        ...211223314....
        ...211233313....
        ....22233341....
        ....1.24443.1...
        ....1.3333......
        ......1..1......
        ......1..1......
        ......1.1.......
        ......1.1.......
        ......1.1.......
        ......1111......
        `)
    if (animationFrame == 1) {
        thePlayer.setImage(img`
            ..........1..1..
            .........1..1...
            ........12.24...
            .....2224444....
            ...222124141....
            ...112224444....
            ...112123322....
            ...2222241333...
            ...2112233143...
            ...211233313....
            ....22233341....
            ....1.24443.1...
            ...1..3333......
            ...1...1.1......
            .......1..1.....
            .......1..1.....
            .......1.1......
            .......11.......
            ......11........
            `)
    }
    if (animationFrame == 2) {
        thePlayer.setImage(img`
            ................
            ................
            ........11.11...
            .......12.24....
            ....2224444.....
            ..222124141.....
            ..112224444.....
            ..112123322..1..
            ..22232413331...
            ..2112233111....
            ..211233333.....
            ...22233343.....
            .....24443......
            .....3133.......
            ......1.11......
            ...1..1..1......
            ....11....1.....
            ..........1.....
            .........1......
            `)
    }
    if (animationFrame == 3) {
        thePlayer.setImage(img`
            .........1..1...
            ........1..1....
            .......12.24....
            .....224444.....
            ...22124141.....
            ...12224444.....
            ...12123322.....
            ...222241333....
            ...222231343....
            ...11233133.....
            ....22333132....
            ...3.2444311....
            .....33131......
            ........11......
            ........11......
            .....11.11......
            .......11.......
            .......1........
            .......1........
            `)
    }
    if (animationFrame == 4) {
        thePlayer.setImage(img`
            ............1...
            ........11.1....
            .......12.24....
            ....2224444.....
            ..222124141.....
            ..112224444.....
            ..112123322.....
            ..222224133.....
            ..2112213342.2..
            ..21121333322...
            ...22213343.....
            .....21443......
            .....3313111....
            .......11..11...
            ......11....1...
            ......1....1....
            .....11...1.....
            .....1..........
            .....11.........
            `)
    }
    if (thePlayer.vy < 0 && jumpsRemaining == 2) {
        thePlayer.setImage(img`
            ............1...
            ........11.1....
            .......12.24....
            ....2224444..2..
            ..2221241412....
            ..112224444..2..
            ..112123322.22..
            ..22222413322...
            ..211221334.....
            ..211213333.....
            ...22213343.....
            .....21443......
            .....3313111....
            .......11..11...
            ......11....1...
            ...1..1....1....
            ....111...1.....
            ................
            ................
            `)
    }
    if (thePlayer.vy < 0 && jumpsRemaining == 1) {
        thePlayer.setImage(img`
            ................
            ........11.1....
            .......12.24....
            .......4444.....
            ....21241412....
            ...12224444..2..
            ..112123322..2..
            ..222224133..2..
            ..2112213342....
            ..211213333.....
            ...22213343.....
            .....21443......
            .....33131......
            .......1..1.....
            .......1..1.....
            ......1..1......
            ......1.1.......
            .....1..1.......
            ......1.........
            `)
    }
    if (thePlayer.vy > 0 && !(thePlayer.isHittingTile(CollisionDirection.Bottom))) {
        thePlayer.setImage(img`
            ................
            ................
            ........11.1....
            .......12.241...
            .......4444.....
            ....2224141.2...
            ...12224444..2..
            ..112123322.2...
            ..22212413322...
            ..222221334.....
            ..211213333.....
            ...11213343.....
            .....21443......
            .....3313111.1..
            ......11....1...
            .......1........
            ........1.......
            ........1.......
            .........1......
            `)
    }
    if (thePlayer.isHittingTile(CollisionDirection.Bottom)) {
        jumpsRemaining = 2
    }
    if (jumpsRemaining == 0 && controller.A.isPressed()) {
        thePlayer.vy = 15
        if (GlidingAnim == 1) {
            thePlayer.setImage(img`
                ................
                ...........3344.
                .........3334433
                ..444...33114133
                .33344..31232413
                .443334.34444333
                4444442224141323
                4444412224444332
                .44411212332232.
                ..4422212413322.
                ....222221334...
                ....211213333...
                .....11213343...
                .......21443....
                .......331311...
                ........11...1..
                .........1...1..
                ..........1...1.
                ................
                `)
        }
        if (GlidingAnim == 2) {
            thePlayer.setImage(img`
                ................
                ...........3333.
                ..........314413
                .........3134133
                ........31232333
                ...4444.34444333
                .44444222414133.
                44334122244442..
                3344112123322.2.
                344422212413322.
                4444222221334...
                .44.211213333...
                .....11213343...
                .......21443....
                .......331311...
                ........11...1..
                .........1...1..
                ........1...1...
                ................
                `)
        }
    }
    if (FlipHoriz == 1) {
        thePlayer.image.flipX()
    }
    if (controller.left.isPressed()) {
        FlipHoriz = 1
        Right = -1
    } else {
        if (controller.right.isPressed()) {
            FlipHoriz = 0
            Right = 1
        }
    }
    if (BlockStore == 0) {
        StoredObjectSpace.setImage(img`
            1 1 1 1 . . . . 1 1 1 1 
            1 . . . . . . . . . . 1 
            1 . . . . . . . . . . 1 
            1 . . . . . . . . . . 1 
            . . . . . . . . . . . . 
            . . . . . . . . . . . . 
            . . . . . . . . . . . . 
            . . . . . . . . . . . . 
            1 . . . . . . . . . . 1 
            1 . . . . . . . . . . 1 
            1 . . . . . . . . . . 1 
            1 1 1 1 . . . . 1 1 1 1 
            `)
    } else {
        StoredObjectSpace.setImage(img`
            1 1 1 1 . . . . 1 1 1 1 
            1 . 3 3 3 3 4 4 4 4 . 1 
            1 3 3 1 1 1 1 1 1 4 4 1 
            1 3 1 2 2 2 2 2 2 1 4 1 
            . 3 1 2 2 4 3 2 2 1 2 . 
            . 3 1 2 4 3 3 3 2 1 2 . 
            . 3 1 2 2 4 3 2 2 1 2 . 
            . 4 1 2 2 4 3 2 2 1 2 . 
            1 4 1 2 2 2 2 2 2 1 2 1 
            1 4 4 1 1 1 1 1 1 2 2 1 
            1 . 4 4 4 2 2 2 2 2 . 1 
            1 1 1 1 . . . . 1 1 1 1 
            `)
    }
    playerTileRow = thePlayer.y / 16
    playerTileColumn = thePlayer.x / 16
    for (let value of sprites.allOfKind(SpriteKind.Snail)) {
        value.vx = 15 * sprites.readDataNumber(value, "Right")
        value.vy += sprites.readDataNumber(value, "Gravity")
        value.setImage(img`
            . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . 
            1 . 1 . . 1 1 1 1 1 . . . . 
            1 1 1 . 1 3 3 3 3 3 1 . . . 
            1 3 1 . 1 2 1 1 1 3 1 . . . 
            1 3 4 1 1 2 2 2 1 2 1 . . . 
            . 1 3 4 1 2 1 1 2 2 1 1 1 . 
            . 1 3 4 1 1 2 2 2 2 1 4 3 1 
            . . 1 1 1 1 1 1 1 1 1 1 1 1 
            `)
        if (SnailAnimFrame == 1) {
            value.setImage(img`
                . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . 
                1 . 1 . . 1 1 1 1 1 . . . . 
                1 1 1 . 1 3 3 3 3 3 1 . . . 
                1 3 1 . 1 2 1 1 1 3 1 . . . 
                1 3 4 1 1 2 2 2 1 2 1 . . . 
                . 1 3 4 1 2 1 1 2 2 1 1 1 . 
                . 1 3 4 1 1 2 2 2 2 1 4 3 1 
                . . 1 1 1 1 1 1 1 1 1 1 1 1 
                `)
        }
        if (SnailAnimFrame == 2) {
            value.setImage(img`
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . 
                1 . 1 . . . 1 1 1 1 1 . . . . 
                1 1 1 . . 1 3 3 3 3 3 1 . . . 
                1 3 1 . . 1 2 1 1 1 3 1 . . . 
                1 3 4 1 1 1 2 2 2 1 2 1 . . . 
                . 1 3 3 4 1 2 1 1 2 2 1 1 . . 
                . 1 3 3 4 1 1 2 2 2 2 1 3 1 . 
                . . 1 1 1 1 1 1 1 1 1 1 1 1 . 
                `)
        }
        if (sprites.readDataNumber(value, "Right") == 1) {
            value.image.flipX()
        }
    }
    SnailCounter.setImage(SnailCountImage[SnailsRemaining])
    if (SnailsRemaining == 10) {
        SnailCounter.x = 141
    } else {
        SnailCounter.x = 143
    }
})
game.onUpdateInterval(2000, function () {
    if (SnailsSpawned < 10) {
        for (let value of sprites.allOfKind(SpriteKind.SnailEntrance)) {
            SnailSprite = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . 1 . 1 . . 1 1 1 1 1 . . . . . 
                . 1 1 1 . 1 3 3 3 3 3 1 . . . . 
                . 1 3 1 . 1 2 1 1 1 3 1 . . . . 
                . 1 3 4 1 1 2 2 2 1 2 1 . . . . 
                . . 1 3 4 1 2 1 1 2 2 1 1 1 . . 
                . . 1 3 4 1 1 2 2 2 2 1 4 3 1 . 
                . . . 1 1 1 1 1 1 1 1 1 1 1 1 . 
                `, SpriteKind.Snail)
            SnailSprite.setPosition(value.x, value.y)
            SnailsSpawned += 1
        }
        for (let value of sprites.allOfKind(SpriteKind.Snail)) {
            sprites.setDataNumber(value, "Gravity", 8)
            sprites.setDataNumber(value, "Right", 1)
            sprites.setDataNumber(value, "Home", 0)
        }
    }
})
forever(function () {
    GlidingAnim = 1
    pause(100)
    GlidingAnim = 2
    pause(100)
})
forever(function () {
    if (controller.left.isPressed() || controller.right.isPressed()) {
        animationFrame += 1
        pause(100)
        if (animationFrame > 4) {
            animationFrame = 1
        }
    } else {
        animationFrame = 0
    }
    if (controller.right.isPressed() && controller.left.isPressed()) {
        animationFrame = 0
    }
})
forever(function () {
    ItemCounter.setImage(ItemCountImage[itemCount])
    if (itemCount == 0) {
        StoredItemSpace.setImage(img`
            1 1 1 1 . . . . 1 1 1 1 
            1 . . . . . . . . . . 1 
            1 . . . . . . . . . . 1 
            1 . . . . . . . . . . 1 
            . . . . . . . . . . . . 
            . . . . . . . . . . . . 
            . . . . . . . . . . . . 
            . . . . . . . . . . . . 
            1 . . . . . . . . . . 1 
            1 . . . . . . . . . . 1 
            1 . . . . . . . . . . 1 
            1 1 1 1 . . . . 1 1 1 1 
            `)
        PowerUp = "Empty"
    }
})
forever(function () {
    for (let value of sprites.allOfKind(SpriteKind.Snail)) {
        if (value.tileKindAt(TileDirection.Left, assets.tile`tile35`) && value.isHittingTile(CollisionDirection.Left)) {
            sprites.setDataNumber(value, "Right", 1)
        }
        if (value.tileKindAt(TileDirection.Right, assets.tile`tile34`) && value.isHittingTile(CollisionDirection.Right)) {
            sprites.setDataNumber(value, "Right", -1)
        }
        if (value.tileKindAt(TileDirection.Left, assets.tile`tile7`) && value.isHittingTile(CollisionDirection.Left)) {
            sprites.setDataNumber(value, "Right", 1)
        }
        if (value.tileKindAt(TileDirection.Right, assets.tile`tile5`) && value.isHittingTile(CollisionDirection.Right)) {
            sprites.setDataNumber(value, "Right", -1)
        }
        if (value.tileKindAt(TileDirection.Right, assets.tile`tile2`) && value.isHittingTile(CollisionDirection.Right)) {
            if (value.isHittingTile(CollisionDirection.Bottom)) {
                sprites.setDataNumber(value, "Gravity", 0)
                for (let index = 0; index < 8; index++) {
                    value.y += -2
                    pause(20)
                }
                sprites.setDataNumber(value, "Gravity", 8)
            }
        }
        if (value.tileKindAt(TileDirection.Left, assets.tile`tile4`) && value.isHittingTile(CollisionDirection.Left)) {
            if (value.isHittingTile(CollisionDirection.Bottom)) {
                sprites.setDataNumber(value, "Gravity", 0)
                for (let index = 0; index < 8; index++) {
                    value.y += -2
                    pause(20)
                }
                sprites.setDataNumber(value, "Gravity", 8)
            }
        }
        if (value.tileKindAt(TileDirection.Right, assets.tile`tile23`) && value.isHittingTile(CollisionDirection.Right)) {
            if (value.isHittingTile(CollisionDirection.Bottom)) {
                sprites.setDataNumber(value, "Gravity", 0)
                for (let index = 0; index < 8; index++) {
                    value.y += -2
                    pause(20)
                }
                sprites.setDataNumber(value, "Gravity", 8)
            }
        }
        if (value.tileKindAt(TileDirection.Left, assets.tile`tile23`) && value.isHittingTile(CollisionDirection.Left)) {
            if (value.isHittingTile(CollisionDirection.Bottom)) {
                sprites.setDataNumber(value, "Gravity", 0)
                for (let index = 0; index < 8; index++) {
                    value.y += -2
                    pause(20)
                }
                sprites.setDataNumber(value, "Gravity", 8)
            }
        }
    }
})
forever(function () {
    if (controller.down.isPressed() && controller.A.isPressed()) {
        if (BlockStore == 0) {
            if (thePlayer.tileKindAt(TileDirection.Bottom, assets.tile`tile23`)) {
                for (let value of tiles.getTilesByType(assets.tile`tile23`)) {
                    tiles.setTileAt(value, assets.tile`tile0`)
                    tiles.setWallAt(value, false)
                    pause(200)
                    BlockStore = 1
                }
            }
        } else {
            if (BlockStore > 0) {
                if (thePlayer.isHittingTile(CollisionDirection.Bottom)) {
                    if (BlockStore == 1) {
                        if (FlipHoriz == 1) {
                            if (thePlayer.tileKindAt(TileDirection.Left, assets.tile`tile0`) && playerTileColumn >= 1) {
                                tiles.setTileAt(tiles.getTileLocation(Math.floor(playerTileColumn - 1), playerTileRow), assets.tile`tile23`)
                                tiles.setWallAt(tiles.getTileLocation(Math.floor(playerTileColumn - 1), playerTileRow), true)
                                pause(200)
                                BlockStore = 0
                            }
                        } else {
                            if (thePlayer.tileKindAt(TileDirection.Right, assets.tile`tile0`) && playerTileColumn < LevelWidth - 1) {
                                tiles.setTileAt(tiles.getTileLocation(Math.ceil(playerTileColumn + 0), playerTileRow), assets.tile`tile23`)
                                tiles.setWallAt(tiles.getTileLocation(Math.ceil(playerTileColumn + 0), playerTileRow), true)
                                pause(200)
                                BlockStore = 0
                            }
                        }
                    }
                }
            }
        }
    }
    if (thePlayer.tileKindAt(TileDirection.Bottom, assets.tile`tile36`)) {
        for (let value of tiles.getTilesByType(assets.tile`tile36`)) {
            pause(200)
            tiles.setTileAt(value, assets.tile`tile32`)
            tiles.setWallAt(value, true)
        }
    }
    if (thePlayer.tileKindAt(TileDirection.Bottom, assets.tile`tile32`)) {
        for (let value of tiles.getTilesByType(assets.tile`tile32`)) {
            pause(500)
            tiles.setTileAt(value, assets.tile`tile37`)
            tiles.setWallAt(value, true)
        }
    }
    if (thePlayer.tileKindAt(TileDirection.Bottom, assets.tile`tile37`)) {
        for (let value of tiles.getTilesByType(assets.tile`tile37`)) {
            pause(500)
            tiles.setTileAt(value, assets.tile`tile0`)
            tiles.setWallAt(value, false)
        }
    }
})
forever(function () {
    SnailAnimFrame = 1
    pause(200)
    SnailAnimFrame = 2
    pause(200)
})
forever(function () {
    for (let value of sprites.allOfKind(SpriteKind.Snail)) {
        if (value.tileKindAt(TileDirection.Bottom, assets.tile`tile28`)) {
            value.vy = -50
            pause(300)
            value.setFlag(SpriteFlag.Invisible, true)
            pause(500)
            tiles.placeOnRandomTile(value, assets.tile`tile31`)
            value.y += -5
            value.x += 12
            value.setFlag(SpriteFlag.Invisible, false)
        }
        if (value.tileKindAt(TileDirection.Right, assets.tile`tile46`)) {
            value.vy = -50
            pause(300)
            value.setFlag(SpriteFlag.Invisible, true)
            pause(500)
            tiles.placeOnRandomTile(value, assets.tile`tile44`)
            value.y += -16
            value.vy = -50
            value.setFlag(SpriteFlag.Invisible, false)
        }
    }
})
