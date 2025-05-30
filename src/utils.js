import vectorInstance from "dom-to-vector-pdf";
import { jsPDF } from "jspdf";
import { elementToSVG } from "dom-to-svg";
import { svg2pdf } from "svg2pdf.js";
import PingFangRegular from "@/assets/PingFang Regular_0.subset.ttf";
import PingFangMedium from "@/assets/PingFang Medium_0.subset.ttf";
import PingFangHeavy from "@/assets/PingFang Heavy_0.subset.ttf";

export const PrintPDF = (id, title = "byPrint") => {
  const reportElement = document.getElementById(id);
  if (!reportElement) {
    throw new Error("未找到报告元素，请确认元素ID是否正确");
  }

  const reportHeight = reportElement.offsetHeight;
  if (!reportHeight) {
    throw new Error("无法获取报告高度，请确认元素是否可见");
  }

  const printStyle = document.createElement("style");
  printStyle.id = "print-stylesheet";
  printStyle.innerHTML = `
@media print {
    @page {
        size: auto;
        height: ${reportHeight + 10}px;
        margin: 0;
    }
    #${id} {
        position: absolute !important;
        width: 100% !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        background-color: #fff !important;
        z-index: 100000 !important;
    }
}
`;
  document.head.appendChild(printStyle);

  window.addEventListener("afterprint", () => {
    document.head.removeChild(printStyle);
    window.removeEventListener("afterprint", () => {});
  });
  window.print();
};

export const ExportToPDF = (id, title = "byExport") => {
  vectorInstance.registerFont([
    {
      font: PingFangRegular,
      fontId: "PingFang",
      fontWeight: "400",
      fontStyle: "normal",
    },
    {
      font: PingFangMedium,
      fontId: "PingFang",
      fontWeight: "500",
      fontStyle: "normal",
    },
    {
      font: PingFangHeavy,
      fontId: "PingFang",
      fontWeight: "700",
      fontStyle: "normal",
    },
  ]);
  vectorInstance.exportPDF({
    id,
    filename: title,
  });
};
// /**
//  * 将指定DOM元素导出为PDF文件
//  * @param {string} id - 要导出的元素选择器
//  * @param {string} [title="byExport"] - 导出的PDF文件名
//  * @returns {Promise<void>}
//  * @throws {Error} 当元素未找到或导出过程中出错时抛出异常
//  */
// export const ExportToPDF = async (id, title = "byExport") => {
//   try {
//     // 1. 获取并准备DOM元素
//     const originalElement = document.querySelector(id);
//     if (!originalElement) {
//       throw new Error(`Element with selector "${id}" not found`);
//     }

//     const parentElement = originalElement.parentElement;
//     const clonedElement = originalElement.cloneNode(true);

//     // 设置克隆元素的样式
//     Object.assign(clonedElement.style, {
//       zIndex: "-999999",
//       position: "absolute",
//       top: "0",
//       left: "0",
//     });

//     parentElement.appendChild(clonedElement);

//     // 2. 内联SVG符号
//     const inlineSVGSymbols = (element) => {
//       const uses = element.querySelectorAll("use");
//       uses.forEach((use) => {
//         const href = use.getAttribute("xlink:href") || use.getAttribute("href");
//         if (!href) return;

//         const symbol = document.querySelector(href);
//         if (!symbol) return;

//         // 创建 <g> 容器保留所有属性
//         const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
//         Array.from(use.attributes).forEach((attr) => {
//           if (attr.name !== "xlink:href" && attr.name !== "href") {
//             g.setAttribute(attr.name, attr.value);
//           }
//         });

//         // 插入缩放后的路径
//         g.innerHTML = `<g transform="scale(${getScaleFactor(symbol)})">${
//           symbol.innerHTML
//         }</g>`;
//         use.replaceWith(g);
//       });
//     };

//     inlineSVGSymbols(clonedElement);

