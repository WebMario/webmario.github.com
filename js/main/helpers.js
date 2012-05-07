function generateFromTo(x, y, w, h, func) {
    for(var xa = x; xa < x+w; xa++) {
        for(var ya = y; ya < y+h; ya++) {
            func(xa, ya);
        }
    }
}