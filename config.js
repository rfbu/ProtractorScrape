exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  SELENIUM_PROMISE_MANAGER: false,
  specs: ['specPt4.js'],
   getPageTimeout: 100000
};

/*
resource
https://chariotsolutions.com/blog/post/simplify-protractor-web-tests-with-async-and-await/
https://www.protractortest.org/#/async-await

*/