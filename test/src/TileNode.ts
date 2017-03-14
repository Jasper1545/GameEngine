class TileNode
{
public x:number;
public y:number;
public f:Number;
public  g:Number;
public  h:Number;
public  walkable:Boolean = true;
public  parent:TileNode;
public  costMultiplier:Number = 1.0;
constructor(x:number, y:number)
{
this.x = x;
this.y = y;
}
}