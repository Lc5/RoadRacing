(function($, Drupal) {

    "use strict";

    Drupal.behaviors.Magazine = {

        attach: function(context, settings) {

            $('.btn-btt').smoothScroll({
                speed: 1000
            });

            if ($(window).scrollTop() <= 200) {
                $('.btn-btt').hide();
            }

            Drupal.Magazine.initUserMenu();
            Drupal.Magazine.showSecondaryMenu();


            if ($("#search-block-form [name='keys']").val() === "") {
                $("#search-block-form input[name='keys']").val(Drupal.t("Keywords"));
            }
            $("#search-block-form input[name='keys']").focus(function() {
                if ($(this).val() === Drupal.t("Keywords")) {
                    $(this).val("");
                }
            }).blur(function() {
                if ($(this).val() === "") {
                    $(this).val(Drupal.t("Keywords"));
                }
            });



            if ($("#search-form [name='keys']").val() === "") {
                $("#search-form input[name='keys']").val(Drupal.t("Keywords"));
            }
            $("#search-form input[name='keys']").focus(function() {
                if ($(this).val() === Drupal.t("Keywords")) {
                    $(this).val("");
                }
            }).blur(function() {
                if ($(this).val() === "") {
                    $(this).val(Drupal.t("Keywords"));
                }
            });


            $(window).scroll(function() {
                if ($(window).scrollTop() > 200) {
                    $('.btn-btt').show();
                } else {
                    $('.btn-btt').hide();
                }
            }).resize(function() {
                if ($(window).scrollTop() > 200) {
                    $('.btn-btt').show();
                } else {
                    $('.btn-btt').hide();
                }
            });


            // Mobile menu

            $('#menu-toggle').mobileMenu({
                targetWrapper: '#primary-menu',
                // targetMenu: '#block-magazine-main-menu',
            });

            $('#main-menu-toggle').mobileMenu({
                targetWrapper: '#sports-menu',
                toggledClass: 'second-toggled',
                // targetMenu: '#block-sportsmenu'
            });

            var base_path = drupalSettings.path.baseUrl;
            fixImageSources();
            function fixImageSources() {
                (jQuery)('img').each(function(i, e) {
                    var self = (jQuery)(this);
                    var src = self.attr('src');
                    if (src.indexOf('/sites/default') > 0) {
                        var tmphref = src.split('sites/default')[0];
                        src = src.replace(tmphref, base_path);
                        self.attr('src', src);
                    }
                });
            }
        }
    };

    $(window).load(function() {
        Drupal.Magazine.addViewFieldSet(".wp-bet-odds .view-content", 3, 6);
        Drupal.Magazine.addViewFieldSet(".view-content #frontpage-content", 1, 4);
        Drupal.Magazine.addViewFieldSet(".view-content #taxonomy-content", 2, 6);
        Drupal.Magazine.addViewFieldSet(".view-content #latest_news-content", 2, 6);
        $('.views-view-grid .views-row .views-col').matchHeight({ property: 'min-height' });
        $('.views-view-grid .views-row .views-field-title').matchHeight({ property: 'min-height' });
        // $('.block-views-blockrecent-updated-block-2 .views-row .views-col').matchHeight({ property: 'min-height' });
        
    });

    Drupal.Magazine = Drupal.Magazine || {};

    Drupal.Magazine.initUserMenu = function() {
        $('i.wp-icon-user-login').click(function() {
            $('#wp-user-wrapper').toggle();
        });
    };

    Drupal.Magazine.addViewFieldSet = function(parent_key, start_index, end_index) {

        var parent = jQuery(parent_key);
        parent.children().each(function() {
            jQuery(this).children().slice(start_index, end_index).wrapAll(
                '<div class="field-group-wrapper views-fieldset"></div>'
            );
        });
    }

    Drupal.Magazine.showSecondaryMenu = function() {
        $('.secondary-menu-button').click(function() {
            console.log('Drupal.Magazine.showSecondaryMenu');
            $('#secondary-menu.in').css({
                'width': 'auto'
            });
        })
    };



})(jQuery, Drupal);
