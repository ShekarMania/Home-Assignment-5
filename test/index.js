/*
 * this is test runner
 */

// Dependencies
const lib = require('./../app/lib')
const assert = require('assert')

// app for test runner
let _app = {}

// container for test
_app.tests = {
  'unit': {}
}

// Assert that generateToken returns a string
_app.tests.unit['helpers.generateToken should return random string'] = (done) => {
  let str = lib.generateToken(10)
  assert.equal(typeof(str),'string')
  done()
}

// Assert that generateToken returns a token of length we need
_app.tests.unit['helpers.generateToken should return random string of length we provide'] = (done) => {
  const len = 10
  let str = lib.generateToken(len)
  assert.equal(str.length,len)
  done()
}

// Assert that checkPalindrome returns a bolean
_app.tests.unit['helpers.checkPalindrome should return boolean'] = (done) => {
  const str = "Hello"
  let res = lib.checkPalindrome(str)
  assert.equal('boolean',typeof(res))
  done()
}

// Assert that checkPalindrome returns -1 when given wrong inputs
_app.tests.unit['helpers.checkPalindrome should return -1 when wrong inputs are given'] = (done) => {
  const str = 1
  let res = lib.checkPalindrome(str)
  assert.equal(res,-1)
  done()
}

// Count all the tests
_app.countTests = () => {
  let counter = 0
  for(let key in _app.tests){
     if(_app.tests.hasOwnProperty(key)){
       let subTests = _app.tests[key]
       for(let testName in subTests){
          if(subTests.hasOwnProperty(testName)){
            counter++
          }
       }
     }
  }
  return counter
}

// Run all the tests, collecting the errors and successes
_app.runTests = ()=>{
  let errors = []
  let successes = 0
  let limit = _app.countTests()
  let counter = 0
  for(let key in _app.tests){
     if(_app.tests.hasOwnProperty(key)){
       let subTests = _app.tests[key]
       for(let testName in subTests){
          if(subTests.hasOwnProperty(testName)){
            (()=>{
              let tmpTestName = testName
              let testValue = subTests[testName]
              // Call the test
              try{
                testValue(()=>{

                  // If it calls back without throwing, then it succeeded, so log it in green
                  console.log('\x1b[32m%s\x1b[0m',tmpTestName)
                  counter++
                  successes++
                  if(counter == limit){
                    _app.produceTestReport(limit,successes,errors)
                  }
                })
              } catch(e){
                // If it throws, then it failed, so capture the error thrown and log it in red
                errors.push({
                  'name' : testName,
                  'error' : e
                })
                console.log('\x1b[31m%s\x1b[0m',tmpTestName)
                counter++
                if(counter == limit){
                  _app.produceTestReport(limit,successes,errors)
                }
              }
            })()
          }
       }
     }
  }
}


// Product a test outcome report
_app.produceTestReport = (limit,successes,errors) => {
  console.log("")
  console.log("--------BEGIN TEST REPORT--------")
  console.log("")
  console.log("Total Tests: ",limit)
  console.log("Pass: ",successes)
  console.log("Fail: ",errors.length)
  console.log("")

  // If there are errors, print them in detail
  if(errors.length > 0){
    console.log("--------BEGIN ERROR DETAILS--------")
    console.log("")
    errors.forEach((testError) => {
      console.log('\x1b[31m%s\x1b[0m',testError.name)
      console.log(testError.error)
      console.log("")
    })
    console.log("")
    console.log("--------END ERROR DETAILS--------")
  }
  console.log("")
  console.log("--------END TEST REPORT--------")
  process.exit(0)

}

// Run the tests
_app.runTests()
