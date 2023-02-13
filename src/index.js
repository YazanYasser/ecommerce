import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import './css/style.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import '@fortawesome/fontawesome-free/js/all.min';
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip()

    $('.add-to-cart-btn').click(function() {
        alert("اضيف المنتج الى عربة الشراء")
    })

    $('#copyright').text("جميع الحقوق محفوظة للمتجر سنة " + new Date().getFullYear())

    $('.product-option input[type="radio"]').change(function() {
        $(this).parents('.product-option').siblings().removeClass('active');
        $(this).parents('.product-option').addClass('active')
    });

    $('[data-product-quantity]').change(function() {
        var newQuality = $(this).val();

        var parent = $(this).parents('[data-product-info]');

        var pricePerUnit = parent.attr('data-product-price');

        var totalPriceForProduct = newQuality * pricePerUnit;

        parent.find('.total-price-for-product').text(totalPriceForProduct + '$')

        calculateTotalPrice()
    });

    $('[data-remove-from-cart]').click(function() {
        $(this).parents('[data-product-info]').remove()
    });

    function calculateTotalPrice() {
        var totalPriceForAllProducts = 0;
        
        $('[data-product-info]').each(function() {

            var pricePerUnit = $(this).attr('data-product-price');

            var quantity = $(this).find('[data-product-quantity]').val();

            var totalPriceForProduct = pricePerUnit * quantity;

            totalPriceForAllProducts = totalPriceForAllProducts + totalPriceForProduct;
        });

        $('#total-price-for-all-products').text(totalPriceForAllProducts + '$')
    }

    var citiesByCountry = {
        sa: ['جدة', 'الرياض'],
        eg: ['الاسكندرية', 'القاهرة'],
        jo: ['الزرقاء', 'عمان'],
        sy: ['حماء', 'حلب', 'دمشق']
    };
    
    $('#form-checkout select[name="country"]').on( "change",function() {
        // اجلب رمز البلد
        var country = $(this).val();
    
        // اجلب مدن هذا البلد من المصفوفة
        var cities = citiesByCountry[country];
    
        // فرّغ قائمة المدن
        $('#form-checkout select[name="city"]').empty();
        $('#form-checkout select[name="city"]').append(
            '<option disabled selected value="">اختر المدينة</option>'
        );
    
        // أضف المدن إلى قائمة المدن
        cities.forEach(function(city) {
          var newOption = $('<option></option>');
          newOption.text(city);
          newOption.val(city);
          $('#form-checkout select[name="city"]').append(newOption);
        });
      });

      $('#form-checkout input[name="payment_method"]').on( "change",function() {

        // اجلب القيمة المُختارة حاليًا
        var paymentMethod = $(this).val();
    
        if (paymentMethod === 'on_delivery') {
    
          // إذا كانت عند الاستلام، فعطّل حقول بطاقة الائتمان
          $('#credit-card-info input').prop('disabled', true);
    
        } else {
    
          // وإلا ففعلّها
          $('#credit-card-info input').prop('disabled', false);
        }
      
        // بدل معلومات بطاقة الائتمان بين الظهور والإخفاء
        $('#credit-card-info').toggle();
      });


      $('#price-range').slider({
        range: true,
        min: 50,
        max: 1000,
        step: 50,
        values: [250, 800],
        slide: function(event, ui) {
          $('#price-min').text(ui.values[0]);
          $('#price-max').text(ui.values[1]);
        }
      });
});

R