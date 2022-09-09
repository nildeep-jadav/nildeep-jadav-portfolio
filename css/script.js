var width_screen = document.documentElement.clientWidth || window.innerWidth;
function resizeDivs() {
    if (width_screen > 480) {
       
        // Eatummy
        var eatummy_descr = document.getElementById('eatummy-descr').offsetHeight;
        var eatummy_wrapper = document.getElementById('eatummy-wrapper').offsetHeight;
        var eatummy_img = document.getElementById('eatummy-img').offsetHeight;

        if (eatummy_img > eatummy_descr) {
            var total = eatummy_wrapper;
            document.getElementById('eatummy-wrapper').style.height = total + 'px'
        }  else {
                var total = eatummy_descr + 24 + 24;
                document.getElementById('eatummy-wrapper').style.height = total + 'px'
        }

        // Triaayam
        var triaayam_descr = document.getElementById('triaayam-descr').offsetHeight;
        var triaayam_wrapper = document.getElementById('triaayam-wrapper').offsetHeight;
        var triaayam_img = document.getElementById('triaayam-img').offsetHeight;

        if (triaayam_img > triaayam_descr) {
                var total = triaayam_wrapper;
                document.getElementById('triaayam-wrapper').style.height = total + 'px'
        }  else {
                var total = triaayam_descr + 24 + 24;
                document.getElementById('triaayam-wrapper').style.height = total + 'px'
        }

        // snackify
        var snackify_descr = document.getElementById('snackify-descr').offsetHeight;
        var snackify_wrapper = document.getElementById('snackify-wrapper').offsetHeight;
        var snackify_img = document.getElementById('snackify-img').offsetHeight;

        if (snackify_img > snackify_descr) {
                var total = snackify_wrapper;
                document.getElementById('snackify-wrapper').style.height = total + 'px'
        }  else {
                var total = snackify_descr + 24 + 24;
                document.getElementById('snackify-wrapper').style.height = total + 'px'
        }

        // betamg
        var betamg_descr = document.getElementById('betamg-descr').offsetHeight;
        var betamg_wrapper = document.getElementById('betamg-wrapper').offsetHeight;
        var betamg_img = document.getElementById('betamg-img').offsetHeight;

        if (betamg_img > betamg_descr) {
                var total = betamg_wrapper;
                document.getElementById('betamg-wrapper').style.height = total + 'px'
        }  else {
                var total = betamg_descr + 24 + 24;
                document.getElementById('betamg-wrapper').style.height = total + 'px'
        }


    }
}
window.onload = resizeDivs;
