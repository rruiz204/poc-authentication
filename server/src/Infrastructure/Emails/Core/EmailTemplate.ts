import path from "path";
import mjml2html from "mjml";
import Handlebars from "handlebars";

export class EmailTemplate {
  private file: string = "";
  private mjml: string = "";
  private html: string = "";

  constructor(file: string) {
    this.file = path.join(__dirname, "..", "Templates", file);
  };

  public async load(): Promise<void> {
    this.mjml = await Bun.file(this.file).text();
    this.html = mjml2html(this.mjml).html;
  };

  public obtain(data: any): string {
    return Handlebars.compile(this.html)(data);
  };
};