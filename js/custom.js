$(window).load(function () {

    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    loadLanguage(userPreferredLanguage);

    $('.lang-choice').on('click', function(e) {
        e.preventDefault();
        $(this).prop("disabled", true);
        var selectedLang = $(this).data('lang');
        loadLanguage(selectedLang);
        setLanguagePreference(selectedLang)
    });

    $('.lang-choice').prop("disabled", function() {
        return $(this).data('lang') == userPreferredLanguage;
    }).css('opacity', function() {
        return $(this).data('lang') == userPreferredLanguage ? '1' : '0.3';
    }).hover(function() {
        $(this).css('opacity', '1');
    }, function() {
        $(this).css('opacity', function() {
            return $(this).data('lang') == userPreferredLanguage ? '1' : '0.3';
        });
    });
    
    
    // preloader
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(550).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(550).css({
        'overflow': 'visible'
    });


    //  isotope
    var $container = $('.portfolio_container');
    $container.isotope({
        filter: '*',
    });

    $('.portfolio_filter a').click(function () {
        $('.portfolio_filter .active').removeClass('active');
        $(this).addClass('active');

        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 500,
                animationEngine: "jquery"
            }
        });
        return false;
    });

    // back to top
    var offset = 300,
        offset_opacity = 1200,
        scroll_top_duration = 0 /*700*/,
        $back_to_top = $('.cd-top');

    //hide or show the "back to top" link
    $(window).scroll(function () {
        ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible'): $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if ($(this).scrollTop() > offset_opacity) {
            $back_to_top.addClass('cd-fade-out');
        }
    });

    //smooth scroll to top
    $back_to_top.on('click', function (event) {
        event.preventDefault();
        $('body,html').animate({
            scrollTop : 0,
        }, scroll_top_duration);
    });

    // input
    $(".input-contact input, .textarea-contact textarea").focus(function () {
        $(this).next("span").addClass("active");
    });
    $(".input-contact input, .textarea-contact textarea").blur(function () {
        if ($(this).val() === "") {
            $(this).next("span").removeClass("active");
        }
    });
});

function loadLanguage(lang) {
    $('html').attr('lang', lang);
    $.getJSON('../languages/' + lang + '.json', function(translations) {
        $('[data-translate]').each(function() {
            var key = $(this).data('translate');
            $(this).html(translations[key] || 'Missing translation');
        });
    });
}

function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    location.reload();
}