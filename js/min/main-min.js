!function(n){$(n).ready(function(){$(".js-download").on("click",function(n){n.preventDefault(),$(this).parent().parent().find(".download-links").removeClass("fade-down").addClass("bounce")}),$(".js-download-close").on("click",function(n){n.preventDefault(),$(this).parent().parent().parent().removeClass("bounce").addClass("fade-down")})})}(document);