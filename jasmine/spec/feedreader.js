/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    describe("RSS Feeds", function() {
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      it("URL is defined and not empty", function() {
        allFeeds.forEach(function(feed) {
          expect(feed.url).toBeDefined();
          expect(feed.url).not.toBe("");
        });
      });

      it("name is defined and not empty", function() {
        allFeeds.forEach(function(feed) {
          expect(feed.name).toBeDefined();
          expect(feed.name).not.toBe("");
        });
      });
    });

    describe("The menu", function() {
      function isVisible() {
        return $("body").hasClass("menu-hidden");
      }

      it("should be hidden by default", function() {
        expect(isVisible()).toBe(true);
      });

      it("should toggle visibility when icon is clicked", function() {
        const currentVisibility = isVisible();
        $(".menu-icon-link").click();
        expect(isVisible()).not.toBe(currentVisibility);
        $(".menu-icon-link").click();
        expect(isVisible()).toBe(currentVisibility);
      });
    });

    describe("Initial Entries", function() {
      beforeEach(function(done) {
        loadFeed(0, done);
      });

      it("loadFeed is defined and load at least one feed", function() {
        expect($(".feed .entry").length).toBeGreaterThan(0);
      });
    });

    describe("New Feed Selection", function() {
      let previousContent = "";
      beforeEach(function(done) {
        loadFeed(0, function() {
          previousContent = $(".feed .entry")[0].innerHTML;
          done();
        });
      });

      it("should change content", function(done) {
        loadFeed(1, function() {
          expect($(".feed .entry")[0].innerHTML).not.toBe(previousContent);
          done();
        });
      });
    });
  })()
);
