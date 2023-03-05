class Point {
  constructor(x: number, y: number)
  {
    this.x = x;
    this.y = y;
  }

  private x: number = 0;
  private y: number = 0;
  
  public get X(): number { return this.x; };
  public get Y(): number { return this.y; };
}

export default Point;