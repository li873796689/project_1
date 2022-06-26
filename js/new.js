$(function () {
    //定义时间补零函数
    function hanshubuling(n) {
        if (n < 10) {
            return '0' + n
        } else {
            return n
        }
    }
    //定义格式化时间的过滤器
    template.defaults.imports.dateFormat = function (dtstr) {
        var dt = new Date(dtstr);
        var y = dt.getFullYear();
        var m = hanshubuling(dt.getMonth() + 1);
        var d = hanshubuling(dt.getDay());
        var hh = hanshubuling(dt.getHours());
        var mm = hanshubuling(dt.getMinutes());
        var ss = hanshubuling(dt.getSeconds());
        return y + '-' + m + '-' + d + '-' + hh + ':' + mm + ':' + ss
    }
    function getNewsList() {
        $.get('http://www.liulongbin.top:3006/api/news', function (res) {
            if (res.status !== 200) {
                return alert('获取新闻失败');
            }
            for (var i = 0; i < res.data.length; i++) {
                console.log(res.data.length);
                //把每一项的tags属性 从字符串改为字符串的数组
                res.data[i].tags = res.data[i].tags.split(',');
            }
            var htmlstr = template('tpl-news', res);
            $('#news-list').html(htmlstr);
        })
    }
    getNewsList();
})