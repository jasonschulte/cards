var prefix = Deck.prefix
var transform = prefix('transform')
var translate = Deck.translate
var $container = document.getElementById('container')
var $hand = document.getElementById('hand')
var $topbar = document.getElementById('topbar')
var $shuffle = document.createElement('button')

$shuffle.textContent = 'Shuffle'
$topbar.appendChild($shuffle)

var deck = Deck(true)

deck.cards.forEach(function (card, i) {
  card.enableDragging()
  card.enableFlipping()
})

$shuffle.addEventListener('click', function () {
  deck.shuffle()
  deck.shuffle()
})
setTimeout(function(){
  card = deck.cards[53];
  card.setSide('front');
  card.animateTo({
    delay: 100,
    duration: 100,
    x:-200,
    y:-150
  })
  console.log(card);
  //console.log(deck.SuitName());
  // console.log(card.rank + ' of ' + deck.SuitName(1))
  // card2 = Card(0);
  // card2.setSide('front');
  // console.log(card2);
  // card2.mount($hand);
},5000)

deck.mount($container);
