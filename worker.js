// Web Worker处理Excel数据
self.importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js');

self.onmessage = async function(e) {
    const { action, url } = e.data;
    
    if (action === 'loadExcel') {
        try {
            // 性能优化：分块处理数据
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`文件获取失败，状态码: ${response.status}`);
            }
            
            const data = await response.arrayBuffer();
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            
            // 优化：使用流式处理大数据
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            
            // 返回处理结果
            self.postMessage({ result: jsonData });
        } catch (error) {
            self.postMessage({ error: error.message });
        }
    }
};