import mjml2html from "mjml";
import Handlebars from "handlebars";

export class EmailTemplate {
  private path: string = import.meta.dir;
  private mjml: string = "";
  private html: string = "";

  constructor(file: string) {
    this.path += file;
  };

  public async buildHtml(): Promise<void> {
    this.mjml = await Bun.file(this.path).text();
    this.html = mjml2html(this.mjml).html;
  };

  public getTemplate<data>(payload: data): string {
    return Handlebars.compile<data>(this.html)(payload);
  };
};