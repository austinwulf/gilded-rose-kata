function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

function update_quality(items) {
  return items.map(function(item) {
    var name = item.name
    var sellIn = item.sell_in - 1
    var quality = item.quality

    switch (true) {
      case isType('Aged Brie', item):
        return new Item(name, sellIn, increment(1, quality))

      case isType('Sulfuras', item):
        return new Item(name, item.sell_in, quality)

      case isType('Conjured', item):
        return new Item(name, sellIn, decrement(2, quality))

      case isType('Backstage pass', item):
        return updateBackstagePass(item)

      case isExpired(item):
        return new Item(name, sellIn, decrement(2, quality))

      default:
        return new Item(name, sellIn, decrement(1, quality))
    }
  })
}

function isExpired(item) {
  return item.sell_in <= 0
}

function isType(type, item) {
  var regex = new RegExp(type.toLowerCase())
  return regex.test(item.name.toLowerCase())
}

function increment(amount, quality) {
  return quality < 50 ? (quality + amount) : quality
}

function decrement(amount, quality) {
  return quality > 0 ? (quality - amount) : quality
}

function updateBackstagePass(item) {
  var sellIn = item.sell_in - 1
  var quality = item.quality

  if (sellIn <= 0) quality = 0
  else if (sellIn <= 5) quality = increment(3, quality)
  else if (sellIn <= 10) quality = increment(2, quality)
  else if (sellIn > 10) quality = increment(1, quality)

  return new Item(item.name, sellIn, quality)
}
