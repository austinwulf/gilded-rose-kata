describe("Gilded Rose", function() {

  /*
    Rules:

    - sell-in: # of days we have to sell item
    - quality: how valuable item is
    - each tick sell-in -= 1 && quality -= 1
    - while sell-in < 0, quality -= 2
    - quality >= 0 && quality <= 50 always

    - "Sulfuras" sell-in === quality === Infinity
    - each tick, "Aged Brie" quality += 1
    - each tick, "Conjured" quality -= 2
    - each tick, "Backstage passes" quality += 1
    - each tick, "Backstage passes"
        if sell-in <= 10 quality += 2
        if sell-in <= 5 quality += 3
        if sell-in <= 0 quality = 0
   */

  it('decrements the sell-in by one', function() {
    var items = update_quality([ new Item('💩', 1, 1) ])
    expect(items[0].sell_in).toEqual(0)

    var items = update_quality([ new Item('💩', 2, 1) ])
    expect(items[0].sell_in).toEqual(1)
  })

  it('decrements the quality by one', function() {
    var items = update_quality([ new Item('💩', 1, 1) ])
    expect(items[0].quality).toEqual(0)

    var items = update_quality([ new Item('💩', 1, 2) ])
    expect(items[0].quality).toEqual(1)
  })

  it('decrements quality by two when sell-in is below 0', function() {
    var items = update_quality([ new Item('💩', -1, 4) ])
    expect(items[0].quality).toEqual(2)

    var items = update_quality([ new Item('💩', 0, 2) ])
    expect(items[0].quality).toEqual(0)
  })

  it('does not decrement quality below 0', function() {
    var items = update_quality([ new Item('💩', 0, 0) ])
    expect(items[0].quality).toEqual(0)

    var items = update_quality([ new Item('💩', 1, -5) ])
    expect(items[0].quality).toEqual(-5)
  })

  it('does not increment quality above 50', function() {
    var items = update_quality([ new Item('Aged Brie', 2, 50) ])
    expect(items[0].quality).toEqual(50)

    var items = update_quality([ new Item('Aged Brie', 1, 100) ])
    expect(items[0].quality).toEqual(100)
  })

  it('does not change the value or sell-in of Sulfuras', function() {
    var items = update_quality([ new Item('Sulfuras', 0, 80) ])
    expect(items[0].sell_in).toEqual(0)
    expect(items[0].quality).toEqual(80)

    var items = update_quality([ new Item('Sulfuras', -1, 80) ])
    expect(items[0].sell_in).toEqual(-1)
    expect(items[0].quality).toEqual(80)
  })

  it('increments the quality of Aged Brie', function() {
    var items = update_quality([ new Item('Aged Brie', 2, 1) ])
    expect(items[0].quality).toEqual(2)

    var items = update_quality([ new Item('Aged Brie', 1, 0) ])
    expect(items[0].quality).toEqual(1)
  })

  it('decrements the quality of Conjured items by 2', function() {
    var items = update_quality([ new Item('Conjured', 2, 4) ])
    expect(items[0].quality).toEqual(2)

    var items = update_quality([ new Item('Conjured', 3, 10) ])
    expect(items[0].quality).toEqual(8)
  })

  it('increments the quality of Backstage passes', function() {
    var items = update_quality([ new Item('Backstage passes', 20, 1) ])
    expect(items[0].quality).toEqual(2)

    var items = update_quality([ new Item('Backstage passes', 15, 0) ])
    expect(items[0].quality).toEqual(1)
  })

  it('increments the quality of Backstage passes by 2 when sell-in is 10 or below', function() {
    var items = update_quality([ new Item('Backstage passes', 10, 1) ])
    expect(items[0].quality).toEqual(3)

    var items = update_quality([ new Item('Backstage passes', 8, 4) ])
    expect(items[0].quality).toEqual(6)
  })

  it('increments the quality of Backstage passes by 3 when sell-in is 5 or below', function() {
    var items = update_quality([ new Item('Backstage passes', 5, 1) ])
    expect(items[0].quality).toEqual(4)

    var items = update_quality([ new Item('Backstage passes', 3, 5) ])
    expect(items[0].quality).toEqual(8)
  })

  it('sets quality to 0 for Backstage passes when sell-in is 0 or below', function() {
    var items = update_quality([ new Item('Backstage passes', 1, 10) ])
    expect(items[0].quality).toEqual(0)

    var items = update_quality([ new Item('Backstage passes', -1, 0) ])
    expect(items[0].quality).toEqual(0)
  })

});
