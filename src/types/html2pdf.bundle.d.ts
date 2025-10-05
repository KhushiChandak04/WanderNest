declare module 'html2pdf.js/dist/html2pdf.bundle.min.js' {
  interface Html2PdfOptions {
    margin?: number | number[];
    filename?: string;
    image?: { type?: string; quality?: number };
    html2canvas?: { scale?: number; useCORS?: boolean; backgroundColor?: string };
    jsPDF?: { unit?: string; format?: string | string[]; orientation?: 'portrait' | 'landscape' };
  }
  interface Html2PdfInstance {
    from(element: HTMLElement): Html2PdfInstance;
    set(options: Html2PdfOptions): Html2PdfInstance;
    save(): Promise<void>;
  }
  function html2pdf(): Html2PdfInstance;
  export default html2pdf;
}
