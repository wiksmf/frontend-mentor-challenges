export class Project {
  public name: string;
  public image: {
    'small': string,
    'large': string
  };
  public techUsed: Array<string>;
  public links: {
    'project': string,
    'code': string
  };

  constructor(
    name: string,
    image: { 'small': string, 'large': string },
    techUsed: Array<string>,
    links: { 'project': string, 'code': string }
  ) {
    this.name = name;
    this.image = image;
    this.techUsed = techUsed;
    this.links = links;
  }
}
