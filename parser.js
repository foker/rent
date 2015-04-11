var request = require('request'),
    cheerio = require('cheerio'),
    _ = require('underscore');

var pg = require('./lib/pg');
var Q = require('q');
var crypto = require('crypto');
var exec = require('child_process').exec;


var md5 = function(str){
    var md5sum = crypto.createHash('md5');
    md5sum.update(str.toString());
    return md5sum.digest('hex');
};

var setToDB = function(data){

   pg('rent')
       .insert(data)
       .then(function(){
           console.log("Parse data success");
       })
       .catch(function(err){
           console.error("Parse data error");
           console.trace(err);
       });
};

var lol = function(num){
    exec("curl 'http://friendrent.ru/update_all?agents=false&page="+num+"' -H 'Cookie: city_header=3; auth_header=7f425009f751d813bdb7721683125268; auth_id_header=10488; date-limit=30; in_group=true; JSESSIONID=1djcxhm29xfm73llg7v4gk2yf; rooms=true; _gat=1; min_price=0; max_price=300000; vk_app_3845469=expire=1427758714&mid=9364511&secret=oauth&sid=acbdb0f69337bbc40a47808eba6377c074af2ed475eef79c4fa9807d1c65fea5dba68161ed84b26174bff&sig=ce1dda9ac32cedaa36050b2105269005; _ga=GA1.2.2032934271.1424432576' -H 'Accept-Encoding: gzip, deflate, sdch' -H 'Accept-Language: ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4,ka;q=0.2' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36' -H 'Accept: */*' -H 'Referer: http://friendrent.ru/all' -H 'X-Requested-With: XMLHttpRequest' -H 'Connection: keep-alive'", function(error, stdout, stderr){
        console.log(stdout);
        console.log(error);

        var $ = cheerio.load(stdout, {
            normalizeWhitespace: true
        });
        var setDbArray = [];
        $('.rent-item').each(function(item){

            var data = {
                vk_id: $(this).find('.rent-item-userphoto__img').children('a').attr('href'),
                avatar_img: $(this).find('.rent-item-userphoto__img').children('a').children('img').attr('src'),
                name: $(this).find('.rent-item-info__author').text(),
                text: $(this).find('.rent-item__text').text(),
                hash: md5($(this).find('.rent-item__text').text())
            };

            for (key in data){
                if(!data[key]) return;
            }

            setDbArray.push(setToDB(data));
        });

        Q.all(setDbArray)
            .then(function(){
                console.log('Parse iterate success');
            })
            .catch(function(err){
                console.log('Iterate parse fail');
                console.error(err);
            });
    });

};
var a = 0;
setInterval(function(){
    lol(a);
    a++;
}, 100);
