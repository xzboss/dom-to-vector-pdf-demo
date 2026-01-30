// import express from 'express';
// import cors from 'cors';
// import puppeteer from 'puppeteer';
// import { API_PORT } from './config.js';

// const app = express();

// // 中间件
// app.use(cors());
// app.use(express.json());

// // PDF 导出接口
// app.post('/api/export-pdf', async (req, res) => {
//   console.log("有人动了")
//   try {
//     const { url, elementId } = req.body;
    
//     if (!url || !elementId) {
//       return res.status(400).json({ error: '缺少 url 或 elementId 参数' });
//     }

//     const browser = await puppeteer.launch({
//       headless: true,
//       args: ['--no-sandbox', '--disable-setuid-sandbox']
//     });
    
//     const page = await browser.newPage();
//     await page.goto(url, { waitUntil: 'networkidle0' });

//     // 元素检查
//     const elementExists = await page.evaluate((id) => {
//       return !!document.querySelector(id);
//     }, elementId);

//     if (!elementExists) {
//       throw new Error('未找到报告元素，请确认元素ID是否正确');
//     }

//     // 获取元素高度
//     const elementHeight = await page.evaluate((id) => {
//       const element = document.querySelector(id);
//       return element.offsetHeight;
//     }, elementId);

//     if (!elementHeight) {
//       throw new Error('无法获取报告高度，请确认元素是否可见');
//     }

//     // 添加打印样式 - 需要根据项目完善
//     await page.addStyleTag({
//       content: `
//         @page {
//           size: auto;
//           height: ${elementHeight}px;
//           margin: 0;
//         }
        
//         /* 隐藏所有元素 */
//         body * {
//           visibility: hidden !important;
//         }
        
//         /* 显示目标元素及其所有子元素 */
//         ${elementId},
//         ${elementId} * {
//           visibility: visible !important;
//           z-index: 100000 !important;
//         }
        
//         /* 重置目标元素样式但保持原有布局 */
//         ${elementId} {
//           position: fixed !important;
//           top: 0 !important;
//           left: 0 !important;
//           right: 0 !important;
//         }
//       `
//     });

//     // 生成PDF Buffer
//     const pdfBuffer = await page.pdf({
//       printBackground: true,
//       height: `${elementHeight + 20}px`,
//       width: '210mm', // A4宽度，可根据需要调整
//       pageRanges: '1',
//       preferCSSPageSize: true
//     });

//     await browser.close();

//     // 返回PDF文件流
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `attachment; filename=export.pdf`);
//     res.send(pdfBuffer);

//   } catch (error) {
//     console.error('导出失败:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // 启动服务
// app.listen(API_PORT, () => {
//   console.log(`PDF导出服务已启动，端口: ${API_PORT}`);
// });