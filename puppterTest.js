import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// PDF 导出接口
app.post('/api/export-pdf', async (req, res) => {
  console.log("有人动了")
  try {
    const { url, elementId } = req.body;
    
    if (!url || !elementId) {
      return res.status(400).json({ error: '缺少 url 或 elementId 参数' });
    }

    // 生成随机文件名
    const outputPath = `pdfs/export_${Date.now()}.pdf`;
    
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });

    // 元素检查
    const elementExists = await page.evaluate((id) => {
      return !!document.querySelector(id);
    }, elementId);

    if (!elementExists) {
      throw new Error('未找到报告元素，请确认元素ID是否正确');
    }

    // 获取元素高度
    const elementHeight = await page.evaluate((id) => {
      const element = document.querySelector(id);
      return element.offsetHeight;
    }, elementId);

    if (!elementHeight) {
      throw new Error('无法获取报告高度，请确认元素是否可见');
    }

    // 添加打印样式
    await page.addStyleTag({
      content: `
        @page {
          size: auto;
          height: ${elementHeight + 10}px;
          margin: 0;
        }
        ${elementId} {
          position: absolute !important;
          width: 100% !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          background-color: #fff !important;
          z-index: 100000 !important;
        }
      `
    });

    // 生成PDF Buffer
    const pdfBuffer = await page.pdf({
      printBackground: true,
      height: `${elementHeight + 10}px`,
      pageRanges: '1'
    });

    await browser.close();

    // 返回PDF文件流
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=export.pdf`);
    res.send(pdfBuffer);

  } catch (error) {
    console.error('导出失败:', error);
    res.status(500).json({ error: error.message });
  }
});

// 启动服务
app.listen(PORT, () => {
  console.log(`PDF导出服务已启动，端口: ${PORT}`);
});