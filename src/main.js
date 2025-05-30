import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import {
  Document,
  CopyDocument,
  Printer,
  Download,
} from "@element-plus/icons-vue";
import App from "./App.vue";
import "./style.css";
import "//at.alicdn.com/t/c/font_4073515_l9r7bil9c9.js";

const app = createApp(App);

// Register Element Plus icons
app.component("Document", Document);
app.component("CopyDocument", CopyDocument);
app.component("Printer", Printer);
app.component("Download", Download);

app.use(ElementPlus);
app.mount("#app");