//     // 3. 转换为SVG文档
//     const svgDocument = elementToSVG(clonedElement);
//     parentElement.removeChild(clonedElement);
//     const svgElement = svgDocument.documentElement;

//     // 设置SVG样式
//     svgElement.style.cssText = `
//       all: unset;
//       width: 100%;
//       position: absolute;
//       top: 0;
//       left: 0;
//       z-index: -999999;
//     `;

//     // 添加UTF-8声明
//     const utf8Declaration = document.createTextNode(
//       '<?xml version="1.0" encoding="utf-8"?>'
//     );
//     svgElement.insertBefore(utf8Declaration, svgElement.firstChild);

//     // 4. 处理SVG中的字体
//     const processSVGFonts = (element) => {
//       if (element.classList.contains("no-print")) {
//         element.remove();
//         return;
//       }

//       if (element.tagName === "text" || element.tagName === "tspan") {
//         // 解析style字符串
//         const style = element.getAttribute("style");
//         if (style) {
//           style.split(";").forEach((css) => {
//             const [key, value] = css.split(":");
//             if (key) element.setAttribute(key.trim(), value?.trim());
//           });
//         }

//         element.removeAttribute("style");
//         const fontFamily = element.getAttribute("font-family");
//         const fontWeight = element.getAttribute("font-weight");

//         if (fontFamily) {
//           element.setAttribute("font-family", "PingFang");
//           element.setAttribute("font-weight", transWeight(fontWeight));
//         }

//         // 调整Y坐标
//         element.setAttribute(
//           "y",
//           String(Number(element.getAttribute("y")) - 3)
//         );
//       }

//       Array.from(element.children).forEach(processSVGFonts);
//     };

//     processSVGFonts(svgElement);
//     document.body.appendChild(svgElement);

//     // 5. 创建PDF文档
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "px",
//       format: [
//         svgElement.getBoundingClientRect().width,
//         svgElement.getBoundingClientRect().height,
//       ],
//     });

//     // 6. 注册PingFang字体
//     const registerPingFangFonts = (pdf) => {
//       const fontMap = {
//         400: PingFangRegular,
//         500: PingFangMedium,
//         700: PingFangHeavy,
//       };

//       Object.entries(fontMap).forEach(([weight, font]) => {
//         pdf.addFont(font, "PingFang", "normal", weight);
//         pdf.addFont(font, "PingFang", "italic", weight);
//       });
//     };

//     registerPingFangFonts(pdf);
//     pdf.setFont("PingFang");

//     // 7. 绘制SVG内容到PDF
//     await svg2pdf(svgElement, pdf, {
//       x: 0,
//       y: 0,
//       width: pdf.internal.pageSize.getWidth(),
//       height: pdf.internal.pageSize.getHeight(),
//     });

//     // 8. 保存PDF
//     pdf.save(`${title}.pdf`);

//     // 9. 清理临时元素
//     svgElement.remove();
//   } catch (error) {
//     console.error("PDF导出失败:", error);
//     throw error;
//   }
// };

// /**
//  * 转换字体字重
//  * @param {string} weight - 原始字重
//  * @returns {string} 转换后的字重
//  */
// const transWeight = (weight) => {
//   if (!weight) return "400";

//   const weightMap = {
//     normal: "400",
//     bold: "700",
//   };

//   weight = Number(weightMap[weight] || weight);

//   if (weight <= 400) return "400";
//   if (weight < 700) return "500";
//   if (weight >= 700) return "700";
//   return "400";
// };

// /**
//  * 计算SVG符号的缩放比例
//  * @param {SVGElement} symbol - SVG符号元素
//  * @returns {number} 缩放比例
//  */
// const getScaleFactor = (symbol) => {
//   const viewBox = symbol.getAttribute("viewBox");
//   if (!viewBox) return 1;

//   const [, , width] = viewBox.split(" ").map(Number);
//   const expectedSize = 16; // 1em 通常计算的像素值
//   return expectedSize / width;
// };
