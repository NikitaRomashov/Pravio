function canUseWebp() {
    let elem = document.createElement('canvas');
    if (!!(elem.getContext && elem.getContext('2d'))) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }
    return false;
}
window.onload = function () {
    let images = document.querySelectorAll('[data-bg]');
    for (let i = 0; i < images.length; i++) {
        let image = images[i].getAttribute('data-bg');
        images[i].style.backgroundImage = 'url(' + image + ')';
    }

    let isitFirefox = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./);
    let firefoxVer = isitFirefox ? parseInt(isitFirefox[1]) : 0;

    if (canUseWebp() || firefoxVer >= 65) {
        let imagesWebp = document.querySelectorAll('[data-bg-webp]');
        for (let i = 0; i < imagesWebp.length; i++) {
            let imageWebp = imagesWebp[i].getAttribute('data-bg-webp');
            imagesWebp[i].style.backgroundImage = 'url(' + imageWebp + ')';
        }
    }
};
$(window).on('load', function () {
    const body = $('body')
    const header = $('.header__inner')
    body.css('margin-right', calcScroll())
    header.css('transform', 'translateX(' + -calcScroll() / 2 + 'px)')
    setTimeout(function () {
        $('.loader').fadeOut(500, function () {
            $(this).remove()
            if (body.hasClass('hidden--loader')) {
                body.delay(400).removeClass('hidden--loader')
                body.css('margin-right', '')
                header.css('transform', '')

            }
        })
    }, 500)
})

function calcScroll() {
    let div = document.createElement('div')
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
}

