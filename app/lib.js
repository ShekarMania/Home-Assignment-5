/*
 * Random Functions
 * lib file
 */

// Dependencies


let lib = {}

// Generate Random String
lib.generateToken = (strLength = 20) => {
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false
  if (strLength) {
    possibleChars = 'abcdefghijklomnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012346789'
    randomString = ''
    let i = 1
    while (i <= strLength) {
      randomString += possibleChars.charAt(Math.floor(Math.random() * Math.floor(possibleChars.length)))
      i++
    }
    return randomString
  } else {
    return false
  }
}
// Input string
// output true or false (palindrome or not)
lib.checkPalindrome = (str) => {
  // sanity check
  str = typeof(str) === 'string' && str.length > 0 ? str : false
  if(str) {
      let reverseStr = str.split("").reverse().join("")
      if(str === reverseStr){
        return true
      } else {
        return false
      }
  } else {
    return -1
  }
}

module.exports = lib
