class TileMap extends engine.DisplayObjectContainer{

    private size = 2;
    private TextruesSize = 64;
    public startTile : Tile;
    public endTile : Tile;
    public numCols:number;
    public numRows:number;
    public tileArray : Tile[];
    

    constructor(){
        super();
        // this.width = this.size * this.TextruesSize;
        // this.height = this.size * this.TextruesSize;
        this.tileArray = [];
        this.init();
        this.startTile = this.tileArray[0];
        this.endTile = this.tileArray[0];
        this.numCols = 10;
        this.numRows = 10;
        
    }
    
    private init(){
        var config : TileData[] = [
        {x : 0 ,y : 0 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 0 ,y : 1 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 0 ,y : 2 , walkable : true , pictureName : "hardened_clay_stained_green_with_yellow_flower.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 0 ,y : 3 , walkable : true , pictureName : "hardened_clay_stained_green_with_yellow_flower.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0}, 
        {x : 0 ,y : 4 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 0 ,y : 5 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 0 ,y : 6 , walkable : false , pictureName : "furnace_side.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 0 ,y : 7 , walkable : false , pictureName : "furnace_side.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 0 ,y : 8 , walkable : false , pictureName : "furnace_side.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 0 ,y : 9 , walkable : false , pictureName : "furnace_side.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        

        {x : 1 ,y : 0 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 1 ,y : 1 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 1 ,y : 2 , walkable : true , pictureName : "hardened_clay_stained_green_with_yellow_flower.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 1 ,y : 3 , walkable : true , pictureName : "hardened_clay_stained_green_with_yellow_flower.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0}, 
        {x : 1 ,y : 4 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 1 ,y : 5 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 1 ,y : 6 , walkable : false , pictureName : "furnace_side.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 1 ,y : 7 , walkable : true , pictureName : "stone.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 1 ,y : 8 , walkable : true , pictureName : "diamond_ore.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 1 ,y : 9 , walkable : false , pictureName : "furnace_side.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},

        {x : 2 ,y : 0 , walkable : true , pictureName : "hardened_clay_stained_green_with_red_flower.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 2 ,y : 1 , walkable : true , pictureName : "hardened_clay_stained_green_with_red_flower.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 2 ,y : 2 , walkable : true , pictureName : "hardened_clay_stained_green_with_white_flower.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 2 ,y : 3 , walkable : true , pictureName : "hardened_clay_stained_green_with_white_flower.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 2 ,y : 4 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 2 ,y : 5 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 2 ,y : 6 , walkable : true , pictureName : "hardened_clay_stained_green_with_white_flower.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 2 ,y : 7 , walkable : true , pictureName : "stone.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 2 ,y : 8 , walkable : true , pictureName : "stone.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 2 ,y : 9 , walkable : false , pictureName : "furnace_side.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},

        {x : 3 ,y : 0 , walkable : true , pictureName : "hardened_clay_stained_green_with_red_flower.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 3 ,y : 1 , walkable : true , pictureName : "hardened_clay_stained_green_with_red_flower.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 3 ,y : 2 , walkable : true , pictureName : "hardened_clay_stained_green_with_white_flower.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 3 ,y : 3 , walkable : true , pictureName : "hardened_clay_stained_green_with_white_flower.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 3 ,y : 4 , walkable : false , pictureName : "stonebrick_mossy.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 3 ,y : 5 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 3 ,y : 6 , walkable : true , pictureName : "hardened_clay_stained_green_with_white_flower.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 3 ,y : 7 , walkable : true , pictureName : "hardened_clay_stained_green_with_white_flower.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 3 ,y : 8 , walkable : false , pictureName : "furnace_side.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 3 ,y : 9 , walkable : false , pictureName : "furnace_side.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},

        {x : 4 ,y : 0 , walkable : false , pictureName : "stonebrick_mossy.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 4 ,y : 1 , walkable : false , pictureName : "stonebrick_mossy.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 4 ,y : 2 , walkable : false , pictureName : "stonebrick_mossy.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 4 ,y : 3 , walkable : false , pictureName : "stonebrick_mossy.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 4 ,y : 4 , walkable : false , pictureName : "stonebrick_mossy.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 4 ,y : 5 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 4 ,y : 6 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 4 ,y : 7 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 4 ,y : 8 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 4 ,y : 9 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},

        {x : 5 ,y : 0 , walkable : false , pictureName : "hardened_clay_stained_green_with_tree.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 5 ,y : 1 , walkable : false , pictureName : "hardened_clay_stained_green_with_tree.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 5 ,y : 2 , walkable : false , pictureName : "hardened_clay_stained_green_with_tree.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 5 ,y : 3 , walkable : false , pictureName : "hardened_clay_stained_green_with_tree.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 5 ,y : 4 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 5 ,y : 5 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 5 ,y : 6 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 5 ,y : 7 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 5 ,y : 8 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 5 ,y : 9 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},

        {x : 6 ,y : 0 , walkable : false , pictureName : "hardened_clay_stained_green_with_tree.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 6 ,y : 1 , walkable : false , pictureName : "hardened_clay_stained_green_with_tree.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 6 ,y : 2 , walkable : false , pictureName : "hardened_clay_stained_green_with_tree.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 6 ,y : 3 , walkable : false , pictureName : "hardened_clay_stained_green_with_tree.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 6 ,y : 4 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 6 ,y : 5 , walkable : true , pictureName : "hardened_clay_stained_green_with_yellow_flower.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 6 ,y : 6 , walkable : true , pictureName : "hardened_clay_stained_green_with_yellow_flower.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 6 ,y : 7 , walkable : true , pictureName : "hardened_clay_stained_green_with_yellow_flower.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 6 ,y : 8 , walkable : false , pictureName : "stonebrick.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 6 ,y : 9 , walkable : false , pictureName : "stonebrick.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},

        {x : 7 ,y : 0 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 7 ,y : 1 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 7 ,y : 2 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 7 ,y : 3 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 7 ,y : 4 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 7 ,y : 5 , walkable : false , pictureName : "stonebrick_mossy.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 7 ,y : 6 , walkable : false , pictureName : "stonebrick_cracked.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 7 ,y : 7 , walkable : true , pictureName : "stone.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 7 ,y : 8 , walkable : true , pictureName : "stone.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 7 ,y : 9 , walkable : false , pictureName : "stonebrick.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},

        {x : 8 ,y : 0 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 8 ,y : 1 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 8 ,y : 2 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 8 ,y : 3 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 8 ,y : 4 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 8 ,y : 5 , walkable : false , pictureName : "stonebrick_mossy.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 8 ,y : 6 , walkable : false , pictureName : "stonebrick_cracked.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 8 ,y : 7 , walkable : true , pictureName : "stone.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 8 ,y : 8 , walkable : true , pictureName : "stone.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 8 ,y : 9 , walkable : false , pictureName : "stonebrick_cracked.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},

        {x : 9 ,y : 0 , walkable : true , pictureName : "pumpkin.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 9 ,y : 1 , walkable : true , pictureName : "pumpkin.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 9 ,y : 2 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 9 ,y : 3 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 9 ,y : 4 , walkable : true , pictureName : "grass_top.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 9 ,y : 5 , walkable : false , pictureName : "stonebrick_mossy.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 9 ,y : 6 , walkable : false , pictureName : "stonebrick_cracked.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 9 ,y : 7 , walkable : true , pictureName : "gold_ore.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 9 ,y : 8 , walkable : true , pictureName : "gold_ore.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        {x : 9 ,y : 9 , walkable : false , pictureName : "stonebrick_cracked.png" , f : 0 , g : 0, h : 0 , costMultiplier :1.0},
        

    ]

    for(let i = 0 ; i < config.length ; i++){
        var tiledata = config[i];
        var tile = new Tile(tiledata);
        this.addChild(tile);
        tile.x = tiledata.x * 64;
        tile.y = tiledata.y * 64;
        this.tileArray.push(tile);
    }
    }

    public getTile( x : number , y : number):any{
        for(var i = 0 ; i<this.tileArray.length ; i++){
              if(this.tileArray[i].x / this.TextruesSize == x && this.tileArray[i].y / this.TextruesSize == y){
                  break;
              }
        }
        return this.tileArray[i];

    }

    public setStartTile( x : number , y : number){
        for(var i = 0 ; i<this.tileArray.length ; i++){
              if(this.tileArray[i].x / this.TextruesSize == x && this.tileArray[i].y / this.TextruesSize== y){
                  break;
              }
        }
        this.startTile = this.tileArray[i];

    }

    public setEndTile( x : number , y : number){
        for(var i = 0 ; i<this.tileArray.length ; i++){
              if(this.tileArray[i].x / this.TextruesSize == x && this.tileArray[i].y / this.TextruesSize == y){
                  break;
              }
        }
        this.endTile = this.tileArray[i];

    }

    public getNumCols():any{
        return this.numCols;
    }

    public getNumRows():any{
        return this.numRows;
    }

    public getStartTile():any{
        return this.startTile;
    }
    

    

}

class Tile extends engine.DisplayObjectContainer{
    public bitmaps;
    public bitmapSize = 64;
    public tileData : TileData;
    public tileParent : Tile;
    
    
    constructor(tiledata : TileData){
        super();
        this.tileData = tiledata;
        this.bitmaps = new engine.Bitmap(tiledata.pictureName);
        this.addChild(this.bitmaps);
        engine.RES.getRes(tiledata.pictureName).then((value) => {
        this.bitmaps.texture = value;
        this.bitmaps.setWidth(this.bitmaps.texture.width);
        this.bitmaps.setHeight(this.bitmaps.texture.height);
        });
        this.bitmaps.width = this.bitmapSize;
        this.bitmaps.height = this.bitmapSize;

    }
}

class TileData{
    public x : number;
    public y : number;
    public walkable : boolean;
    public pictureName : string;
    public  f:number;
    public  g:number;
    public  h:number;
    public  costMultiplier:number = 1.0;

}