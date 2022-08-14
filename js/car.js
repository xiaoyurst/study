$(function() {
   $(".checkall").change(function() {
      $(".j-checkbox,.checkall").prop("checked",$(this).prop("checked"));
      if($(this).prop("checked")){
         $(".cart-item").addClass("check-cart-item");
      }else{
         $(".cart-item").removeClass("check-cart-item");
      }
      $(".j-checkbox").change(function(){
         // :checked判断被选中的复选框个数
         // $(".j-checkbox").length)是所有被选中复选框的个数
          if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
         $(".checkall").prop("checked",true);
      }else{
         $(".checkall").prop("checked",false);
      }
      if($(this).prop("checked")){
         $(this).parents(".cart-item").addClass("check-cart-item");
      }else{
         $(this).parents(".cart-item").removeClass("check-cart-item");
      }
      });
   })
   $(".increment").click(function(){
      var num =$(this).siblings(".itxt").val();
      if(num>=99){
         // 如果num=99剩下的代码就不会执行了
         return false;
      } 
      num++;
      $(this).siblings(".itxt").val(num);
      // 把p-price的内容获取过来利用substr截取掉￥
      var price =$(this).parent().parent().siblings(".p-price").text();
      price = price.substr(1);
       // 当前.increment的父级quantity-form的父级p-num的兄弟p-sum的文本内容为num乘以单价
      //  .toFixed()保留几位小数，括号里是几就是几位
     $(this).parent().parent().siblings(".p-sum").text("￥"+(num*price).toFixed(2));
     getSum();
     getCoutent();
   });
   $(".decrement").click(function(){
      var num =$(this).siblings(".itxt").val();
      if(num == 1){
         return false;
       }
      num--;
      $(this).siblings(".itxt").val(num);
      // 当前.increment的父级quantity-form的父级p-num的兄弟p-sum的文本内容为num乘以单价
      var price =$(this).parent().parent().siblings(".p-price").text();
      // var price = $(this).parents(".p-num").siblings(".p-price").text();
      // parents();返回祖先级父级
      price = price.substr(1);
       // 当前.increment的父级quantity-form的父级p-num的兄弟p-sum的文本内容为num乘以单价
       $(this).parents(".p-num").siblings(".p-sum").text("￥"+(num*price).toFixed(2));
       getSum();
       getCoutent();
   })
   $(".itxt").change(function(){
      var n = $(this).val();
      var price =$(this).parent().parent().siblings(".p-price").text();
      // var price = $(this).parents(".p-num").siblings(".p-price").text();
      // parents();返回祖先级父级
      price = price.substr(1);
      $(this).parents(".p-num").siblings(".p-sum").text("￥"+(n*price).toFixed(2));
      getSum();
      getCoutent();
   });
   // 第一次刷新页面不匹配
   getSum();
   getCoutent();
   // 封装一个求和和总计的函数，然后调用
   function getSum(){
      var content = 0;
   $(".itxt").each(function(index,domEle){
      content += parseInt($(domEle).val());
   });
   // 总计件数
   $(".amount-sum em").text(content);
   };
   function getCoutent(){
      var sum = 0;
      $(".p-sum").each(function(index,domEle){
         sum += parseFloat($(domEle).text().substr(1)); 
      });
      // 总件数的价格
      $(".price-sum em").text("￥"+sum.toFixed(2));
   };

   $(".p-action a").click(function(){
      $(this).parents(".cart-item").remove();
      // 重新计算购物车总额
      getSum();
      getCoutent();
   });
   $(".remove-batch").click(function(){
      $(".j-checkbox:checked").parents(".cart-item").remove();
      // 重新计算购物车总额
      getSum();
      getCoutent();
   });
   $(".clear-all").click(function(){
      $(".cart-item").remove();
      // 重新计算购物车总额
      getSum();
      getCoutent();
   })
})
