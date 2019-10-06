var algebraCyclic = require('./algebra-cyclic.js')
var algebraRing = require('algebra-ring')
var test = require('tape')

test('Cyclic ring of vowels', function (t) {
  t.plan(48)

  var vowel = algebraCyclic('aeiou')

  t.ok(vowel.contains('a'))
  t.ok(vowel.contains('e'))
  t.ok(vowel.contains('i'))
  t.ok(vowel.contains('o'))
  t.ok(vowel.contains('u'))

  t.notOk(vowel.contains('0'))
  t.notOk(vowel.contains('1'))
  t.notOk(vowel.contains('2'))
  t.notOk(vowel.contains('*'))

  t.equal(vowel.addition('a', 'a'), 'a')
  t.equal(vowel.addition('a', 'e'), 'e')
  t.equal(vowel.addition('a', 'i'), 'i')
  t.equal(vowel.addition('a', 'o'), 'o')
  t.equal(vowel.addition('a', 'u'), 'u')
  t.equal(vowel.addition('e', 'e'), 'i')
  t.equal(vowel.addition('e', 'i'), 'o')
  t.equal(vowel.addition('e', 'o'), 'u')
  t.equal(vowel.addition('i', 'i'), 'u')
  t.equal(vowel.addition('i', 'o'), 'a')
  t.equal(vowel.addition('i', 'u'), 'e')
  t.equal(vowel.addition('o', 'o'), 'e')
  t.equal(vowel.addition('o', 'u'), 'i')
  t.equal(vowel.addition('u', 'u'), 'o')

  t.equal(vowel.subtraction('a', 'a'), 'a')
  t.equal(vowel.subtraction('a', 'e'), 'u')
  t.equal(vowel.subtraction('a', 'i'), 'o')
  t.equal(vowel.subtraction('a', 'o'), 'i')
  t.equal(vowel.subtraction('a', 'u'), 'e')
  t.equal(vowel.subtraction('e', 'e'), 'a')
  t.equal(vowel.subtraction('e', 'i'), 'u')
  t.equal(vowel.subtraction('e', 'o'), 'o')
  t.equal(vowel.subtraction('e', 'u'), 'i')
  t.equal(vowel.subtraction('i', 'i'), 'a')
  t.equal(vowel.subtraction('i', 'o'), 'u')
  t.equal(vowel.subtraction('i', 'u'), 'o')
  t.equal(vowel.subtraction('o', 'o'), 'a')
  t.equal(vowel.subtraction('o', 'u'), 'u')
  t.equal(vowel.subtraction('u', 'u'), 'a')

  t.equal(vowel.negation('a'), 'a')
  t.equal(vowel.negation('e'), 'u')
  t.equal(vowel.negation('i'), 'o')
  t.equal(vowel.negation('o'), 'i')
  t.equal(vowel.negation('u'), 'e')

  t.throws(function () {
    vowel.inversion('a')
  }, new RegExp(algebraRing.cannotDivideByZero))

  t.equal(vowel.inversion('e'), 'e')
  t.equal(vowel.inversion('i'), 'o')
  t.equal(vowel.inversion('o'), 'i')
  t.equal(vowel.inversion('u'), 'u')
})

test('Cyclic ring of vowels', function (t) {
  t.plan(2)

  t.throws(function () {
    algebraCyclic(['length', 'of', 'this', 'is', 'not', 'prime'])
  }, new RegExp(algebraCyclic.numberOfElementsIsNotPrime))

  t.throws(function () {
    algebraCyclic([1, 2, 1])
  }, new RegExp(algebraCyclic.elementsAreNotUnique))
})
