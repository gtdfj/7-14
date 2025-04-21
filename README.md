# 7-14
# 下载成绩排名文件

点击下面的按钮来下载 `成绩排名.xlsx` 文件。

<button id="downloadButton">下载成绩排名文件</button>

<script>
    document.addEventListener('DOMContentLoaded', function () {
        const downloadButton = document.getElementById('downloadButton');
        downloadButton.addEventListener('click', function () {
            const fileName = '成绩排名.xlsx';
            const link = document.createElement('a');
            link.href = fileName;
            link.download = fileName;
            link.click();
        });
    });
</script>
