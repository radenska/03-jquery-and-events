//  Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};


articleView.populateFilters = function() {
  $('article').not('.template').each(function() {
    var authorName, category, optionTag;
    authorName = $(this).find('address a').text();
    optionTag = '<option value="' + authorName + '">' + authorName + '</option>';
    $('#author-filter').append(optionTag);
    category = $(this).attr('data-category');
    optionTag = '<option value="' + category + '">' + category + '</option>';
    if ($('#category-filter option[value="' + category + '"]').length === 0) {
      $('#category-filter').append(optionTag);
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      var newAuthor = $(this).val();
      /* DONE: If the select box changes to an option that has a value, we should:*/

      $('article').not('.template').each(function() {
        var authorName;
        authorName = $(this).find('address a').text();
        if (!(authorName === newAuthor)){
          $(this).fadeOut();
        } else {
          $(this).fadeIn();
        }
      });
    } else {
      /* Otherwise, we should:
      1. Show all the articles except the template */
      $('article').not('.template').each(function() {
        $(this).fadeIn();
      });
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  /* DONE: Just like we do for #author-filter above, we should also handle
  change events on the #category-filter element. Be sure to reset the
  #author-filter while you're at it! */
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      var newCategory = $(this).val();
      $('article').not('.template').each(function() {
        var categoryName;
        categoryName = $(this).attr('data-category');
        if (!(categoryName === newCategory)){
          $(this).fadeOut();
        } else {
          $(this).fadeIn();
        }
      });
    } else {
      $('article').not('.template').each(function() {
        $(this).fadeIn();
      });
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function() {
    /* DONE, goddammit!:
      1. Hide all of the .tab-content sections
      2. Fade in the single .tab-content section that is
        associated with the .tab element's data-content attribute.
    */
    $('.tab-content').hide();
    var thingClicked = $(this).attr('data-content');
    $('#' + thingClicked).fadeIn();
  });
  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  // Truncate logic to show only first two elements within the article body.
  $('.article-body *:nth-of-type(n+2)').hide();
  /* DONE: Add a delegated event handler to reveal the remaining paragraphs.
    When a .read-on link is clicked, we can:
    1. Prevent the default action of a link.
    2. Reveal everything in that particular article now.
    3. Hide that read-on link!

    // STRETCH GOAl!: change the 'Read On' link to 'Show Less'
  */
  $('.read-on').on('click', function() {
    event.preventDefault();
    $(this).siblings('.article-body').children().css('display', 'block').show();
    $(this).text('Show Less'); //not functional button, just the text is different!
  });
};

// DONE: Invoke all of the above functions (I mean, methods!):
function invoke (articleView){
  articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
}

invoke(articleView);
