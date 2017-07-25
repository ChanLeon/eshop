$(document).ready(function() {


    $("#exportExcel").click(function() {
        if (confirm('确认导出?')) {
            var aa = [];
            $("#areaDistribute_list tbody tr td").each(function() {
                aa.push($(this).text());
            });
            var url = "/nodeExcel/nodeExport?data=" + aa;
            window.location = url; //这里不能使用get方法跳转，否则下载不成功
        } else {
            return false;
        }
    })

})