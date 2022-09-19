function smoothScroll (target, duration) {
    var target = document.querySelector(target); //tırnaksız yazınca htmlde #'yi seçmiş oldu
    var targetPosition = target.getBoundingClientRect().top; // section1 classının olduğu yerin sayfanın en üstüne olan mesafesini gösteriyor. console.log(targetPosition) yazıp sayfayı yukarı aşağı indirdikçe mesafe azalacak ya da artacaktır
    var startPosition = window.pageYOffset; // Bu ise sayfayı ilk açtığımızda sıfır değeri verir. Sayfayı aşağı indirdikçe değerimiz artar. Yani sayfanın default halinden ne kadar aşağı scroll yaptığımızı gösterir.
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation (currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease (timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease (t, b, c, d) { // İnternetten alınan bir ease yani geçiş fonksiyonu. Yavaş kayarak geçme işlemini bu func yapıyor
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Click işlemleri

var section1 = document.querySelector('.section1');
var section2 = document.querySelector('.section2');

section1.addEventListener('click', function() {
    smoothScroll('.section2', 1000);
});

section2.addEventListener('click', function() {
    smoothScroll('.section1', 1000);
});