$(function () {
    svg4everybody({})
    const headerUser = () => {
        const container = $('.header__user-btn')
        const dropdownSearch = $('.header__search-dropdown')
        container.on('click', function (e) {
            e.stopPropagation();
            $(this).next().slideToggle(200)
            dropdownSearch.slideUp()
        })
        $(document).on('click', function (e) {
            const target = e.target;
            if (!container.next().is(target) && container.next().has(target).length === 0) {
                container.next().slideUp(200)
            }
        });
    }
    const headerSearch = () => {
        const btn = $('.header__search-btn')
        const search = $('.header__search-dropdown')
        const dropdownUser = $('.header__user-dropdown')
        btn.on('click', function (e) {
            e.stopPropagation();
            $(this).siblings(search).slideToggle(200)
            dropdownUser.slideUp()
        })
        $(document).on('click', function (e) {
            const target = e.target;
            if (!btn.siblings(search).is(target) && btn.siblings(search).has(target).length === 0) {
                btn.siblings(search).slideUp(200)
            }
        });
    }
    const menu = () => {
        const btn = $('.burger')
        const menu = $('.menu')
        const info = $('.header__info')
        const phone = $('.header__phone')
        const header = $('.header')
        const body = $('body')

        function responsivePhone() {
            const w = $(window).width()
            if (w <= 772) {
                if (btn.hasClass('open')) {
                    phone.remove()
                    menu.append(phone)
                    phone.addClass('header__phone--open')
                    body.addClass('hidden')
                } else {
                    phone.removeClass('header__phone--open')
                    body.removeClass('hidden')
                    $('.header__inner > *:nth-child(1)').after(phone)
                }
            } else {
                info.prepend(phone)
            }
        }

        responsivePhone()
        btn.on('click', function () {
            $(this).toggleClass('open')
            menu.slideToggle()
            header.toggleClass('header--open')
            info.toggleClass('header__info--open')
            body.toggleClass('hidden')
            responsivePhone()
        })

        function responsiveMenu() {
            const w = $(window).width()
            if (w >= 1100) {
                btn.removeClass('open')
                menu.removeAttr('style')
                header.removeClass('header--open')
                info.removeClass('header__info--open')
                body.removeClass('hidden')
            }
        }

        responsiveMenu()
        $(window).resize(function (e) {
            responsivePhone()
            responsiveMenu()
        });
    }
    const certificatesSlider = () => {
        $('.certificates__slider').slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            touchThreshold: 40,
            appendArrows: '.certificates__arrows',
            nextArrow: '<button class="section-arrow section-arrow--bg-green section-arrow--next"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
            prevArrow: '<button class="section-arrow section-arrow--bg-green section-arrow--prev"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
            responsive: [
                {
                    breakpoint: 1131,
                    settings: {
                        slidesToShow: 5,
                    }
                },
                {
                    breakpoint: 973,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 773,
                    settings: {
                        slidesToShow: 3,
                        rows: 2
                    }
                },
                {
                    breakpoint: 451,
                    settings: {
                        slidesToShow: 2,
                        rows: 2
                    }
                }
            ]
        })
    }
    const teamSlider = () => {
        const link = $(".team__tab-link")
        $('.team__slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            touchThreshold: 40,
            appendArrows: '.team__arrows',
            nextArrow: '<button class="section-arrow section-arrow--bg-green section-arrow--next"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
            prevArrow: '<button class="section-arrow section-arrow--bg-green section-arrow--prev"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
            responsive: [
                {
                    breakpoint: 661,
                    settings: {
                        fade: true
                    }
                }
            ]
        }).on('afterChange', function () {
            let dataId = $('.slick-current').attr("data-slick-index");
            link.each(function () {
                if ($(this).attr('data-id') === dataId) {
                    link.parent().removeClass('team__tab--active')
                    $(this).parent().addClass('team__tab--active')
                }
            })
        });
        link.on("click", function (e) {
            e.preventDefault()
            $('.team__slider').slick('slickGoTo', $(this).attr('data-id'));
            link.parent().removeClass('team__tab--active')
            $(this).parent().addClass('team__tab--active')
        });
    }
    const reviewsSlider = () => {
        $('.reviews__slider').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            appendArrows: '.reviews__arrows',
            touchThreshold: 40,
            nextArrow: '<button class="section-arrow section-arrow--bg-green section-arrow--next"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
            prevArrow: '<button class="section-arrow section-arrow--bg-green section-arrow--prev"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
            responsive: [
                {
                    breakpoint: 793,
                    settings: {
                        rows: 2,
                        slidesToShow: 1,
                        fade: true
                    }
                }
            ]
        })
    }
    const answersSlider = () => {
        $('.answers__slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            appendArrows: '.answers__arrows',
            touchThreshold: 40,
            nextArrow: '<button class="section-arrow section-arrow--bg-blue section-arrow--next"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
            prevArrow: '<button class="section-arrow section-arrow--bg-blue section-arrow--prev"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
            rows: 4,
            fade: true
        })

        function previewResponsive() {
            const w = $(window).width()
            const elem = $('.answers__preview-category')
            elem.each(function () {
                if (w <= 900) {
                    const content = $(this).closest('.answers__preview').find('.answers__preview-head')
                    const $thisElem = $(this).remove()
                    content.append($thisElem)
                } else {
                    const content = $(this).closest('.answers__preview').find('.answers__preview-bottom > *:nth-child(1)')
                    const $thisElem = $(this).remove()
                    content.after($thisElem)
                }

            })
        }

        previewResponsive()
        $(window).resize(function () {
            previewResponsive()
        })
    }
    const tabs = () => {
        const tab = $('.information__tab')
        const content = $('.information__box')
        content.hide()
        content.first().show()
        tab.first().addClass('information__tab--active')
        tab.on('click', function () {
            const $this = $(this)
            content.each(function () {
                if ($(this).attr('data-content') === $this.attr('data-href') && !$this.hasClass('information__tab--active')) {
                    content.slideUp()
                    tab.removeClass('information__tab--active')
                    $this.addClass('information__tab--active')
                    $(this).slideDown()
                }
            })
        })
    }
    const readMore = () => {
        $('.information__excerpt').on('click', function (e) {
            e.preventDefault()
            $('.information__text').slideDown()
            $(this).remove()
        })
        function readMoreCategory(id) {
            $(id + ' .category__link').slice(0, 12).show({
                start: function () {
                    $(this).css({
                        display: "flex"
                    })
                }
            })
            $(id + ' .category__btn').on('click', function (e) {
                e.preventDefault();
                $(id + ' .category__link:hidden').slice(0, 12).slideDown({
                    start: function () {
                        $(this).css({
                            display: "flex"
                        })
                    }
                });
            });
        }
        readMoreCategory('#business')
        readMoreCategory('#face')
    }
    const faqSlider = () => {
        $('.faq__form-slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            rows: false,
            arrows: false,
            dots: true,
            dotsClass: 'slider-pagination',
            touchThreshold: 40,
            responsive: [
                {
                    breakpoint: 873,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 601,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        }).on('setPosition', function (event, slick) {
            slick.$slides.find('.faq__item').css('min-height', slick.$slideTrack.height() - 40 + 'px');
        })
    }
    const documentsItems = () => {
        const elem = $('.documents__item')
        elem.on('click', function () {
            if(elem.hasClass('documents__item--active')) {
                elem.removeClass('documents__item--active')
            }
            $(this).toggleClass('documents__item--active')
        })
    }
    const radioDisabled = () => {
        const radio = $('.documents-info__radio').prev()
        const input = $('.documents-info__input')
        radio.on('change', function () {
            if($(this).attr('id') === 'pay') {
                input.removeAttr('disabled')
                input.select()
            } else {
                input.attr('disabled', 'disabled')
            }
        })
    }
    const scrollCounter = () => {
        let counted = 0;
        const section = $('.statistics, .consult-chat')
        if (section.length > 0)
            $(window).scroll(function () {
                let oTop = section.offset().top - window.innerHeight;
                if (counted === 0 && $(window).scrollTop() > oTop) {
                    $('.statistics__item-number, .consult-chat__number, .consult-chat__statistic > strong').each(function () {
                        const $this = $(this),
                            countTo = $this.attr('data-number');
                        $({
                            countNum: $this.text()
                        }).animate({
                            countNum: countTo
                        }, {
                            duration: 2000,
                            easing: 'swing',
                            step: function () {
                                $this.text(Math.floor(this.countNum));
                            },
                            complete: function () {
                                $this.text(this.countNum);
                            }

                        });
                    });
                    counted = 1;
                }

            });
    }
    scrollCounter()
    menu()
    headerUser()
    certificatesSlider()
    teamSlider()
    reviewsSlider()
    answersSlider()
    tabs()
    readMore()
    faqSlider()
    headerSearch()
    documentsItems()
    radioDisabled()
    const performanceSlider = () => {
        $('.performance__slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            appendArrows: '.performance__arrows',
            touchThreshold: 40,
            rows: 0,
            adaptiveHeight: true,
            nextArrow: '<button class="section-arrow section-arrow--bg-green section-arrow--next"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
            prevArrow: '<button class="section-arrow section-arrow--bg-green section-arrow--prev"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
        })
    }
    performanceSlider()
    const formalizedSlider = () => {
        $('.formalized__slider').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            vertical: true,
            swipe: false,
            appendArrows: '.formalized__arrows',
            infinite: false,
            autoplay: true,
            autoplaySpeed: 2000,
            rows: 0,
            nextArrow: '<button class="section-arrow section-arrow--bg-green section-arrow--next"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
            prevArrow: '<button class="section-arrow section-arrow--bg-green section-arrow--prev"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
        })
    }
    formalizedSlider()
    const specialistsSlider = () => {
        $('.specialists__slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            appendArrows: '.specialists__arrows',
            rows: 0,
            touchThreshold: 40,
            nextArrow: '<button class="section-arrow section-arrow--bg-green section-arrow--next"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
            prevArrow: '<button class="section-arrow section-arrow--bg-green section-arrow--prev"><svg class="icon icon-arrow "><use xlink:href="static/images/sprite/symbol/sprite.svg#arrow"></use></svg></button>',
            responsive: [
                {
                    breakpoint: 973,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 580,
                    settings: {
                        slidesToShow: 1,
                        adaptiveHeight: true
                    }
                }
            ]
        })
    }
    specialistsSlider()
    const fileUpload = () => {
        $(".file input[type=file]").change(function () {
            let filename = $(this).val().replace(/.*\\/, "");
            $(this).closest('.file').find('.file__text').html(filename);
        });
    }
    fileUpload()
    $(".js-range-slider").ionRangeSlider({
        hide_min_max: true,
        skin: "round",
        prettify_separator: ' ',
    });
})
const headerSticky = () => {
    let scrollPrev = 0;
    let header = document.querySelector('.header')
    window.addEventListener('scroll', () => {
        let scrolled = window.scrollY;
        if (scrolled === 0) {
            header.classList.remove('header--sticky')
        }  else {
            header.classList.add('header--sticky')
        }
        scrollPrev = scrolled;
    });
}
headerSticky()
const customSelect = () => {
    $('.select').select2({
        minimumResultsForSearch: -1,
        width: null,
    })
    // .on('select2:open', function(e){
    //     $('.select2-results__options').scrollbar().parent().addClass('scrollbar-inner');
    // });
}
customSelect()
const customUpload = () => {
    let browse = document.querySelector('.js-browse')
    const fileUpload = document.querySelector('.file-upload')
    if(fileUpload) {
        Dropzone.autoDiscover = false;
        let profileVerify = new Dropzone(".file-upload", {
            url: "/file/post",
            previewTemplate: `
        <div class="dz-preview dz-file-preview">
          <div class="dz-image">
             <img alt=""/>
          </div>   
          <div class="dz-details">
            <div class="dz-filename"><span data-dz-name></span></div>
          </div>
          <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
        </div>
    `,
            acceptedFiles: ".pdf, .doc, .png, .jpeg, .jpg, .docx, .otd, .xls, .xlsx, .zip, .rar",
            "error": function(file, message, xhr) {
                if (xhr == null) {
                    this.removeFile(file);
                    alert(message);
                }

            },
            clickable: [
                fileUpload,
                browse
            ],
            init: function () {
                browse.remove()
                this.on("addedfile", function (file) {
                    let ext = file.name.split('.').pop();
                    $(file.previewElement).closest('.file-upload').append(browse)
                    if (ext === "pdf") {
                        $(file.previewElement).find("img").attr("src", "static/images/content/files/pdf.svg");
                    } else if (ext.indexOf("doc") !== -1) {
                        $(file.previewElement).find("img").attr("src", "static/images/content/files/doc.svg");
                    } else if (ext.indexOf("png") !== -1) {
                        $(file.previewElement).find("img").attr("src", "static/images/content/files/png.svg");
                    } else if (ext.indexOf("jpeg") !== -1) {
                        $(file.previewElement).find("img").attr("src", "static/images/content/files/jpeg.svg");
                    } else if (ext.indexOf("jpg") !== -1) {
                        $(file.previewElement).find("img").attr("src", "static/images/content/files/jpg.svg");
                    } else if (ext.indexOf("docx") !== -1) {
                        $(file.previewElement).find("img").attr("src", "static/images/content/files/docx.svg");
                    } else if (ext.indexOf("otd") !== -1) {
                        $(file.previewElement).find("img").attr("src", "static/images/content/files/otd.svg");
                    } else if (ext.indexOf("xls") !== -1) {
                        $(file.previewElement).find("img").attr("src", "static/images/content/files/xls.svg");
                    } else if (ext.indexOf("xlsx") !== -1) {
                        $(file.previewElement).find("img").attr("src", "static/images/content/files/xlsx.svg");
                    } else if (ext.indexOf("zip") !== -1) {
                        $(file.previewElement).find("img").attr("src", "static/images/content/files/zip.svg");
                    } else if (ext.indexOf("rar") !== -1) {
                        $(file.previewElement).find("img").attr("src", "static/images/content/files/rar.svg");
                    }
                })
            }
        });
    }

}
customUpload()

